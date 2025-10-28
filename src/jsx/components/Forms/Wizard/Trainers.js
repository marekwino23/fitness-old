import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import ReactLoading from "react-loading";
import cogoToast from "cogo-toast";
import ProfileBox from "../../ProfileBox";

const Trainers = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const history = useHistory();
  const [data, setData] = useState([]);
  const initialized = useRef(false);
  const [loading, setLoading] = useState(false);

  const gotoEditTrainer = (id) => {
    history.push(`edit-trainer/${id}`);
  };

  const deleteTrainer = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/delete_Trainers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const result = await response.json();
      if (result.statusCode === 200 && result.status === "success") {
        window.location.reload();
        cogoToast.success("Trener został usunięty z listy");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setLoading(true);
      fetch(`${BACKEND_URL}/trainers/${user.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.hasOwnProperty("error")) {
            setData(response);
          }
        })
        .catch((error) => {
          console.error("error: ", error);
        })
        .finally(() => setLoading(false));
    }
  }, [user.user.id]);

  return (
    <section>
      <div className="card-body">
        <div className="card-header">
          <h4 className="card-title">Wszyscy trenerzy</h4>
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
        <div className="box-trainer">
          {data.map((result, index) => (
            <ProfileBox
              key={index}
              typePerson={result.trainer_file === "null" ? "" : "trainer"}
              result={result}
            >
              <button
                onClick={() => gotoEditTrainer(result.id)}
                className="table-edit-customer-profile"
              >
                Edytuj
              </button>
              <button
                onClick={() => deleteTrainer(result.id)}
                style={{ backgroundColor: "red" }}
                className="table-edit-customer-profile"
              >
                Usuń
              </button>
            </ProfileBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
