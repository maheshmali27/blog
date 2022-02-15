const router = require('express').Router();
const { getPosts, addPosts, updatePosts, deletePosts } = require('../controllers/postControls.js');

router.get('/', getPosts);
router.post('/add', addPosts);
router.patch('/:id', updatePosts);
router.delete('/:id', deletePosts);

module.exports = router;