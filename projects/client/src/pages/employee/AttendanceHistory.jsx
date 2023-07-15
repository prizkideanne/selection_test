import TablesWithTitle from "../../components/TablesWithTitle";

const attendances = [
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    date: new Date(),
    clock_in: new Date(),
    clock_out: new Date(),
  },
];

export default function AttendanceHistory() {
  return (
    <TablesWithTitle
      title={"Your Attendance Log"}
      subtitle={"You can see your attendance history here"}
      content={attendances}
    />
  );
}
