const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { jwtAuth } = require("./auth/index");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		maxAge: new Date(Date.now() + 3600000),
	}),
);
app.use((err, req, res, next) => {
	// Handle the error
	console.log(err);
	res.status(500).json({ error: "Internal Server Error" });
});

app.use(async function (req, res, next) {
	try {
		res.locals.user = req.user || null;
		next();
	} catch (error) {
		next(error);
	}
});
app.use(passport.initialize());
app.use(passport.session());
jwtAuth(passport);

app.use("/api/user", require("./routes/api/user"));
app.use("/api/todo", require("./routes/api/todo"));
http.createServer(app).listen(4500, () => {
	console.log("server run on port 4500");
});
