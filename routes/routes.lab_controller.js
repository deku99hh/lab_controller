const express = require('express');

const router = express.Router();

const lab_controller = require('../controllers/controllers.lab_controller')



router.post('/clint', lab_controller.starting)


router.post('/clint/info', lab_controller.updateDatabaseClint)

router.post('/clint/info/add', lab_controller.addToDatabaseClint)

router.get('/clint/info', lab_controller.getAllInfo)

router.post('/clint/shutdown/:lab/:pcId', lab_controller.shutdownAPC)

router.post('/clint/allowance', lab_controller.shutdownAllowence)

router.post('/clint/allowance/change', lab_controller.clintAllowanceChange)

router.get('/dashboard', lab_controller.getdashBoard)

module.exports = router