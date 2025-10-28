import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import cogoToast from "cogo-toast";
import { usePDF, Resolution, Margin } from "react-to-pdf";
import { Card, Table } from "react-bootstrap";
// import PageTitle from "../../../layouts/PageTitle";

const CreatePdf = () => {
  const initialized = useRef(false);
  const { toPDF, targetRef } = usePDF({
    filename: "Trening dla klienta.pdf",
  });
  const params = useParams();
  const [customerTrainings, setCustomerTrainings] = useState([]);
  const [activeTab, setActiveTab] = useState();

  const options = {
    // default is `save`
    method: "open",
    resolution: Resolution.HIGH,
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    // resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "A1",
      // default is 'portrait'
      orientation: "landscape",
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };
  const generatePdf = () => {
    cogoToast.loading("Trwa przygotowanie pdf do pobrania");
    toPDF(options);
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
          const countEntries = {};
          const customerTrainingsPerPlan = response.reduce((acc, curr) => {
            let keyName = curr.name.trim();
            keyName = curr.name.replace(/(\r\n|\n|\r)/gm, "");
            if (!acc[keyName]) {
              acc[keyName] = [];
              countEntries[keyName] = 0;
            }
            countEntries[keyName] += 1;
            return { ...acc, [keyName]: [...acc[keyName], curr] };
          }, {});
          // Object.entries(customerTrainingsPerPlan).forEach(
          //   ([key, val], index) => {
          //     if (countEntries[key] < 9) {
          //       const diff = 9 - countEntries[key];
          //       for (let i = 0; i < diff; i++) {
          //         customerTrainingsPerPlan[key].push({
          //           Numer_porządkowy: 108,
          //           Cel: "TBW",
          //           name: "Plan treningowy nr12",
          //           Dla_Kobiet: "TRUE",
          //           Dla_Mężczyzn: "TRUE",
          //           Ilość_powtórzeń_przerw_aktywnych_bez_impulsu: "2",
          //           Ilość_powtórzeń_w_impulsie: "12",
          //           Ilość_powtórzeń_w_oporze: "10",
          //           Image: "https://i.ibb.co/3kH6Y3m/all4-37.jpg",
          //           Kategoria: "Część główna - kszatłtujaca",
          //           Kierunek_oporu_Trenera_EMS:
          //             "Oporujemy podniesioną nogę w dół i jednocześnie przeciwstawny łokieć w górę - utrudniając połączenie łokcia z kolanem",
          //           Nazwa_środka_treningowego:
          //             "Stoimy na prawej nodze, lewa noga podniesiona do góry, w kolanie 90 stopnii, palce od stopy zadarte ku górze. W łokciach 90 stopnii, skręt tułowia, łączymy prawy łokieć z lewym kolanem	",
          //           Opis_przerwy_aktywnej:
          //             "po 9 i po 11 impulsie w przerwie przytrzymujemy oporowanie",
          //           Opór_trenera_EMS: "TAK",
          //           Podkategoria: "",
          //           Przerwa_Aktywna: "TAK",
          //           Rodzaj_przerwy_Aktywnej: "STATYCZNA",
          //         });
          //       }
          //     }
          //   }
          // );
          setCustomerTrainings({
            customerName: response[0].customer_name,
            file: response[0].customer_file,
            trainings: customerTrainingsPerPlan,
          });
          setActiveTab(Object.keys(customerTrainingsPerPlan)[0]);
        });
    }
  });

  if (!activeTab) return null;

  return (
    <Fragment>
      <div
        style={{
          justifyContent: "center",
          flexFlow: "column",
          alignItems: "center",
        }}
        className="row"
      >
        <button
          style={{
            paddingBottom: "2px",
            paddingTop: "2px",
            maxWidth: "150px",
            backgroundColor: "orange",
            width: "100%",
          }}
          className="tab"
          onClick={generatePdf}
        >
          Pobierz pdf
        </button>
        <div
          ref={targetRef}
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          <div
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   gap: "10px",
          //   paddingTop: "20px",
          // }}
          >
            {/* <PageTitle activeMenu="Plan treningowy klienta" motherMenu="App" /> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              Zestaw ćwiczeń dla: {customerTrainings?.customerName}
              <img
                className="box-element-image-profile"
                height={60}
                width={60}
                alt="1"
                src={customerTrainings?.file}
              />
            </div>
            {/* <div style={{ maxWidth: "1400px" }} className="card-body"> */}
            <Card.Body
              style={{
                fontSize: "8px",
                display: "flex",
                flexFlow: "column",
                gap: "100px",
              }}
            >
              {Object.entries(customerTrainings.trainings).map(
                ([key, val], index) => (
                  <div key={key.trim()}>
                    <h5 style={{ textAlign: "center", marginTop: "20px" }}>
                      Jednostka treningowa nr{index + 1}
                    </h5>
                    <Table
                      style={{ overflowX: "none", maxWidth: "1169px" }}
                      size="sm"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th style={{ fontSize: "8px" }}>Numer_porządkowy</th>
                          <th style={{ fontSize: "8px" }}>Cel</th>
                          <th style={{ fontSize: "8px" }}>Kategoria</th>
                          <th style={{ fontSize: "8px" }}>Zdjęcie</th>
                          <th style={{ fontSize: "8px" }}>Podkategoria</th>
                          <th style={{ fontSize: "8px" }}>Dla_Kobiet</th>
                          <th style={{ fontSize: "8px" }}>Dla_Mężczyzn</th>
                          <th style={{ fontSize: "8px" }}>
                            Nazwa_środka_treningowego
                          </th>
                          <th style={{ fontSize: "8px" }}>Opór_trenera_EMS</th>
                          <th style={{ fontSize: "8px" }}>
                            Kierunek_oporu_Trenera_EMS
                          </th>
                          <th style={{ fontSize: "8px" }}>
                            Ilość_powtórzeń_w_impulsie
                          </th>
                          {/* <th style={{ fontSize: "8px"}}>
                            Ilość_powtórzeń_w_oporze
                          </th> */}
                          {/* <th style={{ fontSize: "8px" }}>Przerwa_Aktywna</th> */}
                          {/* <th style={{ fontSize: "8px" }}>
                            Rodzaj_przerwy_Aktywnej
                          </th> */}
                          {/* <th style={{ fontSize: "8px" }}>
                            Ilośc_powtórzeń_przerw_aktywnych_bez_impulsu
                          </th> */}
                          {/* <th style={{ fontSize: "8px" }}>
                            Opis_przerwy_aktywnej
                          </th> */}
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "8px" }}>
                        {val.map((training, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ fontSize: "8px" }}>
                                <strong>{training.Numer_porządkowy}</strong>
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Cel}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Kategoria}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                <div
                                  style={{
                                    gap: "6px",
                                    justifyContent: "center",
                                  }}
                                  className="d-flex align-items-center"
                                >
                                  <img
                                    src={training.Image}
                                    className="table-element-image"
                                    width="24"
                                    alt=""
                                  />{" "}
                                </div>
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Podkategoria}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Dla_Kobiet === "TRUE" ? "TAK" : "NIE"}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Dla_Mężczyzn === "TRUE"
                                  ? "TAK"
                                  : "NIE"}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                <p style={{ width: "323px", margin: "0 auto" }}>
                                  {training.Nazwa_środka_treningowego}
                                </p>
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Opór_trenera_EMS}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Kierunek_oporu_Trenera_EMS}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Ilość_powtórzeń_w_impulsie}
                              </td>
                              {/* <td style={{ fontSize: "8px" }}>
                                {training.Ilość_powtórzeń_w_oporze}
                              </td> */}
                              {/* <td style={{ fontSize: "8px" }}>
                                {training.Przerwa_Aktywna}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Rodzaj_przerwy_Aktywnej}
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {
                                  training.Ilośc_powtórzeń_przerw_aktywnych_bez_impulsu
                                }
                              </td>
                              <td style={{ fontSize: "8px" }}>
                                {training.Opis_przerwy_aktywnej}
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )
              )}
            </Card.Body>
          </div>
        </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default CreatePdf;
