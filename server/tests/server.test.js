const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//add some seed data
const todos = [{
    text: 'First test Todo'
},{
    text: 'Second test Todo'
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

});