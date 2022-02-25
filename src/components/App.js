import React from "react";
import { useSalatByDate } from "../api/graph";
import "../styles/styles.css";
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
  return (
    <div className="">
      <Nav></Nav>
      <table className="p-5 mt-6 mx-auto">
        <thead>
          {/* <th className="border border-slate-800">No. of Days</th> */}
          <th className="border border-slate-800">Date</th>
          <th className="border border-slate-800">Waqt</th>
          {salatByDate?.user_code_list?.map((code) => {
            return <th className="border border-slate-800">{code}</th>;
          })}
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

                  {salatByDate?.user_code_list.map((c) => {
                    const user = data.find((d) => d.user_code === c);
                    
                    return (
                      <td className="w-12">
                        {user ? (
                          <div>
                            {waqts.map((waqt, j) => {
                              console.log(user.performed_salat_list[j])
                              if(!user.performed_salat_list[j]){
                                missed[c] = true;
                              }
                              return (
                                <div
                                  className={` h-10 border border-slate-800 ${
                                    user.performed_salat_list[j]
                                      ? !missed[c] ? "bg-green-500" : "bg-green-200"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                              );
                            })}
                          </div>
                        ) : (
                          <div>
                            {waqts.map((waqt, i) => {
                              missed[c] = true;
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
