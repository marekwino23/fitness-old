import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../../../constants";
import ReactLoading from "react-loading";
import { Card, Table } from "react-bootstrap";

/// imge

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);
  // const history = useHistory();

  // const showTrainingPlan = (id) => {
  //   history.push(`training-plan/${id}`);
  // };

  // const showProfileCustomer = (id) => {
  //   history.push(`customer-profile/${id}`);
  // };

  // const deleteProfile = async (id) => {
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/delete_Customers`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "ngrok-skip-browser-warning": true,
  //       },
  //       body: JSON.stringify({
  //         id: id,
  //       }),
  //     });
  //     const result = await response.json();
  //     if (result.statusCode === 200 && result.status === "success") {
  //       window.location.reload();
  //       cogoToast.success("Klient został usunięty z listy");
  //     } else {
  //       cogoToast.error("Nieprawidłowe dane");
  //     }
  //   } catch (error) {
  //     console.error("erorr: ", error);
  //   }
  // };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setLoading(true);
      setTimeout(() => {
        fetch(`${BACKEND_URL}/resources`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (!response.hasOwnProperty("error")) {
              setResources(response);
            }
          })
          .catch((error) => {
            console.error("error: ", error);
          })
          .finally(() => setLoading(false));
      }, [1000]);
    }
  }, []);

  return (
    <section>
      <div className="card-body">
        <div className="card-header">
          <h4 className="card-title">Wszystkie środki treningowe</h4>
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
                <th>Numer_porządkowy</th>
                <th>Cel</th>
                <th>Kategoria</th>
                <th>Zdjęcie</th>
                <th>Podkategoria</th>
                <th>Dla_Kobiet</th>
                <th>Dla_Mężczyzn</th>
                <th>Nazwa_środka_treningowego</th>
                <th>Opór_trenera_EMS</th>
                <th>Kierunek_oporu_Trenera_EMS</th>
                <th>Ilość_powtórzeń_w_impulsie</th>
                <th>Ilość_powtórzeń_w_oporze</th>
                <th>Przerwa_Aktywna</th>
                <th>Rodzaj_przerwy_Aktywnej</th>
                <th>Ilośc_powtórzeń_przerw_aktywnych_bez_impulsu</th>
                <th>Opis_przerwy_aktywnej</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((result, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <strong>{result.Numer_porządkowy}</strong>
                    </td>
                    <td>{result.Cel}</td>
                    <td>{result.Kategoria}</td>
                    <td>
                      <div
                        style={{ gap: "6px", justifyContent: "center" }}
                        className="d-flex align-items-center"
                      >
                        <img
                          src={result.Image}
                          className="table-element-image"
                          width="24"
                          alt=""
                        />{" "}
                      </div>
                    </td>
                    <td>{result.Podkategoria}</td>
                    <td>{result.Dla_Kobiet === "TRUE" ? "TAK" : "NIE"}</td>
                    <td>{result.Dla_Mężczyzn === "TRUE" ? "TAK" : "NIE"}</td>
                    <td style={{ fontSize: "12px" }}>
                      {result.Nazwa_środka_treningowego}
                    </td>
                    <td>{result.Opór_trenera_EMS}</td>
                    <td>{result.Kierunek_oporu_Trenera_EMS}</td>
                    <td>{result.Ilość_powtórzeń_w_impulsie}</td>
                    <td>{result.Ilość_powtórzeń_w_oporze}</td>
                    <td>{result.Przerwa_Aktywna}</td>
                    <td>{result.Rodzaj_przerwy_Aktywnej}</td>
                    <td>
                      {result.Ilośc_powtórzeń_przerw_aktywnych_bez_impulsu}
                    </td>
                    <td>{result.Opis_przerwy_aktywnej}</td>

                    {/* <td style={{ cursor: "pointer" }}>
                      <div className="d-flex">
                        <Link
                          to={`edit-customer/${result.id}`}
                          className="btn btn-primary shadow btn-xs sharp mr-1"
                        >
                          <i className="fa fa-pencil"></i>
                        </Link>
                      </div>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </div>
    </section>
  );
};

export default Resources;
