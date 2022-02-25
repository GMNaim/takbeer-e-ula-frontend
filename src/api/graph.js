import { useEffect, useState } from "react";
import { getSalatByDate } from ".";
export const useSalatByDate = () => {
  const [salatByDate, setSalatByDate] = useState({});
  const [dates, setDates] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSalatByDate();
        console.log(data);
        setSalatByDate(data);
        setDates(Object.keys(data?.salat_data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return { salatByDate, dates };
};
