import React, { Fragment, useEffect, useRef, useState } from "react";
import imageDefault from "../../../../images/profile/5856.jpg";
import { useHistory, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
// import PageTitle from "../../../layouts/PageTitle";

const TrainingExercises = () => {
  const initialized = useRef(false);
  const params = useParams();
  const history = useHistory();
  const [customerTrainings, setCustomerTrainings] = useState([]);
  // const [activeTab, setActiveTab] = useState();

  const showMore = (id) => {
    history.push(`resource/${id}`);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetch(
        `${BACKEND_URL}/customers_resources/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        },
        [customerTrainings]
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setCustomerTrainings(response);
        });
    }
  });

  // if (!activeTab) return null;

  return (
    <Fragment>
      <div className="row">
        <div
          style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
        >
          <div>
            {/* <PageTitle activeMenu="Plan treningowy klienta" motherMenu="App" /> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Zestaw ćwiczeń dla: {customerTrainings[0]?.customer_name}
              <span style={{ color: "red" }}>◉</span>
              {customerTrainings[0]?.customer_file !== "null" ? (
                <img
                  className="box-element-image-profile"
                  height={60}
                  width={60}
                  alt="1"
                  src={customerTrainings[0]?.customer_file}
                />
              ) : (
                <img
                  className="box-element-image-profile"
                  height={60}
                  width={60}
                  alt="1"
                  src={imageDefault}
                />
              )}
            </div>
          </div>
          <div
            style={{ backgroundColor: "transparent" }}
            className="profile card card-body px-3 pt-3 pb-0"
          >
            <button
              style={{ width: "300px", margin: "0 auto" }}
              className="tab"
            >
              Jednostka treningowa nr 1
            </button>
            <div className="profile-head">
              <div className="profile-info">
                <div className="profile-details">
                  {customerTrainings.map((training, index) => (
                    <div
                      key={training.Numer_porządkowy}
                      style={{
                        maxWidth: "350px",
                        // height: "250px",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      className="box-element"
                    >
                      <img
                        className="box-element-image"
                        height={120}
                        width={120}
                        alt="1"
                        src={training.Image}
                      />
                      <div className="profileName">
                        {training.Nazwa_środka_treningowego}
                      </div>
                      <button
                        className="table-show-training-profile"
                        onClick={() => showMore(training.Numer_porządkowy)}
                      >
                        więcej
                      </button>
                    </div>
                  ))}

                  {/* <div
                    style={{
                      display: "grid",
                      grid: "auto / auto auto auto",
                      gridColumnGap: "20px",
                      gridRowGap: "20px",
                    }}
                    className="profile-name px-3 pt-2"
                  >
                    {customerTrainings.map((training, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            maxWidth: "350px",
                            // height: "250px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="box-element"
                        >
                          {training.name}
                          <img
                            className="box-element-image"
                            height={120}
                            width={120}
                            alt="1"
                            src={training.Image}
                          />
                          <div className="profileName">
                            {training.Nazwa_środka_treningowego}
                          </div>
                          <button
                            className="table-show-training-profile"
                            onClick={() => showMore(training.Numer_porządkowy)}
                          >
                            więcej
                          </button>
                        </div>
                      );
                    })}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainingExercises;
