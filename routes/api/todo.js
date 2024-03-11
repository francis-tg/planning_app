const { protect } = require("../../auth/auth");
const { ValidateField } = require("../../middlewares/validation");
const db = require("../../models");

const router = require("express").Router();

router.get("/", protect(), async (req, res) => {
	try {
		const todos = await db.Todo.findAll({
			where: { user_id: req.user?.id },
		});
		return res.status(200).json({ todos, user: req.user });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
router.post("/add", protect(), ValidateField, async (req, res) => {
	try {
		const newTodo = await db.Todo.create({
			...req.body,
			user_id: req.user?.id,
		});
		return res.status(201).json({ state: "SUCCESS", newTodo });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
module.exports = router;
