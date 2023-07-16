const db = require("../../models");
const moment = require("moment");

module.exports = {
  async generatePayroll(req, res) {
    try {
      const user_id = req.user.id;
      const attendances = await db.Attendance.findAll({
        where: { user_id: user_id },
        order: ["createdAt"],
      });

      // assuming Employee_detail is connected to user with a 1-to-1 relationship
      const employeeDetail = await db.Employee_detail.findOne({
        where: { user_id: user_id },
      });
      const salary = await db.Salary.findOne({
        where: { id: employeeDetail.salary_id },
      });

      const fullDayDeduction = salary.basic_salary * 0.05; // 5% of the monthly salary for a full day absence
      const halfDayDeduction = salary.basic_salary * 0.025; // 2.5% of the monthly salary for a half day absence

      let payrollByMonth = [];
      let currentMonth = null;
      let totalDeduction = 0;

      for (const attendance of attendances) {
        const month = moment(attendance.createdAt).format("MMMM");
        if (month !== currentMonth) {
          // New month, save last month's payroll
          if (currentMonth !== null) {
            const totalSalary = salary.basic_salary - totalDeduction;
            const paydate = moment()
              .month(currentMonth)
              .endOf("month")
              .format("YYYY-MM-DD HH:mm:ss");
            await db.Payroll.create({
              user_id: user_id,
              total_deduction: totalDeduction,
              total_salary: totalSalary,
              paydate: paydate,
            });
            payrollByMonth.push({
              month: currentMonth,
              totalSalary: totalSalary,
              totalDeduction: totalDeduction,
              payDate: paydate,
              userId: user_id,
            });
          }
          // Reset for new month
          currentMonth = month;
          totalDeduction = 0;
        }
        if (!attendance.clock_in && !attendance.clock_out) {
          // Full day salary deduction
          totalDeduction += fullDayDeduction;
        } else if (attendance.clock_in && !attendance.clock_out) {
          // Half day salary deduction
          totalDeduction += halfDayDeduction;
        }
      }
      // Save last month's payroll
      if (currentMonth !== null) {
        const totalSalary = salary.basic_salary - totalDeduction;
        const paydate = moment()
          .month(currentMonth)
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss");
        await db.Payroll.create({
          user_id: user_id,
          total_deduction: totalDeduction,
          total_salary: totalSalary,
          paydate: paydate,
        });
        payrollByMonth.push({
          month: currentMonth,
          totalSalary: totalSalary,
          totalDeduction: totalDeduction,
          payDate: paydate,
          userId: user_id,
        });
      }

      res.status(200).json(payrollByMonth);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "error on server" });
    }
  },
};
