import { useEffect, useState } from "react";
import TablesWithTitle from "./TablesWithTitle";
import api from "../../../api";
import Pagination from "../../../components/Pagination";

export default function AttendanceHistory() {
  const [attendances, setAttendances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(true);

  useEffect(() => {
    if (currentPage + 1 > totalPage) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }

    if (currentPage - 1 === 0) {
      setDisablePrevious(true);
    } else {
      setDisablePrevious(false);
    }
  }, [currentPage, totalPage]);

  useEffect(() => {
    api
      .get(`attendance/log?page=${currentPage}&perPage=10`)
      .then(({ data }) => {
        setAttendances(data.data ? data.data : []);
        setTotalPage(data.pagination.totalPage);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const onClickNext = () => {
    api
      .get(`attendance/log?page=${currentPage + 1}&perPage=10`)
      .then(({ data }) => {
        setCurrentPage(data.pagination.page);
      })
      .catch((err) => console.log(err));
  };

  const onClickPrevious = () => {
    api
      .get(`attendance/log?page=${currentPage - 1}&perPage=10`)
      .then(({ data }) => {
        setCurrentPage(data.pagination.page);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-grow">
        <TablesWithTitle
          title={"Your Attendance Log"}
          subtitle={"You can see your attendance history here"}
          content={attendances}
        />
      </div>
      <div className="w-full py-5">
        <Pagination
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          disableNext={disableNext}
          disablePrevious={disablePrevious}
        />
      </div>
    </div>
  );
}
