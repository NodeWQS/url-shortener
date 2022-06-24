const router = require('express').Router()
const controller = require('./system.controller')
const middleware = require('./system.service')

router.post('/', middleware ,controller.create)
router.get('/:id', controller.goto)

module.exports = router