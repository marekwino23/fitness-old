import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import PageTitle from "../../../layouts/PageTitle";
import ProfileBox from "../../ProfileBox";

const TrainerProfile = () => {
  const history = useHistory();
  const initialized = useRef(false);
  const params = useParams();
  const [trainer, setTrainer] = useState([]);

  const gotoEditTrainer = () => {
    history.push(`edit-trainer/${params.id}`);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetch(
        `${BACKEND_URL}/trainers/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        },
        [trainer]
      )
        .then((response) => response.json())
        .then((response) => {
          setTrainer(response[0]);
        });
    }
  });
  return (
    <Fragment>
      <PageTitle activeMenu="Profil Trenera" motherMenu="App" />
      <div className="row">
        <div className="col-lg-12">
          <ProfileBox result={trainer}>
            <button
              onClick={gotoEditTrainer}
              className="profile-button"
              style={{ margin: "10px 0" }}
            >
              Edytuj
            </button>
          </ProfileBox>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainerProfile;
