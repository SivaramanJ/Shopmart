"use strict";

const chai = require("chai");
const expect = chai.expect;
const myinit = require("../../../server");
const request = require("supertest");

describe("api check", () => {
  let app;
  let accessToken;

  before((done) => {
    app = myinit.init();
    done();
  });
  after((done) => {
    done();
  });
  describe("wrong request check", () => {
    it("should return 404", (done) => {
      const finish = (err) => {
        done(err);
      };
      request(app)
        .get("/v1/wrongAPI")
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          finish();
        });
    });
  });

  describe("User Login/Registration", () => {
    it("User already Exists with same mail id", (done) => {
      const query = {
        name: "adminnew",
        email: "admin@email.com",
        password: "12367",
      };
      request(app)
        .post("/user/register")
        .send(query)
        .expect(400)
        .end((err, res) => {
          expect("User already Exists with same mail id ").equal(res.body.msg);
          if (err) return done(err);
          done();
        });
    });
    it("Password should be greater than 6 chars", (done) => {
        const query = {
          name: "adminnew",
          email: "adminsiva11@email.com",
          password: "12367",
        };
        request(app)
          .post("/user/register")
          .send(query)
          .expect(400)
          .end((err, res) => {
            expect("Password should be greater than 6 letters ").equal(res.body.msg);
            if (err) return done(err);
            done();
          });
      });
      it("Success user login", (done) => {
        const query = { email: "admin@email.com", password: "1234567" };
        request(app)
          .post("/user/login")
          .send(query)
          .expect(200)
          .end((err, res) => {
            accessToken = res.body.accessToken;
            if (err) return done(err);
            done();
          });
      });
      it("Success user Info", (done) => {
        const query = { email: "admin@email.com", password: "1234567" };
        request(app)
          .get("/user/info")
          .set('Authorization', accessToken)
          .expect(200)
          .end((err, res) => {
            expect('admin', res.body.name);
            expect('admin@email.com', res.body.email)
            if (err) return done(err);
            done();
          });
      });
  });
});
