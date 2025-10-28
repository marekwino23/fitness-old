import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import imageDefault from "../../../../images/profile/5856.jpg";
// import PageTitle from "../../../layouts/PageTitle";

const TrainingPlan = () => {
  const initialized = useRef(false);
  const params = useParams();
  const history = useHistory();
  const [customerTrainings, setCustomerTrainings] = useState({});
  const [activeTab, setActiveTab] = useState();

  const showMore = (id) => {
    history.push(`resource/${id}`);
  };

  const generatePdf = (id) => {
    history.push(`createPdf/${id}`);
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
            if (keyName in acc) {
              return {
                ...acc,
                [keyName]: [...acc[keyName], curr],
              };
            }
            return acc;
          }, {});

          Object.entries(customerTrainingsPerPlan).forEach(
            ([key, val], index) => {
              if (countEntries[key] < 9) {
                const diff = 9 - countEntries[key];
                for (let i = 0; i < diff; i++) {
                  customerTrainingsPerPlan[key].push({
                    Numer_porządkowy: 108,
                    Cel: "TBW",
                    name: "Plan treningowy nr12",
                    Dla_Kobiet: "TRUE",
                    Dla_Mężczyzn: "TRUE",
                    Ilość_powtórzeń_przerw_aktywnych_bez_impulsu: "2",
                    Ilość_powtórzeń_w_impulsie: "12",
                    Ilość_powtórzeń_w_oporze: "10",
                    Image: "https://i.ibb.co/3kH6Y3m/all4-37.jpg",
                    Kategoria: "Część główna - kszatłtujaca",
                    Kierunek_oporu_Trenera_EMS:
                      "Oporujemy podniesioną nogę w dół i jednocześnie przeciwstawny łokieć w górę - utrudniając połączenie łokcia z kolanem",
                    Nazwa_środka_treningowego:
                      "Stoimy na prawej nodze, lewa noga podniesiona do góry, w kolanie 90 stopnii, palce od stopy zadarte ku górze. W łokciach 90 stopnii, skręt tułowia, łączymy prawy łokieć z lewym kolanem	",
                    Opis_przerwy_aktywnej:
                      "po 9 i po 11 impulsie w przerwie przytrzymujemy oporowanie",
                    Opór_trenera_EMS: "TAK",
                    Podkategoria: "",
                    Przerwa_Aktywna: "TAK",
                    Rodzaj_przerwy_Aktywnej: "STATYCZNA",
                  });
                }
              }
            }
          );
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
      <div className="row">
        <div
          style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              position: "relative",
              justifyContent: "center",
            }}
          >
            {/* <PageTitle activeMenu="Plan treningowy klienta" motherMenu="App" /> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Zestaw ćwiczeń dla: {customerTrainings?.customerName}
              {customerTrainings?.file !== "null" ? (
                <img
                  className="box-element-image-profile"
                  height={60}
                  width={60}
                  alt="1"
                  src={customerTrainings?.file}
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
            <button
              style={{
                paddingBottom: "2px",
                position: "absolute",
                right: "38px",
                backgroundColor: "orange",
                width: "150px",
                paddingTop: "2px",
              }}
              className="tab"
              onClick={() => generatePdf(params.id)}
            >
              Wygeneruj pdf
            </button>
          </div>
          <div
            style={{ backgroundColor: "transparent" }}
            className="profile card card-body px-3 pt-3 pb-0"
          >
            <div className="profile-head">
              <div className="profile-info">
                <div className="profile-details">
                  {Object.keys(customerTrainings.trainings).map(
                    (planName, index) => (
                      <button
                        key={planName}
                        className={`tab ${
                          activeTab === planName ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(planName)}
                      >
                        Jednostka treningowa nr{index + 1}
                      </button>
                    )
                  )}
                  {customerTrainings.trainings[activeTab].map(
                    (training, index) => (
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
                        <div
                          style={{ fontSize: "12px" }}
                          className="profileName"
                        >
                          {training.Nazwa_środka_treningowego}
                        </div>
                        <button
                          className="table-show-customer-profile"
                          onClick={() => showMore(training.Numer_porządkowy)}
                        >
                          więcej
                        </button>
                      </div>
                    )
                  )}

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

export default TrainingPlan;
