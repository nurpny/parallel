const chai = require('chai')
const expect = chai.expect;
const assert = chai.assert;
//const db = require('../index')
const Investor = require('./Investor')
const db = require('../db')


describe('Models', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  afterEach(() => {
    return db.sync({ force: true })
  })

  describe('Investor Model', () => {

    it('throws an error if required field is not filled out', function (done) {
      Investor.create({
        firstName: 'cody',
        lastName: 'puppy',
        dob: '01/01/1993',
        address: '',
        state: 'NY',
        phone: '917-999-9999',
        zipcode: '11354'
      }).then(function (result) {
        expect.fail();
        done()
      }).catch(function (err) {
        expect(err['name']).to.be.equal('SequelizeValidationError');
        done()
      })
    })

    it('throws an error if zipcode does not match the validation', function (done) {
      Investor.create({
        firstName: 'cody',
        lastName: 'puppy',
        dob: '01/01/2018',
        address: '55 west end',
        state: 'NY',
        phone: '917-999-9999',
        zipcode: '1135444f'
      }).then(function (result) {
        expect.fail();
        done()
      }).catch(function (err) {
        expect(err['name']).to.be.equal('SequelizeValidationError');
        done()
      })
    })

    it('throws an error if dob is less than min date', function (done) {
      Investor.create({
        firstName: 'cody',
        lastName: 'puppy',
        dob: '01/01/0008',
        address: '55 west end',
        state: 'NY',
        phone: '917-999-9999',
        zipcode: '11354'
      }).then(function (result) {
        expect.fail();
        done()
      }).catch(function (err) {
        expect(err['name']).to.be.equal('SequelizeValidationError');
        done()
      })
    })

    it('accepts a new investor with required fields filled in', function (done) {
      Investor.create({
        firstName: 'cody',
        lastName: 'puppy',
        dob: '01/01/1998',
        address: '55 west end',
        state: 'NY',
        phone: '917-999-9999',
        zipcode: '11354'
      }).then(function (result) {
        expect(result).to.exist
        done()
      }).catch(function (err) {
        expect.fail()
        done()

      })
    })




    // it('throws an error if required field is not filled out', async () => {
    //   await expect(fails()).to.be.rejectedWith(Error)
    // })

    // it('returns false if the password is incorrect', () => {
    //   expect(cody.state).to.be.equal('NY')
    // })

  })
})
