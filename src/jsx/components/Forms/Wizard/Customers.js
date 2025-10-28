import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../../constants";
import ReactLoading from "react-loading";
import imageDefault from "../../../../images/profile/5856.jpg";
import { useHistory } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

/// imge
import { Link } from "react-router-dom";
import cogoToast from "cogo-toast";

const Customers = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);
  const history = useHistory();

  const showTrainingPlan = (id, mode) => {
    console.log(mode);
    if (mode === 1) {
      history.push(`training-exercises/${id}`);
    } else {
      history.push(`training-plan/${id}`);
    }
  };

  const showProfileCustomer = (id) => {
    history.push(`customer-profile/${id}`);
  };

  const deleteProfile = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/delete_Customers`, {
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
        cogoToast.success("Klient został usunięty z listy");
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
      setTimeout(() => {
        fetch(`${BACKEND_URL}/customers/${user.user.id}`, {
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
      }, [1000]);
    }
  }, [user.user.id]);

  return (
    <section>
      <div className="card-body">
        <div className="card-header">
          <h4 className="card-title">Wszyscy klienci</h4>
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
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                {/* <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox1_exam_all"
                      required=""
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkbox1_exam_all"
                    ></label>
                  </div>
                </th> */}
                <th>Nr.</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Wiek</th>
                <th>Numer telefonu</th>
                <th>Kod pocztowy</th>
                <th>Miasto</th>
                <th>Ulica</th>
                <th>Profil</th>
                <th>Plan</th>
                <th>Działania</th>
              </tr>
            </thead>
            <tbody>
              {data.length
                ? data.map((result, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>
                      <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheckBox2"
                          required=""
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckBox2"
                        ></label>
                      </div>
                    </td> */}
                        <td>
                          <strong>{index + 1}</strong>
                        </td>
                        <td>
                          <div
                            style={{ gap: "6px" }}
                            className="d-flex align-items-center"
                          >
                            <img
                              src={
                                result.customer_file === "null"
                                  ? imageDefault
                                  : result?.customer_file
                              }
                              className="table-element-image"
                              width="24"
                              alt=""
                            />{" "}
                            <span className="w-space-no">
                              {result.mode === 1
                                ? result.customer_name
                                : result.customer_name}
                            </span>
                            <span style={{ color: "red" }}>
                              {result.mode === 1 ? "◉" : null}
                            </span>
                          </div>
                        </td>
                        <td>{result.customer_surname}</td>
                        <td>{result.customer_age} lat</td>
                        <td>{result.customer_phone}</td>
                        <td>{result.postalCode}</td>
                        <td>{result.city}</td>
                        <td>{result.street}</td>
                        <td>
                          <button
                            onClick={() => showProfileCustomer(result.id)}
                            className="table-training-plan"
                          >
                            Profil
                          </button>
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            showTrainingPlan(result.id, result.mode)
                          }
                        >
                          <button className="table-show-customer-profile">
                            Plan
                          </button>
                        </td>
                        <td style={{ cursor: "pointer" }}>
                          <div className="d-flex">
                            <Link
                              to={`edit-customer/${result.id}`}
                              className="btn btn-primary shadow btn-xs sharp mr-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                            <button
                              onClick={() => deleteProfile(result.id)}
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Card.Body>
      </div>
    </section>
  );
};

export default Customers;
