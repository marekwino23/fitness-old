import { useState } from "react";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import { BACKEND_URL } from "../../../../constants";

export const useActionsPopUp = ({
  CustomerId,
  setCustomerId,
  TrainerId,
  eventId,
  setClose,
  close,
  clientDate,
  trainerDate,
  newDate,
  setDisplay,
  display,
  setHidden,
  setTrainerId,
  currentDate,
}) => {
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const history = useHistory();

  const assignClient = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/assignClient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentId, TrainerId }),
      });
      const data = await response.json();

      if (data.status === "success") {
        cogoToast.success(
          "Klient został został przypisany do wybranego trenera"
        );
        history.push("/calendar");
        window.location.reload();
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  const assignTrainer = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/assignTrainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentId, eventId, CustomerId }),
      });
      const data = await response.json();

      if (data.status === "success") {
        cogoToast.success("Trener został przypisany do wybranego klienta");
        history.push("/calendar");
        window.location.reload();
      } else {
        cogoToast.error(
          "Prosze dodać klienta żeby móc przypisać do niego trenera"
        );
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  const addEventTrainer = async (e) => {
    try {
      const response = await fetch(`${BACKEND_URL}/addEventTrainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentId, currentName, clientDate }),
      });
      const data = await response.json();

      if (data.status === "success") {
        cogoToast.success("Nowy trener dodany to listy");
        history.push("/calendar");
        window.location.reload();
        setHidden(false);
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  const addEventCustomer = async (e) => {
    try {
      const response = await fetch(`${BACKEND_URL}/addEventCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentId, currentName, clientDate }),
      });
      const data = await response.json();

      if (data.status === "success") {
        cogoToast.success("Nowy klient dodany to listy");
        history.push("/calendar");
        window.location.reload();
        setHidden(false);
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  const onEdit = async () => {
    if (close === false) {
      setClose(true);
    } else {
      setClose(false);
    }
  };

  const onChange = (e) => {
    const select = e.target;
    setCurrentId(select.children[select.selectedIndex].id);
    setCurrentName(select.children[select.selectedIndex].value);
  };

  const resetEvent = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/deleteEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });
      const data = await response.json();

      if (data.status === "success") {
        history.push("/calendar");
        window.location.reload();
        cogoToast.success("Wydarzenie zostało usunięte");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  // const deleteTrainer = async () => {
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/deleteTrainer`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ eventId }),
  //     });
  //     const data = await response.json();

  //     if (data.status === "success") {
  //       // history.push("/calendar");
  //       // window.location.reload();
  //       cogoToast.success("Trener został usunięty");
  //     } else {
  //       cogoToast.error("Nieprawidłowe dane");
  //     }
  //   } catch (error) {
  //     console.error("erorr: ", error);
  //   }
  // };

  const deleteCustomer = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/deleteCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, TrainerId }),
      });
      const data = await response.json();

      if (data.status === "success") {
        history.push("/calendar");
        window.location.reload();
        cogoToast.success("Klient został usunięty");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  const showProfile = () => {
    history.push(`/customer-profile/${CustomerId}`);
  };

  return {
    addEventTrainer,
    assignClient,
    resetEvent,
    currentId,
    currentName,
    setCurrentId,
    deleteCustomer,
    addEventCustomer,
    assignTrainer,
    // deleteTrainer,
    onChange,
    onEdit,
    showProfile,
  };
};
