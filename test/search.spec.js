'use strict';

const path = require("path")
const fs = require("fs")
const should = require('chai').Should();
const request = require("supertest");
const config = require('../config');

let oAuth = request(config.api_host.auth + '/oauth2');
let apiHost = request(config.api_host.search);

const directoryPath = path.join(__dirname, config.fileDir.search);
const partition = 'opendes';
let token = null;

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Error getting directory information.")
  } else {
    files.forEach(file => {
      let data = null;

      before((done) => {
        // Get a new OAuth Token
        oAuth.post('/token')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(config.auth_params)
          .then((res) => {
            token = 'Bearer ' + res.body.access_token;
            done();
          });
      });

      describe("Search Validation Check: " + file, () => {
        const params = require(config.fileDir.search + '/' + file);

        it("query: " + params.query, (done) => {
          apiHost.post('/api/search/v2/query')
            .set('Authorization', token)
            .set('data-partition-id', partition)
            .send(params)
            .expect(200)
            .then((res) => {
              res.body.should.be.an('object');
              data = res.body;
              done();
            });
        });

        it("should find at least 1", () => data.totalCount.should.be.at.least(1));
      });

      after((done) => {
        if (process.env.LOG_LEVEL === 'debug') {
          console.log(data);
        }
        done();
      });
    });
  }
});
