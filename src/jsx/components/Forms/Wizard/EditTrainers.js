import cogoToast from "cogo-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import imageDefault from "../../../../images/profile/5856.jpg";
import { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import axios from "axios";

const EditTrainers = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const params = useParams();
  const [file, setFile] = useState();
  const [trainer, setTrainer] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      surname: "",
      file: "",
      age: null,
      phone: "",
      email: "",
      weight: null,
      bmi: null,
      typeWork: "",
      resultHarward: null,
      grade: null,
      resultStrength: null,
      injuries: "",
      comments: "",
    },
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setLoading(true);
      setTimeout(() => {
        fetch(`${BACKEND_URL}/trainers/${params.id}/${user.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (!response.hasOwnProperty("error")) {
              setTrainer(response[0]);
            }
          })
          .catch((error) => {
            console.error("error: ", error);
          })
          .finally(() => setLoading(false));
      }, [1000]);
    }
  }, [params.id, user.user.id, setLoading]);

  const onChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    }
  };
  const editForm = async (e) => {
    const data = getValues();
    // const table = [];
    // for (let i = 0; i < excersises.length; i++) {
    //   table.push(excersises[i]?.id);
    // }
    // setRandomNumber(Math.floor(Math.random() * (table.length - 1) + 1));
    const body = new FormData();
    body.set("key", "f32652bb4b2bc7d525ff9f56256361f7");
    body.append("image", file);

    const payload = {
      id: params.id,
      name: data.name !== "" ? data.name : trainer?.name,
      surname: data.surname !== "" ? data.surname : trainer?.surname,
      age: data.age !== null ? +data.age : trainer?.age,
      phone: data.phone !== "" ? data.phone : trainer?.phone,
      email: data.email !== "" ? data.email : trainer?.email,
    };

    try {
      let resp;
      if (file !== undefined) {
        resp = await axios({
          method: "POST",
          url: "https://api.imgbb.com/1/upload",
          data: body,
        });
      }
      const response = await fetch(`${BACKEND_URL}/edit-trainer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          file: resp ? resp.data.data.url : null,
        }),
      });
      const result = await response.json();

      if (result.statusCode === 200) {
        cogoToast.success("Dane trenera zostały zaaktualizowane");
        history.push("/trainers");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  console.log(errors);
  return (
    <section
      style={{ display: "flex", flexFlow: "column", alignItems: "baseline" }}
    >
      <div className="card-header">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {" "}
          Edycja trenera: {trainer?.name}
          {trainer?.trainer_file !== "null" ? (
            <img
              className="edit-box-element-image"
              alt="klient"
              src={trainer?.trainer_file}
            />
          ) : (
            <img
              className="edit-box-element-image"
              alt="klient"
              src={imageDefault}
            />
          )}
        </div>
      </div>
      <div className="row">
        <form className="customers-form" onSubmit={handleSubmit(editForm)}>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">Imię</label>
              <input
                {...register("name", {
                  maxLength: 20,
                })}
                type="text"
                name="name"
                style={{ width: "300px", height: "35px" }}
                className="form-control"
                placeholder={trainer?.name}
                required
              />
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">Nazwisko</label>
              <input
                {...register("surname", {
                  maxLength: 30,
                })}
                type="text"
                name="surname"
                style={{ width: "300px", height: "35px" }}
                className="form-control"
                placeholder={trainer?.surname}
                required
              />
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-12 mb-2">
            <div className="form-group">
              <label
                style={{ display: "flex", flexFlow: "column" }}
                className="text-label"
              >
                Zdjęcie
                <input
                  type="file"
                  name="file"
                  style={{ width: "300px", height: "45px" }}
                  onChange={onChange}
                  id="inputGroupPrepend2"
                  aria-describedby="inputGroupPrepend2"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Wiek: {""}
                <input
                  {...register("age", {
                    value: +trainer?.age,
                    valueAsNumber: true,
                    maxLength: 3,
                    min: 7,
                  })}
                  type="number"
                  name="age"
                  style={{ width: "300px", height: "35px" }}
                  required
                  placeholder={trainer?.age}
                  className="form-control"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Numer telefonu: {""}
                <input
                  {...register("phone", {
                    maxLength: 30,
                  })}
                  type="text"
                  name="phone"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  placeholder={trainer?.phone}
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Email: {""}
                <input
                  {...register("email", {
                    maxLength: 30,
                  })}
                  type="email"
                  name="email"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  placeholder={trainer?.email}
                />
              </label>
            </div>
          </div>
          <input
            type="submit"
            style={{
              padding: "10px",
              height: "35px",
              fontSize: "10px",
            }}
            value="Zaaktualizuj dane Trenera"
            className="btn btn-primary mr-1"
          />
        </form>
      </div>
    </section>
  );
};

export default EditTrainers;
