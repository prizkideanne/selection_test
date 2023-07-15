import React, { useState, useEffect } from "react";
import moment from "moment";

const EmployeeLandingPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockedInTime, setClockedInTime] = useState(null);
  const [clockedOutTime, setClockedOutTime] = useState(null);
  const [username, setUsername] = useState("John Doe");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClockIn = () => {
    setClockedInTime(new Date());
    setClockedOutTime(null);
  };

  const handleClockOut = () => {
    setClockedOutTime(new Date());
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  const getClockStatus = () => {
    if (!clockedInTime) {
      return "You haven't clocked in.";
    } else if (!clockedOutTime) {
      return `Clocked in: ${moment(clockedInTime).format("LT")}`;
    } else {
      return `Clocked out: ${moment(clockedOutTime).format("LT")}`;
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-50">
      <div className="pb-12 px-4 sm:px-6 lg:px-8 space-y-5 bg-red-600/90">
        <div className="flex items-center justify-between p-6  rounded-xl sm:flex-col sm:items-center sm:space-y-4 sm:space-x-0">
          <div className="flex items-center justify-between flex-col md:flex-row w-full space-y-3">
            <div className="text-2xl font-bold text-white sm:text-3xl">
              Welcome, {username}
            </div>
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                clockedInTime && !clockedOutTime
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
              {clockedInTime ? (
                <button
                  onClick={handleClockOut}
                  className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-base sm:py-3 sm:px-6"
                >
                  Clock Out
                </button>
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
