const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

function jwtAuth(passport) {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = process.env.SECRET ?? "hjshd@°#§@¦@°§°§¬¬|@°§°@§#¬§575dAj";
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done) {
			db.User.findOne({ where: { id: jwt_payload.id }, raw: true }).then(
				async (user, err) => {
					if (err) {
						console.log(err);

						return done(err, false);
					}
					if (user) {
						process.nextTick(async () => {
							return done(null, user);
						});
					} else {
						return done(null, false);
						// or you could create a new account
					}
				},
			);
		}),
	);
}
module.exports = {
	jwtAuth,
};
