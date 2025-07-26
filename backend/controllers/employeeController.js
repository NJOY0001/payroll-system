const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', employeeController.getEmployees);

router.post('/', [
  check('empId').notEmpty(),
  check('empName').notEmpty(),
  check('email').isEmail(),
  check('salary').isNumeric()
], employeeController.createEmployee);

router.put('/:empId', employeeController.updateEmployee);

router.delete('/:empId', employeeController.deleteEmployee);

module.exports = router;