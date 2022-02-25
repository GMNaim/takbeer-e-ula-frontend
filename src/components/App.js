import React from "react";
import { useSalatByDate } from "../api/graph";
import "../styles/styles.css";

const waqts = ["Fajr", "Juhr", "Asr", "Magrib", "Esa"];

function App() {
    const { salatByDate, dates } = useSalatByDate();


    return (
        <div className="container">
            <table className="border">
                <thead>
                    <th className="border">Date</th>
                    <th className="border">Waqt</th>
                    {salatByDate?.user_code_list?.map((code) => {
                        return <th className="border">{code}</th>;
                    })}
                </thead>
                <tbody>
                    {dates?.length &&
                        dates.map((date) => {
                            const data = salatByDate?.salat_data[date];
                            console.log(data);
                            return (
                                <tr className="border">
                                    <td>{date}</td>
                                    <td>
                                        {waqts.map((waqt) => {
                                            return <div>{waqt}</div>;
                                        })}
                                    </td>

                                    {salatByDate?.user_code_list.map((c) => {
                                        const user = data.find(d => d.user_code === c);
                                        
                                        return (
                                            <td className="w-20">
                                                {user ? (
                                                    <div>
                                                        {waqts.map((waqt, j) => {
                                                            
                                                            return (
                                                                <div
                                                                    className={` h-10 border ${
                                                                        user
                                                                            .performed_salat_list[j]
                                                                            ? "bg-green-500"
                                                                            : "bg-red-500"
                                                                    }`}
                                                                >
                                                                    
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {waqts.map((waqt, i) => {
                                                            return <div className="bg-gray-300 h-10 border"></div>
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
