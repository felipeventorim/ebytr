const sinon = require('sinon');
const { expect } = require('chai');

const tasksModel = require('../../models/tasksModel');
const tasksService = require('../../services/tasksService');
const errorMessages = require('../../utils/dictionary/errorMessages');

const sampleTask1 = {
  _id: '620d114be63003905e83ca2e',
  name: 'test1',
  status: 'pronto',
  createdAt: '16/02/2022 11:59:23',
};

const sampleTask2 = {
  _id: '620d1154e63003905e83ca30',
  name: 'test2',
  status: 'em andamento',
  createdAt: '16/02/2022 11:59:32',
};

describe('Testando o tasksService', () => {
  describe('Testando o tasksService.getAllTasks', () => {
    describe('Quando não existe nenhuma task', () => {
      before(() => {
        sinon.stub(tasksService, 'getAllTasks').resolves([]);
      });

      after(() => {
        tasksService.getAllTasks.restore();
      });

      it('Deve retornar um array vazio', async () => {
        const tasks = await tasksService.getAllTasks();

        expect(tasks).to.be.a('array');
        expect(tasks).to.be.empty;
      });
    });

    describe('Quando existem tasks', () => {
      before(() => {
        sinon
          .stub(tasksModel, 'getAllTasks')
          .resolves([sampleTask1, sampleTask2]);
      });

      after(() => {
        tasksModel.getAllTasks.restore();
      });

      it('Deve retornar um array com as tasks esperadas', async () => {
        const tasks = await tasksService.getAllTasks();

        expect(tasks).to.be.a('array');
        expect(tasks).to.deep.equal([sampleTask1, sampleTask2]);
      });
    });
  });

  describe('Testando o tasksService.updateTask', () => {
    describe('Quando as informações são válidas', () => {
      before(() => {
        sinon.stub(tasksModel, 'updateTask').resolves(1);
      });

      after(() => {
        tasksModel.updateTask.restore();
      });

      it('Deve retornar 1', async () => {
        const task = await tasksService.updateTask({
          id: sampleTask1._id,
          name: 'updateTask',
          status: sampleTask1.status,
        });

        expect(task).to.be.a('number');
        expect(task).to.equal(1);
      });
    });

    describe('Quando o id não existe ou é inválido', () => {
      it('Deve retornar um erro se o id é inválido', async () => {
        try {
          await tasksService.updateTask({
            id: 'id_invalido',
            name: 'updateTask',
            status: sampleTask1.status,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"id" must only contain hexadecimal characters',
            },
          });
        }
      });

      it('Deve retornar um erro se o id não existe no banco', async () => {
        try {
          await tasksService.updateTask({
            id: '620d114be63003905e83ca2f',
            name: sampleTask1.name,
            status: sampleTask1.status,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 422,
            message: {
              message: errorMessages.wrongId,
            },
          });
        }
      });
    });

    describe('Quando o nome é inválido', () => {
      it('Deve retornar um erro se o nome não for uma string', async () => {
        try {
          await tasksService.updateTask({
            id: sampleTask1._id,
            name: 10,
            status: sampleTask1.status,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"name" must be a string',
            },
          });
        }
      });

      it('Deve retornar um erro se o nome for undefined', async () => {
        try {
          await tasksService.updateTask({
            id: sampleTask1._id,
            name: undefined,
            status: sampleTask1.status,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"name" is required',
            },
          });
        }
      });
    });

    describe('Quando o status é inválido', () => {
      it('Deve retornar um erro se o status não for uma string', async () => {
        try {
          await tasksService.updateTask({
            id: sampleTask1._id,
            name: sampleTask1.name,
            status: 10,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"status" must be a string',
            },
          });
        }
      });
      it('Deve retornar um erro se o status for undefined', async () => {
        try {
          await tasksService.updateTask({
            id: sampleTask1._id,
            name: sampleTask1.name,
            status: undefined,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"status" is required',
            },
          });
        }
      });
    });
  });

  describe('Testando o tasksService.deleteTask', () => {
    describe('Quando o produto existe', () => {
      before(() => {
        sinon.stub(tasksModel, 'deleteTask').resolves(sampleTask2);
      });

      after(() => {
        tasksModel.deleteTask.restore();
      });

      it('Deve retornar o item excluído', async () => {
        const task = await tasksService.deleteTask(sampleTask2._id);

        expect(task).to.be.a('object');
        expect(task).to.deep.equal(sampleTask2);
      });
    });

    describe('Quando o id não existe ou é inválido', () => {
      before(() => {
        sinon.stub(tasksModel, 'deleteTask').resolves(null);
      });

      after(() => {
        tasksModel.deleteTask.restore();
      });

      it('Deve retornar um erro se o id é inválido', async () => {
        try {
          await tasksService.deleteTask('id_invalido');
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"value" must only contain hexadecimal characters',
            },
          });
        }
      });

      it('Deve retornar um erro se o id não existe no banco', async () => {
        try {
          await tasksService.deleteTask('620d114be63003905e83ca2f');
        } catch (err) {
          expect(err).to.deep.equal({
            status: 422,
            message: {
              message: errorMessages.wrongId,
            },
          });
        }
      });
    });
  });

  describe('Testando o tasksService.createTask', () => {
    describe('Quando as informações são válidas', () => {
      before(() => {
        sinon.stub(tasksModel, 'createTask').resolves(sampleTask1._id);
      });

      after(() => {
        tasksModel.createTask.restore();
      });

      it('Deve retornar o id da task', async () => {
        const id = await tasksService.createTask({
          name: sampleTask1.name,
          status: sampleTask1.status,
        });

        expect(id).to.be.a('string');
        expect(id).to.deep.equal(sampleTask1._id);
      });
    });

    describe('Quando o nome é inválido', () => {
      it('Deve retornar um erro se o nome não for uma string', async () => {
        try {
          await tasksService.createTask({
            name: 10,
            status: sampleTask1.status,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"name" must be a string',
            },
          });
        }
      });

      it('Deve retornar um erro se o nome for undefined', async () => {
        try {
          await tasksService.createTask({
            name: undefined,
            status: sampleTask1.status,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"name" is required',
            },
          });
        }
      });
    });

    describe('Quando o status é inválido', () => {
      it('Deve retornar um erro se o status não for uma string', async () => {
        try {
          await tasksService.createTask({
            name: sampleTask1.name,
            status: 10,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"status" must be a string',
            },
          });
        }
      });
      it('Deve retornar um erro se o status for undefined', async () => {
        try {
          await tasksService.createTask({
            name: sampleTask1.name,
            status: undefined,
          });
        } catch (err) {
          expect(err).to.deep.equal({
            status: 400,
            message: {
              message: '"status" is required',
            },
          });
        }
      });
    });
  });
});
