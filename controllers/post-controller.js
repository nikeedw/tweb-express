const { prisma } = require("../prisma/prisma-client");

const PostController = {
	createPost: async (req, res) => {
		const { content } = req.body;

		const authorId = req.user.userId;

		if(!content) {
			return res.status(400).json({ error: "Все поля обязательны" })
		}

		try {
			const post = await prisma.post.create({
				data: {
					content,
					authorId
				}
			})

			res.json(post);
		} catch(error) {
			console.log("Create post Error", error);
			res.status(500).json({ error: "Internal server error" });
		}
	},
	getAllPosts: async (req, res) => {
		const userId = req.user.userId;

		try {
			const posts = await prisma.post.findMany({
				include: {
					likes: true,
					author: true,
					comments: true
				},
				orderBy: {
					createdAt: 'desc'
				}
			})

			const postWithLikeInfo = posts.map(post => ({
				...post,
				likedByUser: post.likes.some(like => like.userId === userId)
			}))

			res.json(postWithLikeInfo);
		} catch(error) {
			console.log("Get all posts error", error);
			res.status(500).json({ error: "Internal server error" });
		}
	},
	getPostById: async (req, res) => {
		res.send('getPostById');
	},
	deletePost: async (req, res) => {
		res.send('deletePost');
	}
}

module.exports = PostController;
