const db = require("../../models");

module.exports = {
  async getMyPayroll(req, res) {
    const user_id = req.user.id;

    const checkSalary = await db.Employee_detail.findOne({ where: user_id })
    salaryPerDay.salary_id;
  },
};
