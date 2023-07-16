import React, { useEffect, useState } from "react";
import TablesWithTitle from "./TablesWithTitle";
import axios from "axios";

function AdminLandingPage() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/getAllUser")
      .then(({ data }) => {
        setEmployees(data);
      })
      .catch((err) => console.log("err", err));
  }, []);
  const addUser = () => {
    console.log("add user");
  };
  return (
    <TablesWithTitle
      title={"Employee Directory"}
      subtitle={"Comprehensive list of all employees in the organization"}
      content={employees}
      addUserHandler={addUser}
    />
  );
}

export default AdminLandingPage;
