import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PopUp from "./PopUp";

const WizardPopup = ({
  currentDate,
  customers,
  setDisplayPop,
  eventId,
  display,
  displayPop,
  setDisplay,
  image,
  date,
  trainers,
  CustomerId,
  setCustomerId,
  hidden,
  setHidden,
  TrainerId,
  setTrainerId,
  trainer,
  typePerson,
}) => {
  // const [currentId, setCurrentId] = useState(null);
  // const [currentName, setCurrentName] = useState("");
  // const history = useHistory();
  const domRef = useRef(null);
  // const resetEvent = async () => {
  //   try {
  //     setCustomerId(null);
  //     const response = await fetch(`${BACKEND_URL}/deleteEvent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ TrainerId }),
  //     });
  //     const data = await response.json();

  //     if (data.status === "success") {
  //       setTrainerId(null);
  //       cogoToast.success("Wydarzenie zostało usunięte");
  //       history.push("/");
  //     } else {
  //       cogoToast.error("Nieprawidłowe dane");
  //     }
  //   } catch (error) {
  //     console.error("erorr: ", error);
  //   }
  // };

  // const addEvent = async (e) => {
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/addEvent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ currentId, currentName, currentDate }),
  //     });
  //     const data = await response.json();

  //     if (data.status === "success") {
  //       cogoToast.success("Nowy trener dodany to listy");
  //       history.push("/");
  //     } else {
  //       cogoToast.error("Nieprawidłowe dane");
  //     }
  //   } catch (error) {
  //     console.error("erorr: ", error);
  //   }
  // };

  // const assignClient = async () => {
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/assignClient", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ currentId, TrainerId }),
  //     });
  //     const data = await response.json();

  //     if (data.status === "success") {
  //       cogoToast.success(
  //         "Klient został został przypisany do wybranego trenera"
  //       );
  //       history.push("/");
  //     } else {
  //       cogoToast.error("Nieprawidłowe dane");
  //     }
  //   } catch (error) {
  //     console.error("erorr: ", error);
  //   }
  // };

  // const onEdit = async () => {
  //   setCustomerId(null);
  // };

  // const showProfile = () => {
  //   history.push(`/customer-profile/${CustomerId}`);
  // };

  useEffect(() => {
    if (!domRef.current) {
      domRef.current = document.createElement("div");
      document.body.appendChild(domRef.current);
    }

    // return () => {
    //   domRef.current && document.body.removeChild(domRef.current);
    // };
  }, []);

  // const onChange = (e) => {
  //   const select = e.target;
  //   setCurrentId(select.children[select.selectedIndex].id);
  //   setCurrentName(select.children[select.selectedIndex].value);
  // };

  if (!domRef.current) {
    return null;
  }
  return ReactDOM.createPortal(
    <PopUp
      currentDate={currentDate}
      display={display}
      setDisplay={setDisplay}
      customers={customers}
      date={date}
      setDisplayPop={setDisplayPop}
      displayPop={displayPop}
      eventId={eventId}
      image={image}
      trainers={trainers}
      setCustomerId={setCustomerId}
      CustomerId={CustomerId}
      hidden={hidden}
      setHidden={setHidden}
      TrainerId={TrainerId}
      setTrainerId={setTrainerId}
      trainer={trainer}
      typePerson={typePerson}
    />,
    domRef.current
  );
  //   return (
  //     <div
  //       className="popup-options"
  //       style={{ display: hidden === false ? "none" : "flex" }}
  //     >
  //       {TrainerId !== null ? (
  //         <div>
  //           <img
  //             width={50}
  //             style={{ borderRadius: "20px" }}
  //             src={trainer[0]?.file}
  //             alt="trainer"
  //           />
  //           {trainer.name !== "" ? <h4>Trener: {trainer[0]?.name}</h4> : null}
  //           {CustomerId !== null ? (
  //             <h4>
  //               Klient nr:{" "}
  //               <span
  //                 style={{ color: "red", cursor: "pointer" }}
  //                 onClick={showProfile}
  //               >
  //                 {CustomerId}
  //               </span>
  //             </h4>
  //           ) : (
  //             <h4>Klient: brak przypisanego klienta</h4>
  //           )}
  //           {CustomerId !== null ? (
  //             <div className="button-grid">
  //               <button onClick={resetEvent}>Odwołaj</button>
  //               <button onClick={onEdit}>Zmień</button>
  //               <button onClick={showProfile}>Profil klienta</button>
  //               {/* <button onClick={randomTraining}>Plan</button> */}
  //             </div>
  //           ) : null}
  //         </div>
  //       ) : null}
  //       {TrainerId === null ? (
  //         <select className="form-control" onChange={onChange}>
  //           <option></option>
  //           {trainers.map((result, index) => {
  //             return (
  //               <option id={result.id} value={result.name} key={index}>
  //                 {result.name}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       ) : null}
  //       {CustomerId === null && TrainerId !== null ? (
  //         <select className="form-control" onChange={onChange}>
  //           <option></option>
  //           {customers.map((result, index) => {
  //             return (
  //               <option id={result.id} value={result.customer_Name} key={index}>
  //                 {result.customer_Name}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       ) : null}
  //       {CustomerId === null && TrainerId !== null ? (
  //         <button
  //           style={{ padding: "10px", marginTop: "20px" }}
  //           className="btn btn-primary"
  //           onClick={assignClient}
  //         >
  //           Dodaj klienta do wybranego trenera
  //         </button>
  //       ) : null}
  //       {TrainerId === null ? (
  //         <button
  //           style={{ padding: "10px", marginTop: "20px" }}
  //           className="btn btn-primary"
  //           onClick={addEvent}
  //         >
  //           Dodaj trenera do wybranego dnia
  //         </button>
  //       ) : null}
  //     </div>
  //   );
};
export default WizardPopup;
