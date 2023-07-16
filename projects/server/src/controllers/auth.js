require("dotenv").config();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const moment = require("moment");
const nodemailer = require("nodemailer");

const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async loginWithToken(req, res) {
    try {
      // Fetch the user data from the database
      const user = await db.User.findOne({ where: { id: req.user.id } });
      if (user) {
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "1hr",
        });
        res.status(200).json({
          message: "Login success!",
          data: {
            email: user.email,
            token: token,
            role: user.role_id,
          },
        });
      } else {
        res.status(404).send({
          message: "No user found with this ID.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  async login(req, res) {
    const { email, password } = req.body;

    console.log("req", req.body);

    try {
      if (email.length === 0 || password.length === 0) {
        res
          .status(406)
          .send({ message: "Please fill the email and password." });
      }

      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        res.status(401).send({
          message: "Invalid login credentials.",
        });
        return;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (user && isValid) {
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "1hr",
        });
        res.status(200).send({
          message: "Login success!",
          data: {
            email: user.email,
            token: token,
            role: user.role_id,
          },
        });
        return;
      } else {
        res.status(400).send({
          message: "Login failed, incorect username or password.",
        });
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).send({
        message: "error on server",
        error,
      });
    }
  },

  async registerEmployee(req, res) {
    const { email, role_id, salary, full_name, birth_date, join_date } =
      req.body;
    const t = await db.sequelize.transaction();
    try {
      const existingEmail = await db.User.findOne({ where: { email } });
      // console.log("existingemail", existingEmail);
      if (existingEmail !== null) {
        res.status(400).send({ message: "Email already exist" });
        return;
      }

      const accessToken = crypto.randomBytes(16).toString("hex");

      const newEmployee = await db.User.create({
        email,
        role_id,
        access_token: accessToken,
      });

      const newEmployeeSalary = await db.Salary.create({
        basic_salary: salary,
      });

      const newEmployeeDetail = await db.Employee_detail.create({
        full_name,
        user_id: newEmployee.id,
        salary_id: newEmployeeSalary.id,
        birth_date: moment(birth_date).format("YYYY-MM-DD HH:mm:ss"),
        join_date: moment(join_date).format("YYYY-MM-DD HH:mm:ss"),
      });

      // Email sending starts here
      let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "prizkideanne@outlook.com", // replace with your email
          pass: "amelinda05", // replace with your password
        },
      });

      let mailOptions = {
        from: "prizkideanne@outlook.com", // sender address
        to: email, // list of receivers
        subject: "Welcome to our platform", // Subject line
        text: `Hello ${full_name},

      Welcome to our platform!

      Please click the following link to set up your password and complete your registration:

      http://localhost:3000/setpassword?email=${email}&token=${accessToken}

      If you didn’t ask to change your password, you can ignore this email.

      Thanks,
      HereNow Team`,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      // Email sending ends here

      res.status(200).send({
        message: "Success inserting employee data.",
        data: { newEmployee, newEmployeeDetail, newEmployeeSalary },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something wrong on server." });
    }
  },
  async setPassword(req, res) {
    const { email, token } = req.query;
    const { password } = req.body;

    // Validate inputs
    if (!email || !token || !password) {
      return res.status(400).send({ message: "Missing required parameters." });
    }

    // Find the user
    const user = await db.User.findOne({
      where: { email, access_token: token },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password and remove the access token
    await user.update({ password: hashedPassword, access_token: null });

    res.status(200).send({ message: "Password updated successfully." });
  },
};
