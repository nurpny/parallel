const Sequelize = require('sequelize')
const db = require('../db')

const states = ["AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

const currentDate = new Date()
let options = { year: 'numeric', month: '2-digit', day: '2-digit' }
const dateTimeFormat = new Intl.DateTimeFormat('en-US', options)
const [{ value: mo }, , { value: dt }, , { value: yr }] = dateTimeFormat.formatToParts(currentDate)
const maxDate = `${yr - 18}-${mo}-${dt}`
const minDate = `${yr - 120}-${mo}-${dt}`

module.exports = db.define('Investor', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAfter: minDate,
      isBefore: maxDate,
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[2-9]\d{2}-\d{3}-\d{4}$/
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.ENUM(states),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^\d{5}$/
    }
  },
  fileUpload: {
    type: Sequelize.STRING,
  }
})
