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

      const payrollByMonth = []; // Array to store payroll data for each month

      for (let month = 1; month <= 12; month++) {
        const monthName = moment()
          .month(month - 1)
          .format("MMMM");
        const startOfMonth = moment()
          .month(month - 1)
          .startOf("month");
        const endOfMonth = moment()
          .month(month - 1)
          .endOf("month");

        const monthAttendances = attendances.filter((attendance) =>
          moment(attendance.createdAt).isBetween(
            startOfMonth,
            endOfMonth,
            null,
            "[]"
          )
        );

        const fullDayDeduction =
          salary.basic_salary / moment(endOfMonth).daysInMonth(); // Deduction for a full day absence
        const halfDayDeduction =
          salary.basic_salary / (2 * moment(endOfMonth).daysInMonth()); // Deduction for a half day absence

        let totalDeduction = 0;

        for (const attendance of monthAttendances) {
          if (!attendance.clock_in && !attendance.clock_out) {
            // Full day salary deduction
            totalDeduction += fullDayDeduction;
          } else if (attendance.clock_in && !attendance.clock_out) {
            // Half day salary deduction
            totalDeduction += halfDayDeduction;
          }
        }

        const totalSalary = salary.basic_salary - totalDeduction;
        const paydate = moment()
          .month(month - 1)
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss");

        payrollByMonth.push({
          month: monthName,
          baseSalary: salary.basic_salary,
          totalSalary: totalSalary,
          totalDeduction: totalDeduction,
          payDate: paydate,
          userId: user_id,
        });
      }

      res.status(200).json(payrollByMonth);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error on server" });
    }
  },
};
