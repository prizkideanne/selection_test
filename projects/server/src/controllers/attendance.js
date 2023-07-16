const db = require("../../models");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = {
  async employeeClockIn(req, res) {
    try {
      console.log(req.user);
      const user_id = req.user.id;
      // Get today's date for querying
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      // Set end of the day
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      // Check if an existing clock-in entry exists for today for the given user
      const existingEntry = await db.Attendance.findOne({
        where: {
          user_id: user_id,
          clock_in: {
            [Op.gte]: todayStart,
            [Op.lt]: todayEnd,
          },
        },
      });

      // If a clock-in entry already exists, return error message
      if (existingEntry) {
        return res
          .status(400)
          .json({ message: "You've already clocked in today." });
      }

      // If no clock-in entry exists, create a new one
      const newAttendance = await db.Attendance.create({
        user_id: user_id,
        clock_in: new Date(), // Use current timestamp for clock-in
      });

      // Return the ID of the new attendance entry
      res.status(201).json({ id: newAttendance.id });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "salah bang",
      });
    }
  },

  async employeeClockOut(req, res) {
    try {
      // Extract user_id from request body
      const user_id = req.user.id;

      // Get today's date for querying
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      // Set end of the day
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      // Check if a clock-in entry exists for today for the given user and is not yet clocked out
      const entryToUpdate = await db.Attendance.findOne({
        where: {
          user_id: user_id,
          clock_in: {
            [Op.gte]: todayStart,
            [Op.lt]: todayEnd,
          },
          clock_out: null,
        },
      });

      // If no clock-in entry exists or it's already clocked out, return error message
      if (!entryToUpdate) {
        return res.status(400).json({
          message:
            "You haven't clocked in today or you've already clocked out.",
        });
      }

      // If a clock-in entry exists and it's not yet clocked out, update it with the clock-out time
      await db.Attendance.update(
        {
          clock_out: new Date(), // Use current timestamp for clock-out
        },
        {
          where: { id: entryToUpdate.id },
        }
      );

      // Return success message
      res.status(200).json({ message: "Successfully clocked out" });
    } catch (err) {
      // Log any errors and return server error message
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getTodayAttendance(req, res) {
    try {
      const today = moment().startOf("day");
      const tomorrow = moment(today).add(1, "days");

      const attendance = await db.Attendance.findOne({
        where: {
          user_id: req.user.id,
          clock_in: {
            [Op.gte]: today.toDate(),
            [Op.lt]: tomorrow.toDate(),
          },
        },
      });

      if (!attendance) {
        return res.status(404).json({
          message: "No attendance record found for today",
        });
      }

      // Manually format the attendance data
      const attendanceData = {
        id: attendance.id,
        clock_in: attendance.clock_in,
        clock_out: attendance.clock_out,
      };

      res.status(200).json({
        message: "Attendance record fetched successfully",
        attendance: attendanceData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },

  async getAttendaceLog(req, res) {
    try {
      const user_id = req.user.id;

      const pagination = {
        page: Number(req.query.page) || 1,
        perPage: Number(req.query.perPage) || 2,
        month: req.query.month,
        year: req.query.year,
      };

      const where = { user_id }; // initialize where clause with user_id

      if (pagination.month) {
        const startMonth = moment(pagination.month, "M")
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss");
        const endMonth = moment(pagination.month, "M")
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss");

        where.createdAt = {
          [Op.between]: [startMonth, endMonth],
        };
      }

      if (pagination.year) {
        const startYear = moment(pagination.year, "YYYY")
          .startOf("year")
          .format("YYYY-MM-DD HH:mm:ss");
        const endYear = moment(pagination.year, "YYYY")
          .endOf("year")
          .format("YYYY-MM-DD HH:mm:ss");

        where.createdAt = {
          [Op.between]: [startYear, endYear],
        };
      }

      const logs = await db.Attendance.findAll({
        where,
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
      });

      const countData = await db.Attendance.count({ where });
      pagination.totalData = countData;
      const totalPage = Math.ceil(pagination.totalData / pagination.perPage);
      pagination.totalPage = totalPage;

      if (pagination.totalData === 0) {
        res.status(400).send({ message: "Attendace not found" });
        return;
      }

      res.status(200).send({
        message: "sukses",
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          totalData: pagination.totalData,
          totalPage: pagination.totalPage,
        },
        data: logs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "error on server" });
      error;
    }
  },
};
