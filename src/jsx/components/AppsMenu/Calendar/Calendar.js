import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import imageDefault from "../../../../images/profile/5856.jpg";
import ReactLoading from "react-loading";
import PageTitle from "../../../layouts/PageTitle";
import plLocale from "@fullcalendar/core/locales/pl";
import WizardPopup from "./WizardPopUp";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import ProfileSideBar from "../../ProfileSideBar";

const Calendar = () => {
  const [TrainerId, setTrainerId] = useState(null);
  const [displayPop, setDisplayPop] = useState(false);
  const history = useHistory();
  const [display, setDisplay] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [trainer, setTrainer] = useState([]);
  const [typePerson, setTypePerson] = useState("trainer");
  const [CustomerId, setCustomerId] = useState(null);
  const [image, setImage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hidden, setHidden] = useState(false);
  const [events, setEvents] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const initialized = useRef(false);

  const data = useMemo(
    () => (typePerson === "client" ? customers : trainers),
    [customers, trainers, typePerson]
  );

  const onEventClick = (e) => {
    setEventId(e.event._def.publicId);
    setDate(e.event.start);
    setTrainerId(e.event.extendedProps.trainer_id);
    setCustomerId(e.event.extendedProps.customer_id);
    setImage(e.event.extendedProps.customer_file);

    fetch(
      `${BACKEND_URL}/trainers/${e.event.extendedProps.trainer_id}`,
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
        setTrainer(response);
      });
    if (hidden === false) {
      setHidden(true);
      setDisplay(true);
      setDisplayPop(false);
    } else {
      setHidden(false);
      setDisplay(false);
    }
  };

  const addEvent = () => {
    if (hidden === false) {
      // setHidden(true);
      // setDisplay(true);
      setDisplayPop(true);
    } else {
      // setHidden(false);
      // setDisplay(false);
      setDisplayPop(false);
    }
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    const entity =
      typePerson === "trainer" ? "trainer-profile" : "customer-profile";
    history.push(`${entity}/${id}`);
    setExpanded(!isExpanded);
  };

  const changePerson = (typePerson) => {
    setTypePerson(typePerson);
  };

  const changeDate = (e) => {
    setCurrentDate(e.dateStr);
    setDisplayPop(true);
  };

  const renderEventContent = (args) => {
    return (
      <div className="event-box">
        {args.event.extendedProps.customer_file !== "null" ? (
          <img
            style={{ maxWidth: "30px", maxHeight: "30px" }}
            className="sidebar-box-element-image"
            alt="event-pic"
            id="customer"
            src={args.event.extendedProps.customer_file}
          ></img>
        ) : (
          <img
            style={{ maxWidth: "30px", maxHeight: "30px" }}
            className="sidebar-box-element-image"
            alt="event-pic"
            id="customer"
            src={imageDefault}
          ></img>
        )}
        {args.event.extendedProps.trainer_file !== null ? (
          <img
            style={{ maxWidth: "30px", maxHeight: "30px" }}
            className="sidebar-box-element-image"
            alt="event-pic"
            id="trainer"
            src={args.event.extendedProps.trainer_file}
          ></img>
        ) : (
          <img
            style={{ maxWidth: "30px", maxHeight: "30px" }}
            className="sidebar-box-element-image"
            alt="event-pic"
            id="trainer"
            src={imageDefault}
          ></img>
        )}
        {/* <div
          style={{
            backgroundColor: "rgb(0 191 255)",
            maxWidth: "159px",
            color: "white",
            fontSize: "14px",
            height: "20px",
          }}
        >
          Trening
        </div> */}
      </div>
    );
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setLoading(true);
      setTimeout(() => {
        fetch(`${BACKEND_URL}/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            setLoading(false);
            setEvents(response);
          });
      }, [1000]);
    }
  }, []);

  useEffect(() => {
    // if (typePerson === "trainer" || customers.length) {
    //   return;
    // }
    fetch(`${BACKEND_URL}/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        Array.isArray(response) && setCustomers(response);
      });
  }, [customers.length, typePerson]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/trainers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        Array.isArray(response) && setTrainers(response);
      });
  }, []);

  return (
    <div className="h-80">
      <PageTitle activeMenu="Kalendarz" motherMenu="App" />
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
      <WizardPopup
        eventId={eventId}
        displayPop={displayPop}
        setDisplayPop={setDisplayPop}
        display={display}
        setDisplay={setDisplay}
        currentDate={currentDate}
        customers={customers}
        date={date}
        trainers={trainers}
        image={image}
        setCustomerId={setCustomerId}
        CustomerId={CustomerId}
        hidden={hidden}
        setHidden={setHidden}
        TrainerId={TrainerId}
        setTrainerId={setTrainerId}
        trainer={trainer}
        typePerson={typePerson}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "33px",
        }}
        className="main-calendar-trainers-clients"
      >
        <div className="side-bar-calendar">
          <button
            style={{ width: "50px", height: "50px", padding: "5px" }}
            onClick={addEvent}
            className="btn btn-primary"
          >
            +
          </button>
          <h4
            className="side-bar_btn"
            style={{
              padding: "10px",
            }}
          >
            <button
              className="btn-text"
              onClick={(e) => changePerson("client")}
            >
              Klienci
            </button>
            <button
              className="btn-text"
              onClick={(e) => changePerson("trainer")}
            >
              Trenerzy
            </button>
          </h4>
          <ProfileSideBar
            data={data}
            onClick={handleClick}
            typePerson={typePerson}
          />
        </div>
        <div style={{ width: "100%" }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventContent={renderEventContent}
            events={events}
            stickyFooterScrollbar={true}
            displayEventTime={false}
            locales={[plLocale]}
            selectable={true}
            eventClick={onEventClick}
            dateClick={changeDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
