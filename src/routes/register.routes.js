const express = require('express');
const { pruebaModbus, getRegisters, getRegister ,postRegister ,putRegister, deleteRegister, getTypes } = require('../controller/register.controller');


const router = express.Router();

router.get('/modbus', pruebaModbus)
router.get('/types', getTypes);
router.get('/', getRegisters);
router.get('/:id_group', getRegister);
router.post('/', postRegister);
router.put('/:id', putRegister);
router.delete('/:id_group', deleteRegister);


module.exports = router;