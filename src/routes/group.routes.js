const express = require('express');
const {getGroups, getGroup ,postGroup ,putGroup, deleteGroup } = require('../controller/group.controller');


const router = express.Router();

router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/', postGroup);
router.put('/:id', putGroup);
router.delete('/:id', deleteGroup);


module.exports = router;