const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  suite('POST /api/translate tests', () => {
    test('Translation with text and locale fields', (done) => {
      let text = 'I had a bicky then went to the chippy.';
      let locale = 'british-to-american';
      let translation = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
      chai.request(server)
        .post('/api/translate')
        .send({ text, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, translation);
          done();
        });
    });
    test('Translation with text and invalid locale field', (done) => {
      let text = 'I had a bicky then went to the chippy.';
      let locale = 'british-to-french';
      chai.request(server)
        .post('/api/translate')
        .send({ text, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
          done();
        });
    });
    test('Translation with missing text field', (done) => {
      let locale = 'british-to-american';
      chai.request(server)
        .post('/api/translate')
        .send({ locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });
    test('Translation with missing locale field', (done) => {
      let text = 'I had a bicky then went to the chippy.';
      chai.request(server)
        .post('/api/translate')
        .send({ text })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });
    test('Translation with empty text', (done) => {
      let text = '';
      let locale = 'british-to-american';
      chai.request(server)
        .post('/api/translate')
        .send({ text, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'No text to translate' });
          done();
        });
    });
    test('Translation with text that needs no translation', (done) => {
      let text = 'Mangoes are my favourite fruit.';
      let locale = 'american-to-british';
      chai.request(server)
        .post('/api/translate')
        .send({ text, locale })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, 'Everything looks good to me!');
          done();
        });
    });
  });
});
