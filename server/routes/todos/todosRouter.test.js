import expect from 'expect'
import request from 'supertest'
import app from '../../server'
import TodoModel from './TodoModel'

const todos = [
  { text: 'First test todo' },
  { text: 'Second test todo' },
  { text: 'Third test todo' }
]

beforeEach((done) => {
  TodoModel.remove({})
    .then(() => TodoModel.insertMany(todos))
    .then(() => done())
})

describe('POST /api/todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo test'
    request(app)
      .post('/api/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        TodoModel.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create todo with invalid body data', (done) => {
    const text = 'Test todo should fail with no todo'
    request(app)
      .post('/api/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        TodoModel.find()
          .then((todos) => {
            expect(todos.length).toBe(3)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /api/todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3)
      })
      .end(done)
  })
})