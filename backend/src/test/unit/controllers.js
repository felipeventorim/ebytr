const sinon = require('sinon');
const { expect } = require('chai');

const tasksService = require('../../services/tasksService');
const tasksController = require('../../controllers/tasksController');

const errorMiddleware = require('../../middlewares/errorMiddleware');
const errorConstructor = require('../../utils/functions/errorConstructor');
const errorMessages = require('../../utils/dictionary/errorMessages');

const sampleTask1 = {
  _id: '620d114be63003905e83ca2e',
  name: 'test1',
  status: 'pronto',
  createdAt: '16/02/2022 11:59:23',
};

const wrongId = '620d114be63003905e83ca2f';

describe('Testando o tasksController', () => {
  describe('Testando o tasksController.createTask', () => {
    describe('Quando as informações são válidas', () => {
      const req = {};
      const res = {};

      before(() => {
        req.body = {
          name: sampleTask1.name,
          status: sampleTask1.status,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(tasksService, 'createTask').resolves(sampleTask1._id);
      });

      after(() => {
        tasksService.createTask.restore();
      });

      it('Deve retornar o status 201', async () => {
        await tasksController.createTask(req, res);

        expect(res.status.calledWith(201)).to.be.true;
      });

      it('Deve retornar o json com o Id do produto criado', async () => {
        await tasksController.createTask(req, res);

        expect(res.json.calledWith(sampleTask1._id)).to.be.true;
      });
    });

    describe('quando o payload informado não é válido', () => {
      const req = {};
      const res = {};
      const next = (err) => errorMiddleware(err, req, res);

      before(() => {
        req.body = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
      
      it('Deve retornar um erro com o status 400', async () => {
        await tasksController.createTask(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Deve retornar um erro com o json esperado', async () => {
        await tasksController.createTask(req, res, next);

        expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
      });
    });
  });

  describe('Testando o tasksController.updateTask', () => {
    describe('Quando as informações são válidas', () => {
      const req = {};
      const res = {};

      before(() => {
        req.params = {
          id: sampleTask1._id,
        };
        req.body = {
          name: sampleTask1.name,
          status: sampleTask1.status,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(tasksService, 'updateTask').resolves();
      });

      after(() => {
        tasksService.updateTask.restore();
      });

      it('Deve retornar o status 200', async () => {
        await tasksController.updateTask(req, res);

        expect(res.status.calledWith(200)).to.be.true;
      });
    });

    describe('quando o payload informado não é válido', () => {
      const req = {};
      const res = {};
      const next = (err) => errorMiddleware(err, req, res);

      before(() => {
        req.params = {
          id: sampleTask1._id,
        };
        req.body = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
      
      it('Deve retornar um erro com o status 400', async () => {
        await tasksController.updateTask(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Deve retornar um erro com o json esperado', async () => {
        await tasksController.updateTask(req, res, next);

        expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
      });
    });

    describe('quando o id informado não é válido', () => {
      const req = {};
      const res = {};
      const next = (err) => errorMiddleware(err, req, res);

      before(() => {
        req.params = {
          id: wrongId,
        };
        req.body = {
          name: sampleTask1.name,
          status: sampleTask1.status,
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(tasksService, 'updateTask').rejects(errorConstructor(400, errorMessages.wrongId));
      });

      after(() => {
        tasksService.updateTask.restore();
      });
      
      it('Deve retornar um erro com o status 400', async () => {
        await tasksController.updateTask(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Deve retornar um erro com o json esperado', async () => {
        await tasksController.updateTask(req, res, next);

        expect(res.json.calledWith({ message: 'Wrong task ID' })).to.be.true;
      });
    });
  });
});