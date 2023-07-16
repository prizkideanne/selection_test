const db = require("../../models");

module.exports = {
  async generatePayroll(req, res) {
    const user_id = req.user.id;
    try {
      const user = await db.User.findOne({
        where: { id: user_id },
        attributes: ["id", "email", "role_id"],
        include: [
          {
            model: db.Employee_detail,
            attributes: ["full_name"],
            include: {
              model: db.Salary,
              attributes: ["basic_salary"],
            },
          },
          {
            model: db.Attendance,
            attributes: ["clock_in", "clock_out"],
          },
        ],
      });
      if (!user) {
        return res.status(400).send({ message: "user not found" });
      }

      const salaryPerMonth = user.Employee_detail.Salary.basic_salary;
      console.log(salaryPerMonth);

      const thisMonth = moment().month()
      
      function getWeekdaysInMonth(year, month) {
        // Month in Moment.js is 0-based, so 9 is actually October.
        let startDate = moment([year, month]);

        let monthDays = [];
        while (startDate.month() === month) {
          if (startDate.isoWeekday() <= 5) {
            // 1-5 corresponds to Mon-Fri
            monthDays.push(startDate.format("YYYY-MM-DD"));
          }
          startDate.add(1, "day");
        }

        return monthDays;
      }

      res.status(200).send({ message: "success", data: user });
    } catch (error) {
      console.log(error), error;
      res.status(500).send({ message: "error on server" });
    }
  },
};
