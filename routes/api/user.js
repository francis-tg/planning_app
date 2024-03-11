const { hashSync, compareSync } = require("bcryptjs");
const {
	ValidateField,
	ValidateParams,
} = require("../../middlewares/validation");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const { protect } = require("../../auth/auth");
const router = require("express").Router();

router.get("/me", protect(), async (req, res) => {
	return res.status(200).json(req.user);
});

router.post("/add", ValidateField, async (req, res) => {
	try {
		const existUser = await db.User.findOne({
			where: { email: req.body?.email },
		});
		if (existUser) return res.status(400).send("Utilisateur existe déjà");
		const newUser = await db.User.create({
			...req.body,
			password: hashSync(req.body?.password, 10),
		});
		return res.status(201).json(newUser);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
router.post(
	"/update/:id",
	ValidateField,
	ValidateParams,
	protect(),
	async (req, res) => {
		try {
			const { id } = req.params;
			const newUser = await db.User.update(
				{
					...req.body,
					password: hashSync(req.body?.password, 10),
				},
				{ where: { id } },
			);
			return res.status(200).json(newUser);
		} catch (error) {
			return res.status(500).send("Internal error");
		}
	},
);
router.post("/login", ValidateField, async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await db.User.findOne({
			where: { email },
			raw: true,
		});
		if (!user)
			return res.status(401).json({
				state: "ERROR",
				message: "Les informations de connexion ne sont pas correct!",
			});
		const isMatch = compareSync(password, user?.password);
		if (!isMatch)
			return res.status(401).json({
				state: "ERROR",
				message: "Les informations de connexion ne sont pas correct!",
			});
		if (user && isMatch) {
			//extraire le password de l'objet
			const { password, ...getPayload } = user;
			const payload = { ...getPayload };
			const token = jwt.sign(
				payload,
				process.env.SECRET ?? "hjshd@°#§@¦@°§°§¬¬|@°§°@§#¬§575dAj",
				{ expiresIn: "1d" },
			);
			return res.status(200).json({ state: "SUCCESS", token });
		}
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

module.exports = router;
