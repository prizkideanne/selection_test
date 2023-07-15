require("dotenv").config();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const moment = require("moment");

const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      if (email.length === 0 || password.length === 0) {
        res
          .status(406)
          .send({ message: "Please fill the email and password." });
      }

      const user = await db.User.findOne({ where: { email } });
      const isValid = await bcrypt.compare(password, user.password);
      if (user && isValid) {
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "1hr",
        });
        res.status(200).send({
          message: "Login success!",
          data: user.email,
          token: token,
        });
        return;
      } else {
        res.status(400).send({
          message: "Login failed, incorect username or password.",
        });
      }
    } catch (error) {
      console.log(error);
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

      res.status(200).send({
        message: "Success inserting employee data.",
        data: { newEmployee, newEmployeeDetail, newEmployeeSalary },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something wrong on server." });
    }
  },
};
