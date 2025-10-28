import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import PageTitle from "../../../layouts/PageTitle";
import ProfileBox from "../../ProfileBox";

const CustomerProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const initialized = useRef(false);
  const history = useHistory();
  const params = useParams();
  const [customer, setCustomer] = useState([]);

  const gotoEditProfile = () => {
    history.push(`edit-customer/${params.id}`);
  };

  const showTrainingPlan = (id, mode) => {
    if (mode === 1) {
      history.push(`training-exercises/${id}`);
    } else {
      history.push(`training-plan/${id}`);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetch(
        `${BACKEND_URL}/customers/${params.id}/${parseInt(user.user.id)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        },
        [customer]
      )
        .then((response) => response.json())
        .then((response) => {
          console.log("response", response);
          setCustomer(response[0]);
        });
    }
  });
  return (
    <Fragment>
      <PageTitle activeMenu="Profil klienta" motherMenu="App" />
      <div className="row">
        <div className="col-lg-12">
          <ProfileBox result={customer}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                gap: "10px",
                marginBottom: "30px",
              }}
            >
              <button
                className="table-edit-customer-profile"
                onClick={gotoEditProfile}
              >
                Edytuj
              </button>
              <button
                className="table-show-customer-profile"
                onClick={() => showTrainingPlan(customer.id, customer.mode)}
              >
                Plan
              </button>
            </div>
          </ProfileBox>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerProfile;
