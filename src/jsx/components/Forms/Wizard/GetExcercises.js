import React, { useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../../../../constants";
import ReactLoading from "react-loading";

const GetExcercises = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    fetch(`${BACKEND_URL}/excercises`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setData(response);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const groupedData = useMemo(() => {
    const obj = data.reduce((acc, ex) => {
      if (!acc[ex.training_plan_id]) {
        acc[ex.training_plan_id] = { ...ex };
      } else {
        if (typeof acc[ex.training_plan_id].exerciseTypeName === "string") {
          acc[ex.training_plan_id].exerciseTypeName = [
            acc[ex.training_plan_id].exerciseTypeName,
          ];
        }
        if (typeof acc[ex.training_plan_id].note === "string") {
          acc[ex.training_plan_id].note = [acc[ex.training_plan_id].note];
        }
        acc[ex.training_plan_id].exerciseTypeName = [
          ...acc[ex.training_plan_id].exerciseTypeName,
          ex.exerciseTypeName,
        ];
        acc[ex.training_plan_id].note = [
          ...acc[ex.training_plan_id].note,
          ex.note,
        ];
      }
      return acc;
    }, {});
    return Object.values(obj);
  }, [data]);

  return (
    <section>
      <div className="card-body">
        <div style={{ padding: "0 0 20px 0" }} className="card-header">
          <h4 className="card-title">Wszystkie plany treningowe</h4>
        </div>
        {loading === true ? (
          <ReactLoading
            style={{
              position: "relative",
              width: "100px",
              top: "231px",
              left: "408px",
            }}
            type="spin"
            color="blue"
            height={100}
            width={100}
          />
        ) : null}
        <div className="table-responsive">
          <div id="job_data" className="dataTables_wrapper ">
            {groupedData.map((val, index) => {
              return (
                <div key={index}>
                  <h4> {val?.training_plan_name}</h4>
                  {/* <p>{val?.exerciseTypeName}</p> */}
                  <ul>
                    {val.exerciseTypeName.map((ex, index) => (
                      <li key={ex}>
                        {val.note[index]} - {ex}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetExcercises;
