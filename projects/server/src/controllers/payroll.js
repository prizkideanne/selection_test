const db = require("../../models");
const moment = require("moment");

module.exports = {
  async generatePayroll(req, res) {
    try {
      const user_id = req.user.id;
      const attendances = await db.Attendance.findAll({
        where: { user_id: user_id },
      });

      // assuming Employee_detail is connected to user with a 1-to-1 relationship
      const employeeDetail = await db.Employee_detail.findOne({
        where: { user_id: user_id },
      });
      const salary = await db.Salary.findOne({
        where: { id: employeeDetail.salary_id },
      });

      const dailySalary = salary.basic_salary / 20; // calculate the daily salary

      let totalDeduction = 0;
      attendances.forEach((a) => {
        if (!a.clock_in && !a.clock_out) {
          // Full day salary deduction
          totalDeduction += dailySalary;
        } else if (a.clock_in && !a.clock_out) {
          // Half day salary deduction
          totalDeduction += dailySalary / 2;
        }
      });

      const totalSalary = salary.basic_salary - totalDeduction;
      const endMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");

      const payroll = await db.Payroll.create({
        user_id: user_id,
        total_deduction: totalDeduction,
        total_salary: totalSalary,
        paydate: endMonth,
      });

      res.status(200).json(payroll);
    } catch (error) {
      console.log(error), error;
      res.status(500).send({ message: "error on server" });
    }
  },
};
