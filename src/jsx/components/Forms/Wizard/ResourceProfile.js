import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import { Table } from "react-bootstrap";

const ResourceProfile = () => {
  const initialized = useRef(false);
  const params = useParams();
  const [resource, setResource] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetch(
        `${BACKEND_URL}/resource/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        },
        [resource]
      )
        .then((response) => response.json())
        .then((response) => {
          setResource(response);
        });
    }
  });

  return (
    <Fragment>
      <div className="row">
        <Table style={{ overflowX: "auto" }} responsive>
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
            {resource.map((result, index) => {
              console.log(result);
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
                        src="https://i.ibb.co/b1Tf8rM/all4.jpg"
                        className="table-element-image"
                        width="24"
                        alt=""
                      />{" "}
                    </div>
                  </td>
                  <td>{result.Podkategoria}</td>
                  <td>{result.Dla_Kobiet === "TRUE" ? "TAK" : "NIE"}</td>
                  <td>{result.Dla_Mężczyzn === "TRUE" ? "TAK" : "NIE"}</td>
                  <td>{result.Nazwa_środka_treningowego}</td>
                  <td>{result.Opór_trenera_EMS}</td>
                  <td>{result.Kierunek_oporu_Trenera_EMS}</td>
                  <td>{result.Ilość_powtórzeń_w_impulsie}</td>
                  <td>{result.Ilość_powtórzeń_w_oporze}</td>
                  <td>{result.Przerwa_Aktywna}</td>
                  <td>{result.Rodzaj_przerwy_Aktywnej}</td>
                  <td>{result.Ilośc_powtórzeń_przerw_aktywnych_bez_impulsu}</td>
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
      </div>
    </Fragment>
  );
};

export default ResourceProfile;
