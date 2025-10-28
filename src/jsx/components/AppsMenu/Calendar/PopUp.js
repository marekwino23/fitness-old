import { useActionsPopUp } from "./useActionsPopup";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import imageDefault from "../../../../images/profile/5856.jpg";
import "react-datepicker/dist/react-datepicker.css";
import { BACKEND_URL } from "../../../../constants";
import { useState } from "react";
import cogoToast from "cogo-toast";

const PopUp = ({
  currentDate,
  customers,
  image,
  display,
  setDisplayPop,
  displayPop,
  setDisplay,
  eventId,
  trainers,
  CustomerId,
  setHidden,
  setCustomerId,
  setTrainerId,
  hidden,
  TrainerId,
  trainer,
  typePerson,
}) => {
  const [close, setClose] = useState(false);
  const [trainerDate, setTrainerDate] = useState(new Date());
  const [clientDate, setClientDate] = useState(new Date());
  const [newCustomerDate, setnewCustomerDate] = useState(new Date());
  const [isClient, setIsClient] = useState(typePerson === "client");
  const {
    addEventTrainer,
    deleteCustomer,
    assignClient,
    assignTrainer,
    addEventCustomer,
    resetEvent,
    onEdit,
    currentId,
    onChange,
    showProfile,
  } = useActionsPopUp({
    CustomerId,
    clientDate,
    trainerDate,
    setClientDate,
    setTrainerDate,
    eventId,
    display,
    setClose,
    close,
    setDisplay,
    TrainerId,
    setCustomerId,
    setTrainerId,
    setHidden,
    hidden,
  });

  // const handleChange = (typeEntity, e) => {
  //   setIsClient(typeEntity === "client");
  //   onChange(e);
  // };

  const history = useHistory();
  const showTrainerProfile = () => {
    history.push(`/trainer-profile/${TrainerId}`);
  };

  const onChangeClientDate = (e) => {
    setClientDate(
      e.toLocaleString().split(",")[0].split(".").reverse().join("-")
    );
  };

  const onChangeTrainerDate = (e) => {
    setTrainerDate(
      e.toLocaleString().split(",")[0].split(".").reverse().join("-")
    );
  };

  const changeClientDate = (e) => {
    setnewCustomerDate(
      e.toLocaleString().split(",")[0].split(".").reverse().join("-")
    );
  };

  const closePop = () => {
    setClose(false);
  };

  const showTrainingPlan = () => {
    history.push(`/training-plan/${CustomerId}`);
  };

  const clickDate = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/changeDate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newCustomerDate.slice(0, 10),
          id: eventId,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        history.push("/calendar");
        window.location.reload();
        setHidden(false);
        setDisplay(false);
        cogoToast.success(
          "Zmiana terminu treningu pomyślnie została zmieniona"
        );
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  return (
    <>
      {/* Pop do zmiany daty */}
      <dialog
        className="popup-options-2"
        style={{ display: close === false ? "none" : "flex" }}
      >
        <h5 style={{ fontSize: "12px" }}>Dodaj nową datę</h5>
        <DatePicker
          className="form-control"
          value={newCustomerDate}
          onChange={changeClientDate}
        />
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            style={{
              marginTop: "10px",
              borderRadius: "20px",
              padding: "4px",
              width: "110px",
              fontSize: "10px",
              height: "21px",
              border: "none",
            }}
            className="btn-primary"
            onClick={clickDate}
          >
            Zmień terminy
          </button>
          <button
            style={{ maxWidth: "110px" }}
            className="button-action-1"
            onClick={closePop}
          >
            Zamknij
          </button>
        </div>
      </dialog>
      {/* Pop dodawania nowych eventów */}
      <dialog
        className="popup-options-3"
        style={{ display: displayPop === false ? "none" : "flex" }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            width: "100%",
            gap: "10px",
          }}
        >
          <h4
            className="side-bar_btn"
            style={{
              padding: "10px",
            }}
          >
            <button className="btn-text" onClick={() => setIsClient(true)}>
              Klienci
            </button>
            <button className="btn-text" onClick={() => setIsClient(false)}>
              Trenerzy
            </button>
          </h4>
          {/* <select
            style={{ maxHeight: "35px" }}
            className="form-control"
            onChange={(e) => handleChange("client", e)}
          >
            <option value="">Klienci</option>
            {customers.map((result, index) => {
              return (
                <option id={result.id} value={result.customer_name} key={index}>
                  {result.customer_name}
                </option>
              );
            })}
          </select> */}
          <select
            style={{ maxHeight: "35px" }}
            className="form-control"
            onChange={onChange}
          >
            <option value="">{isClient ? "Klienci" : "Trenerzy"}</option>
            {(isClient ? customers : trainers).map((result, index) => {
              return (
                <option id={result.id} value={result.name} key={index}>
                  {result.name}
                </option>
              );
            })}
          </select>
          <DatePicker
            style={{ maxHeight: "35px" }}
            className="form-control"
            value={clientDate}
            onChange={onChangeClientDate}
          />
        </div>
        <button
          style={{
            padding: "4px",
            fontSize: "10px",
            marginTop: "20px",
            height: "20px",
            marginBottom: "20px",
            backgroundColor: currentId === 0 ? "#9cc5c5" : "#008f91",
          }}
          disabled={currentId === 0 ? true : false}
          className="table-show-customer-profile"
          onClick={isClient ? addEventCustomer : addEventTrainer}
        >
          Dodaj {isClient ? "klienta" : "trenera"}
        </button>
        {/* <button
          style={{
            padding: "4px",
            fontSize: "10px",
            marginTop: "20px",
            height: "20px",
            marginBottom: "20px",
          }}
          className="table-show-customer-profile"
          onClick={addEventTrainer}
        >
          Dodaj trenera
        </button> */}
        <button
          style={{ maxWidth: "110px" }}
          className="button-action-1"
          onClick={() => setDisplayPop(false)}
        >
          Zamknij
        </button>
      </dialog>
      {/* Pop zarządzania trenerem */}
      <dialog
        className="popup-options-3"
        style={{ display: display === false ? "none" : "flex" }}
      >
        {TrainerId !== null ? (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {trainer[0]?.trainer_file !== "null" ? (
              <img
                className="sidebar-box-element-image"
                src={trainer[0]?.trainer_file}
                alt="trainer"
              />
            ) : (
              <img
                className="sidebar-box-element-image"
                src={imageDefault}
                alt="trainer"
              />
            )}
            {trainer.name !== "" ? (
              <h4
                onClick={showTrainerProfile}
                style={{ color: "green", cursor: "pointer", fontSize: "12px" }}
              >
                Trener: {trainer[0]?.name}
              </h4>
            ) : null}
          </div>
        ) : null}
        {TrainerId !== null ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="button-action-5" onClick={resetEvent}>
              <span>Usuń wydarzenie</span>
            </button>
          </div>
        ) : null}
        <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
          {TrainerId === null ? (
            <DatePicker
              className="form-control"
              value={trainerDate}
              onChange={onChangeTrainerDate}
            />
          ) : null}
          {TrainerId === null ? (
            <select className="form-control" onChange={onChange}>
              <option value="">Trenerzy</option>
              {trainers.map((result, index) => {
                return (
                  <option id={result.id} value={result.name} key={index}>
                    {result.name}
                  </option>
                );
              })}
            </select>
          ) : null}
          {TrainerId === null ? (
            <button
              style={{
                borderRadius: "20px",
                padding: "4px",
                marginBottom: "10px",
                width: "215px",
                fontSize: "10px",
                height: "21px",
                border: "none",
              }}
              className="btn btn-primary"
              onClick={assignTrainer}
            >
              Przypisz klienta do wybranego trenera
            </button>
          ) : null}
        </div>
        <button className="button-action-1" onClick={() => setDisplay(false)}>
          Zamknij
        </button>
      </dialog>
      {/* Pop zarządzania klientem */}
      <dialog
        className="popup-options"
        style={{
          display: hidden === false ? "none" : "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {CustomerId !== null ? (
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                gap: "10px",
                alignItems: "center",
                // paddingBottom: "20px",
              }}
            >
              {customers[0]?.customer_file !== "null" ? (
                <img
                  className="sidebar-box-element-image"
                  src={customers[0]?.customer_file}
                  alt="client"
                />
              ) : (
                <img
                  className="sidebar-box-element-image"
                  src={imageDefault}
                  alt="client"
                />
              )}
              <h4 style={{ fontSize: "12px" }}>
                Klient nr:{" "}
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={showProfile}
                >
                  {CustomerId}
                </span>
              </h4>
            </div>
          ) : (
            <h5 style={{ color: "black", fontSize: "12px" }}>
              Klient: brak przypisanego klienta
            </h5>
          )}
          {CustomerId !== null ? (
            <div style={{ paddingBottom: "20px" }} className="button-grid">
              <button className="button-action-1" onClick={deleteCustomer}>
                <span>Odwołaj</span>
              </button>
              <button className="button-action-2" onClick={onEdit}>
                <span>Zmień</span>
              </button>
              <button className="button-action-3" onClick={showProfile}>
                <span>Profil</span>
              </button>
              <button className="button-action-4" onClick={showTrainingPlan}>
                <span>Plan</span>
              </button>
            </div>
          ) : null}
        </div>
        {CustomerId === null ? (
          <select className="form-control" onChange={onChange}>
            <option>Klienci</option>
            {customers.map((result, index) => {
              return (
                <option id={result.id} value={result.customer_name} key={index}>
                  {result.customer_name}
                </option>
              );
            })}
          </select>
        ) : null}
        {/* <DatePicker
          className="form-control"
          value={clientDate}
          onChange={onChangeClientDate}
        /> */}
        <div
          style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
        >
          {CustomerId === null ? (
            <button
              style={{
                marginTop: "10px",
                borderRadius: "20px",
                padding: "4px",
                marginBottom: "10px",
                width: "110px",
                fontSize: "10px",
                height: "21px",
                border: "none",
              }}
              className="btn btn-primary"
              onClick={assignClient}
            >
              Przypisz klienta
            </button>
          ) : null}
          <button className="button-action-1" onClick={() => setHidden(false)}>
            Zamknij
          </button>
        </div>
      </dialog>
    </>
  );
};

export default PopUp;
