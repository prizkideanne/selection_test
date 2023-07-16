import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

function Pagination({
  onClickPrevious,
  onClickNext,
  disableNext,
  disablePrevious,
}) {
  return (
    <nav className="mt-10 flex w-full items-center justify-between border-t border-science-blue-800 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={onClickPrevious}
          disabled={disablePrevious}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-science-blue-500 hover:border-science-blue-300 hover:text-science-blue-700 disabled:text-gray-500"
        >
          <ArrowLongLeftIcon
            className={`mr-3 h-5 w-5 ${
              disablePrevious ? "text-gray-500" : "text-science-blue-400"
            }`}
          />
          Previous
        </button>
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={onClickNext}
          disabled={disableNext}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-science-blue-500 hover:border-science-blue-300 hover:text-science-blue-700 disabled:text-gray-500"
        >
          Next
          <ArrowLongRightIcon
            className={`ml-3 h-5 w-5 ${
              disableNext ? "text-gray-500" : "text-science-blue-400"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
