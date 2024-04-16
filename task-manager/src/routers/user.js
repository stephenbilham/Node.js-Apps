const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users).status(201);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).send("User not found!");
		}

		res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post("/users", async (req, res) => {
	try {
		const user = new User(req.body);

		await user.save();
		res.status(201).send(user);
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

router.put("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).send("User not found!");
		}

		Object.assign(user, req.body);

		await user.save();

		res.status(200).send(user);
	} catch (e) {
		res.status(404).send(e);
	}
});

router.delete("/users/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByIdAndRemove(userId);

		if (!user) {
			return res.status(404).send("User not found!");
		}

		res.status(200).send("User successfully removed!");
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
