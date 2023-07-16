require("dotenv").config();
const db = require("../../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      // Fetch all users from the database, including associated Role data
      const users = await db.User.findAll({
        attributes: ["email", "role_id"], // Only fetch these fields
        include: [
          {
            model: db.Role,
            attributes: ["name"], // Only fetch the role name
          },
          {
            model: db.Employee_detail,
            attributes: ["full_name", "join_date"],
          },
        ],
      });

      // Map through users to structure the data
      const usersData = users.map((user) => {
        return {
          name: user.Employee_detail ? user.Employee_detail.full_name : "Empty",
          email: user.email,
          joinDate: user.Employee_detail
            ? user.Employee_detail.join_date
            : "Empty",
          role: user.role_id === 1 ? "Admin" : "Employee",
        };
      });

      // Send the users as the response
      res.status(200).json(usersData);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
