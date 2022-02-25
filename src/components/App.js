import React from "react";
import { useSalatByDate } from "../api/graph";
import "../styles/styles.css";

import loadingImage from "../images/loading.gif";
import Nav from "./Nav";

const waqts = ["Fajr", "Juhr", "Asr", "Magrib", "Isha"];

// const getColor = (salatByDate, dates) => {
//   if(!salatByDate || !dates) return;
//   let formattedData = {};
//   for(let i = 0; i < dates.length; i++){
//     const data = salatByDate.salat_data[dates[i]];
//     for(let j = 0; j < data.length; j++){
//       const user = data[j];
//       if(formattedData[user.user_code]){
//         formattedData[user.user_code].push(...user.performed_salat_list);
//       } else {
//         formattedData[user.user_code] = user.performed_salat_list;
//       }
//     }
//   }
//   console.log(formattedData)
//   return formattedData;
// }

function App() {
  const { salatByDate, dates } = useSalatByDate();
  // console.log(salatByDate, dates)

  // const formattedData = getColor(salatByDate, dates)
  let missed = {};
  let completed_days = {};
  if (!salatByDate?.user_code_list) {
    return (
      <div className="loading text-center">
        {/* <h1>Processing your request...</h1> */}
        <img className="mx-auto" src={loadingImage} alt="" />
      </div>
    );
  }
  return (
    <div className="">
      <Nav></Nav>
      <table className="p-5 mt-6 mx-auto" style={{ overflowX: "scroll" }}>
        {/* <th>User Code</th> */}
        <thead>
          {/* <th className="border border-slate-800">No. of Days</th> */}

          <tr>
            <th
              className="border border-slate-800 text-4xl"
              colSpan={2}
              rowSpan={2}
            >
              الحمد لله
            </th>
            <th
              className="border border-slate-800"
              colSpan={salatByDate?.user_code_list.length + 2}
            >
              Completed Days
            </th>
          </tr>

          <tr>
            {/* <th className="border border-slate-800" colSpan={2}></th> */}

            {salatByDate?.user_code_list?.map((code) => {
              return (
                <th
                  //   colSpan={salatByDate?.user_code_list.length + 2}
                  className="border border-slate-800 text-xl"
                  style={{ width: "40px" }}
                >
                  {code}
                </th>
              );
            })}

            {/* <th
              className="border border-slate-800"
              colSpan={salatByDate?.user_code_list.length + 2}
            >
              dd
            </th> */}
          </tr>
          <tr>
            <th className="border border-slate-800" rowSpan={2}>
              Date
            </th>
            <th className="border border-slate-800" rowSpan={2}>
              Waqt
            </th>
            <th
              className="border border-slate-800"
              colSpan={salatByDate?.user_code_list.length}
            >
              Code Number
            </th>
          </tr>
          <tr>
            {salatByDate?.user_code_list?.map((code) => {
              return (
                <th
                  className="border border-slate-800"
                  style={{ width: "40px" }}
                >
                  {code}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="border border-slate-800">
          {dates?.length &&
            dates.map((date) => {
              const data = salatByDate?.salat_data[date];
              // console.log(data);
              return (
                <tr className="border border-slate-800">
                  {/* <td className="p-2 border  border-slate-800 text-center">
                    {Math.round(
                      (new Date(date).getTime() +
                        1000 * 3600 * 24 -
                        new Date(salatByDate.starting_date).getTime()) /
                        (1000 * 3600 * 24)
                    )}
                  </td> */}
                  <td className="p-2">
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    <br></br>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </td>
                  <td>
                    {waqts.map((waqt) => {
                      return (
                        <div
                          className={`h-10 border border-zinc-600 p-2 text-center`}
                        >
                          {waqt}
                        </div>
                      );
                    })}
                  </td>

                  {salatByDate?.user_code_list.map((code) => {
                    const user = data.find((d) => d.user_code === code);

                    return (
                      <td className="" style={{ width: "40px" }}>
                        {user ? (
                          <div>
                            {waqts.map((waqt, j) => {
                              console.log(user.performed_salat_list[j]);
                              if (!user.performed_salat_list[j]) {
                                missed[code] = true;
                              } else {
                                if (completed_days[code] === 0) {
                                  completed_days[code] = 1;
                                } else {
                                  completed_days[code] += 1;
                                }
                              }
                              return (
                                <div
                                  className={` h-10 border border-slate-800 ${
                                    user.performed_salat_list[j]
                                      ? !missed[code]
                                        ? "bg-green-500"
                                        : "bg-green-200"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                              );
                            })}
                          </div>
                        ) : (
                          <div>
                            {waqts.map((waqt, i) => {
                              missed[code] = true;
                              return (
                                <div className="bg-gray-100 h-10 border border-slate-800"></div>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
