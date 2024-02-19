const express = require('express');
const multer = require('multer');
const { UserController, PostController, CommentController, LikeController, FollowController } = require('../controllers');
const authentificateToken = require('../middleware/auth');

const router = express.Router();

const uploadDestination = 'uploads';

const storage = multer.diskStorage({
	destination: uploadDestination,
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const uploads = multer({ storage: storage });

// Роуты пользователя
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authentificateToken, UserController.current);
router.get('/users/:id', authentificateToken, UserController.getUserById);
router.put('/users/:id', authentificateToken, UserController.updateUser);

// Роуты постов
router.post('/posts', authentificateToken, PostController.createPost);
router.get('/posts', authentificateToken, PostController.getAllPosts);
router.get('/posts/:id', authentificateToken, PostController.getPostById);
router.delete('/posts/:id', authentificateToken, PostController.deletePost);

// Роуты комментов
router.post('/comments', authentificateToken, CommentController.createComment);
router.delete('/comments/:id', authentificateToken, CommentController.deleteComment);

// Роуты лайков
router.post('/likes', authentificateToken, LikeController.likePost);
router.delete('/likes/:id', authentificateToken, LikeController.unlikePost);

// Роуты подписок
router.post('/follow', authentificateToken, FollowController.followUser);
router.delete('/unfollow/:id', authentificateToken, FollowController.unfollowUser);

module.exports = router;