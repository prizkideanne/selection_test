const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const { body, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = {
  async verifyToken(req, res, next) {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // console.log("auth", token);

    // if (token === null) return res.sendStatus(401);

    // jwt.verify(token, secretKey, (err, user) => {
    //   if (err) return res.sendStatus(403);
    //   req.user = user;
    //   next();
    // });

    // check token valid or not
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({
        message: "token is not found",
      });
      return;
    }

    const [format, token] = authorization.split(" ");
    if (format.toLocaleLowerCase() === "bearer") {
      try {
        const payload = jwt.verify(token, secretKey);
        if (!payload) {
          res.status(401).send({
            message: "token verification failed",
          });
          return;
        }
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).send({
          message: "invalid token",
          error,
        });
      }
    }
  },
};
