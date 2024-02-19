const { prisma } = require("../prisma/prisma-client");

const FollowController = {
	followUser: async (req, res) => {
		const { followingId } = req.body;
		const userId = req.user.userId;

		if (followingId === userId) {
			return res.status(500).json({ message: 'Вы не можете подписаться на самого себя' });
		}

		try {
			const existingSubscription = await prisma.follows.findFirst({
				where: {
					AND: [
						{ followerId: userId },
						{ followingId }
					]
				}
			})

			if (existingSubscription) {
				return res.status(400).json({ message: 'Подписка уже существует' });
			}

			await prisma.follows.create({
				data: {
					follower: { connect: { id: userId } },
					following: { connect: { id: followingId } },
				},
			});

			res.status(201).json({ message: 'Подписка успешно создана' });
		} catch (error) {
			console.log('error', error)
			res.status(500).json({ error: 'Ошибка сервера' });
		}
	},
	unfollowUser: async (req, res) => {
		res.send("Unfollow User");
	}
}

module.exports = FollowController;