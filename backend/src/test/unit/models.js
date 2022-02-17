const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const { getConnection } = require('./mongoMockConnection');

const tasksModel = require('../../models/tasksModel');

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

const sampleCreateTask1 = {
  name: 'createTest',
  status: 'pronto',
};

describe('Testando o TasksModel', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('TodoList').collection('tasks').drop();
    MongoClient.connect.restore();
  });

  describe('Testando o tasksModel.getAllTasks', () => {
    describe('Quando não existe nenhuma task', () => {
      it('Deve retornar um array vazio', async () => {
        const task = await tasksModel.getAllTasks();

        expect(task).to.be.a('array');
        expect(task).to.be.empty;
      });
    });

    describe('Quando existem tasks', () => {
      before(async () => {
        await connectionMock
          .db('TodoList')
          .collection('tasks')
          .insertMany([sampleTask1, sampleTask2]);
      });

      it('Deve retornar um array com as tasks esperadas', async () => {
        const tasks = await tasksModel.getAllTasks();

        expect(tasks).to.be.a('array');
        expect(tasks).to.deep.equal([sampleTask1, sampleTask2]);
      });
    });
  });

  describe('Testando o tasksModel.createTask', () => {
    it('Deve retornar o id da task criada', async () => {
      const id = await tasksModel.createTask(sampleCreateTask1);

      expect(id).to.be.a('object');
      expect(id.toString()).to.have.length(24);
    });
  });

  describe('Testando o tasksModel.updateTask', () => {
    describe('Quando a task existe', () => {
      it('Deve retornar 1', async () => {
        const isUpdated = await tasksModel.updateTask(
          sampleTask1._id,
          'updateTest',
          'em andamento',
        );

        expect(isUpdated).to.equal(1);
      });
    });

    describe('Quando a task não existe', () => {
      it('Deve retornar 0', async () => {
        const isUpdated = await tasksModel.updateTask(
          '000000000000000000000000',
          'updateTest',
          'em andamento',
        );
        
        expect(isUpdated).to.equal(0);
      });
    });
  });

  describe('Testando o tasksModel.deleteTask', () => {
    describe('Quando a task existe', () => {
      it('Deve retornar a task excluída', async () => {
        const task = await tasksModel.deleteTask(sampleTask2._id);

        expect(task).to.deep.equal(sampleTask2);
      });
    });

    describe('Quando a task não existe', () => {
      it('Deve retornar null', async () => {
        const task = await tasksModel.deleteTask(sampleTask2._id);

        expect(task).to.be.null;
      });
    });
  });
});
