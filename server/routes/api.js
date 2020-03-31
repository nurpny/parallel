const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')
const {Investor} = require('../db/index')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', "uploads"))
  },
  fileName: (req, file, cb) => {
    const fileName = originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + "_"+ fileName)
  }
})

const upload = multer({
  storage: storage
})



router.post('/investors', upload.single('fileUpload'), async(req, res, next) => {
  try {
    let newInvestor = {}
    if (req.file) {
      newInvestor = await Investor.create({...req.body, fileUpload: req.file.path})
    } else {
      newInvestor = await Investor.create({...req.body})
    }
    res.status(201).json(newInvestor)
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
