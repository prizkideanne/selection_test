import React, { useState, useEffect } from "react";
import moment from "moment";
import api from "../../api";
import { useAuth } from "../../hooks/useAuth";

const EmployeeLandingPage = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceToday, setAttendanceToday] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getTodayAttendance();
  }, []);

  const getTodayAttendance = async () => {
    api
      .get("attendance/today")
      .then(({ data }) => {
        const attendances = data.attendance;
        const message = data.message;
        setAttendanceToday({ ...attendances, message });
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err));
  };

  const handleClockIn = () => {
    api
      .post("attendance/in")
      .then(() => getTodayAttendance())
      .catch((err) => console.log("err clock in", err));
  };

  const handleClockOut = () => {
    api
      .post("attendance/out")
      .then(() => getTodayAttendance())
      .catch((err) => console.log("err clock out", err));
  };

  const getClockStatus = () => {
    const { message, clock_in, clock_out } = attendanceToday;
    if (!clock_in && !clock_out) {
      return message;
    } else if (!clock_out) {
      return `Clocked in: ${moment(clock_in).format("LT")}`;
    } else {
      return `Clocked out: ${moment(clock_out).format("LT")}`;
    }
  };

  return isLoading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div className="flex flex-col w-full bg-gray-50">
      <div className="pb-12 px-4 sm:px-6 lg:px-8 space-y-5 bg-red-600/90">
        <div className="flex items-center justify-between p-6  rounded-xl sm:flex-col sm:items-center sm:space-y-4 sm:space-x-0">
          <div className="flex items-center justify-between flex-col md:flex-row w-full space-y-3">
            <div className="text-2xl font-bold text-white sm:text-3xl">
              Welcome, {user.name}
            </div>
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                attendanceToday.clock_in && !attendanceToday.clock_out
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {getClockStatus()}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg shadow-black/30 lg:p-16 sm:max-w-xl">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-2xl font-bold sm:text-3xl flex flex-col items-center">
                <span>{currentTime.toLocaleTimeString()}</span>
                <span className="text-sm font-medium">
                  {moment().format("dddd, DD MMMM YYYY")}
                </span>
              </div>
              {attendanceToday.clock_in ? (
                attendanceToday.clock_out ? (
                  <button
                    disabled
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 sm:text-base sm:py-3 sm:px-6 shadow-lg"
                  >
                    Have a good rest!
                  </button>
                ) : (
                  <button
                    onClick={handleClockOut}
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-base sm:py-3 sm:px-6"
                  >
                    Clock Out
                  </button>
                )
              ) : (
                <button
                  onClick={handleClockIn}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-base sm:py-3 sm:px-6"
                >
                  Clock In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-5 md:max-w-full space-y-3">
          <span className="text-md border-b-2 w-full flex font-medium">
            Announcement
          </span>
          <div className="flex flex-col items-center justify-center space-y-1 py-10 md:py-32">
            <span className="font-medium">No Accouncement</span>
            <span className="text-xs">You don't have any announcement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLandingPage;
