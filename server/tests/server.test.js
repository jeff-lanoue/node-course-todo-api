const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//dump all todos from database
beforeEach((done) => {
    Todo.deleteMany({ }).then(() => done());
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

                Todo.find().then((Todo) => {
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
                    expect(Todo.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });//end of second test        
    

});