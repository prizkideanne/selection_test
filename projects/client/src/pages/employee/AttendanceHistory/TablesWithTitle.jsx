import moment from "moment";
import React from "react";

function TablesWithTitle({ title, subtitle, content, addUserHandler }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{subtitle}</p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Clock In
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Clock Out
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {content.map((person) => (
                  <tr key={person.clock_in + person.clock_out}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.clock_in
                        ? moment(person.clock_in).format("dddd, DD MMMM YYYY")
                        : "Absent"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.clock_in
                        ? moment(person.clock_in).format("h:mm a")
                        : "Absent"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.clock_out
                        ? moment(person.clock_out).format("h:mm a")
                        : "Absent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablesWithTitle;
