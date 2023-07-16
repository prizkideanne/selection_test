import React, { useEffect, useState } from "react";
import api from "../../../api";
import TablesWithTitle from "./TablesWithTitle";

function PayrollReports() {
  const [payroll, setPayroll] = useState([]);
  useEffect(() => {
    api
      .get("payroll")
      .then(({ data }) => {
        setPayroll(data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <TablesWithTitle
      title={"Employee Payroll Reports"}
      subtitle={
        "Detailed overview of salary disbursements and deductions for each employee"
      }
      content={payroll}
    />
  );
}

export default PayrollReports;
