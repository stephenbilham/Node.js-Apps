const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

const router = express.Router();

// multer middleware
const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
			return cb(new Error("Please upload a png, jpg, or jpeg file"));
		}
		cb(undefined, true);
	},
});

// Add the 'authMiddleware' to the route
router.get("/users/me", authMiddleware, async (req, res) => {
	try {
		const user = req.user;

		if (!user) {
			return res.status(404).send({ error: "No authenticated user found" });
		}

		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/users/:id/avatar", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.avatar) {
			throw new Error();
		}

		res.set("Content-Type", "image/jpg");
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send(e);
	}
});

router.post("/users", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken(user._id);
		res.status(200).send({ user, token });
	} catch (e) {
		console.error(e);
		res.status(500).send(e);
	}
});

router.post("/users/logout", authMiddleware, async (req, res) => {
	try {
		// we filter because we want to logout of a single device (if i logout on comp dont want on phone) all different tokens
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/users/logoutAll", authMiddleware, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/users/signup", async (req, res) => {
	try {
		const user = new User(req.body);
		const token = await user.generateAuthToken(user._id);
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post(
	"/users/me/avatar",
	authMiddleware,
	upload.single("avatar"),
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.user.avatar = buffer;
		await req.user.save();
		res.send(req.user);
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.patch("/users/me", authMiddleware, async (req, res) => {
	try {
		const user = await req.user;

		Object.assign(user, req.body);
		await user.save();

		res.status(200).send(user);
	} catch (e) {
		res.status(404).send(e);
	}
});

router.delete("/users/me", authMiddleware, async (req, res) => {
	try {
		// can use all this because of the middleware sending the user and its methods on it with mongoose
		await req.user.remove();

		res.status(200).send(req.user);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.delete("/users/me/avatar", authMiddleware, async (req, res) => {
	try {
		if (req.user.avatar) {
			req.user.avatar = undefined;
		}
		await req.user.save();
		res.status(200).send(req.user);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
