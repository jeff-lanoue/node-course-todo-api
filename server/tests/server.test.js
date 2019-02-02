const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//add some seed data
const todos = [{
    _id: new ObjectID(),
    text: 'First test Todo'
},{
    _id: new ObjectID(),
    text: 'Second test Todo',
    completed: true,
    completedAt: 125487
}];

//dump all todos from database
beforeEach((done) => {
    Todo.deleteMany({ }).then(() => {
       Todo.insertMany(todos); 
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((Todo) => {
                    expect(Todo.length).toBe(1);
                    expect(Todo[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });//end of first test

    it('Should not create todo with invalid body data', (done) => {
        
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((Todo) => {
                    expect(Todo.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });//end of second test        
});
    
describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo Document', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should return a 404 if todo not found', (done) => {
        var tempID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${tempID}`)
            .expect(404)
            .end(done);
    });

    it('Sould return 404 for non valid ids', (done) => {
        request(app)
            .get(`/todos/dirTyniGR`)
            .expect(404)
            .end(done);        
    });

});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
    
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
            if (err) {
                return done(err);
            }
    
            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
        });
    });

    it('Should return a 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });
    
    it('Should return a 404 fo non valid ids', (done) => {

        request(app)
            .delete(`/todos/123547`)
            .expect(404)
            .end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('Should update a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var newText = 'This is the test and there was a bug with toBeA(number)';
        
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text:newText,
                completed:true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(newText);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done)

    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var newText = 'This is the test text';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text:newText,
                completed:false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(newText);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done)
    });

});