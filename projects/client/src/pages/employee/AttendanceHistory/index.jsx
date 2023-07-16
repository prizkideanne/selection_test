import { useEffect, useState } from "react";
import TablesWithTitle from "./TablesWithTitle";
import api from "../../../api";

export default function AttendanceHistory() {
  const [attendances, setAttendances] = useState([]);
  useEffect(() => {
    api
      .get("attendance/log")
      .then(({ data }) => {
        setAttendances(data.data ? data.data : []);
      })
      .catch((err) => console.log("err", err));
  }, []);
  return (
    <TablesWithTitle
      title={"Your Attendance Log"}
      subtitle={"You can see your attendance history here"}
      content={attendances}
    />
  );
}
