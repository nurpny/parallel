const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const {Investor} = require('../db/index')


router.post('/investors', async(req, res, next) => {
  try {
    const newInvestor = await Investor.create({...req.body})
    res.status(201).json(newInvestor)
  } catch (err) {
    next(err)
  }
})


router.get('/investors', async (req, res, next) => {
  try {
    res.json("GET INVESTORS")
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const err = new Error("API route not found")
  err.status = 404;
  next(err)
})

module.exports = router
