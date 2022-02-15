const router = require('express').Router();
const { getUsers, getLimitUsers, addUsers, updateUsers, deleteUsers } = require('../controllers/userControls.js');

router.get('/', getUsers);
router.get('/:page', getLimitUsers);
router.post('/add', addUsers);
router.patch('/:id', updateUsers);
router.delete('/:id', deleteUsers);

module.exports = router;