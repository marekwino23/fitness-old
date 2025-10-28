import cogoToast from "cogo-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../../../constants";
import axios from "axios";

const GenerateTraining = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [file, setFile] = useState();
  const initialized = useRef(false);
  const [excersises, setExcersises] = useState([]);
  const history = useHistory();
  const {
    register,
    handleSubmit,
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
      postalCode: "",
      city: "",
      street: "",
      weight: null,
      bmi: null,
      typeWork: "",
      resultHarward: null,
      grade: null,
      resultStrength: null,
      injuries: "",
      purpose: "",
      comments: "",
    },
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      fetch(
        `${BACKEND_URL}/idResources`,
        {
          method: "GET",
          "ngrok-skip-browser-warning": true,
          headers: {
            "Content-Type": "application/json",
          },
        },
        [excersises]
      )
        .then((response) => response.json())
        .then((response) => {
          setExcersises(response);
        });
    }
  });

  const onChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    }
  };

  const saveForm = async (data) => {
    let randomArray = [];
    for (let i = 0; i < 9; i++) {
      let randomNumber = Math.round(Math.random() * 107 + 1);
      if (!randomArray.includes(randomNumber)) {
        randomArray.push(randomNumber);
      }
    }

    console.log(randomArray);

    const body = new FormData();
    body.set("key", "f32652bb4b2bc7d525ff9f56256361f7");
    body.append("image", file);

    const payload = {
      name: data.name,
      surname: data.surname,
      age: +data.age,
      phone: data.phone,
      email: data.email,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
      weight: +data.weight,
      bmi: +data.bmi,
      typeWork: data.typeWork,
      resultHarward: +data.resultHarward,
      grade: +data.grade,
      resultStrength: +data.resultStrength,
      injuries: data.injuries,
      purpose: data.purpose,
      comments: data.comments,
      randomNumbers: randomArray,
      user_id: user.user.id,
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
      const response = await fetch(`${BACKEND_URL}/customersperplan`, {
        method: "POST",
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
        cogoToast.success(
          "Ankieta została zapisana i trening został wylosowany dla klienta"
        );
        history.push("/customers");
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
        <h4 className="card-title">Generator jednostki treningowej</h4>
      </div>
      <div className="row">
        <form className="customers-form" onSubmit={handleSubmit(saveForm)}>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">Imię</label>
              <input
                {...register("name", {
                  required: { value: true, message: "Pole wymagane" },
                  maxLength: 20,
                  minLength: 3,
                })}
                type="text"
                name="name"
                style={{ width: "300px", height: "35px" }}
                className="form-control"
                // placeholder="Wpisz imię"
              />
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">Nazwisko</label>
              <input
                {...register("surname", {
                  required: { value: true, message: "Pole wymagane" },
                  maxLength: 30,
                  minLength: 3,
                })}
                type="text"
                name="surname"
                style={{ width: "300px", height: "35px" }}
                className="form-control"
                // placeholder="Wpisz nazwisko"
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
                    required: { value: true, message: "Pole wymagane" },
                    min: { value: 16, message: "Minimalny wiek to 16lat" },
                    max: { value: 120, message: "Maksymalna wiek to 120lat" },
                  })}
                  type="number"
                  name="age"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swój wiek"
                />
              </label>
              {errors.age && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.age.message}
                </p>
              )}
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Numer telefonu: {""}
                <input
                  {...register("phone", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 9,
                    minLength: 9,
                  })}
                  type="text"
                  title="Numer telefonu składa się z 9 cyfr (0-9)"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  name="phone"
                  style={{ width: "300px", height: "35px" }}
                  className="form-control"
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
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 30,
                  })}
                  type="email"
                  name="email"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swój adres email"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Ulica: {""}
                <input
                  {...register("street", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 30,
                    minLength: 3,
                  })}
                  type="text"
                  name="street"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swoją ulicę"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Miasto: {""}
                <input
                  {...register("city", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 30,
                    minLength: 3,
                  })}
                  type="text"
                  name="city"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swoje miasto"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Kod pocztowy: {""}
                <input
                  {...register("postalCode", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 30,
                    minLength: 6,
                  })}
                  type="text"
                  name="postalCode"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swÓj kod pocztowy"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Waga[kg]: {""}
                <input
                  {...register("weight", {
                    required: { value: true, message: "Pole wymagane" },
                    min: {
                      value: 1,
                      message: "Wartość musi minimalnie wynosić 1kg",
                    },
                    max: {
                      value: 200,
                      message: "Maksymalna wartość jaką można wpisać to 200kg",
                    },
                  })}
                  type="number"
                  // step="0.01"
                  name="weight"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swoją wagę ciała"
                />
              </label>
              {errors.weight && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.weight.message}
                </p>
              )}
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                BMI: {""}
                <input
                  {...register("bmi", {
                    required: { value: true, message: "Pole wymagane" },
                    min: {
                      value: 15,
                      message: "Bmi posiada zakres od 15 do 50",
                    },
                    max: {
                      value: 50,
                      message: "Bmi posiada zakres od 15 do 50",
                    },
                  })}
                  type="number"
                  step="0.1"
                  style={{ width: "300px", height: "35px" }}
                  required
                  name="bmi"
                  className="form-control"
                  // placeholder="Podaj swoje BMI"
                />
              </label>
              {errors.bmi && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.bmi.message}
                </p>
              )}
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Rodzaj pracy: {""}
                <select
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  required
                  {...register("typeWork", {
                    required: { value: true, message: "Pole wymagane" },
                    // maxLength: 5,
                  })}
                >
                  <option value=""></option>
                  <option value="siedząca">siedząca</option>
                  <option value="stojąca">stojąca</option>
                  <option value="mieszana">mieszana</option>
                </select>
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Wynik próby Harwardzkiej[w pkt]: {""}
                <input
                  {...register("resultHarward", {
                    // maxLength: 3,
                    required: { value: true, message: "Pole wymagane" },
                    min: {
                      value: 1,
                      message:
                        "Wynik próby Harwadzkiej posiada zakres od 1 do 100pkt",
                    },
                    max: {
                      value: 100,
                      message:
                        "Wynik próby Harwadzkiej posiada zakres od 1 do 100pkt",
                    },
                  })}
                  type="number"
                  name="resultHarward"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Podaj swój wynik próby Harwardzkiej"
                />
                {errors.resultHarward && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.resultHarward.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Subiektywna ocena poziomu aktywności: {""}
                <input
                  {...register("grade", {
                    required: { value: true, message: "Pole wymagane" },
                    min: {
                      value: 1,
                      message: "Wartość musi minimalnie wynosić 1",
                    },
                    max: {
                      value: 10,
                      message: "Maksymalna wartość jaką można wpisać to 10",
                    },
                  })}
                  step="0.5"
                  type="number"
                  name="grade"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  // placeholder="Oceń sam siebie"
                />
                {errors.grade && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.grade.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Wynik testu siły: {""}
                <input
                  {...register("resultStrength", {
                    required: { value: true, message: "Pole wymagane" },
                    min: {
                      value: 10,
                      message: "Wynik testu siły posiada zakres od 10 do 35",
                    },
                    max: {
                      value: 35,
                      message: "Wynik testu siły posiada zakres od 10 do 35",
                    },
                  })}
                  type="number"
                  step="0.1"
                  name="resultStrength"
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  required
                  // placeholder="Podaj swój wynik testu siły"
                />
              </label>
              {errors.resultStrength && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.resultStrength.message}
                </p>
              )}
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Kontuzje: {""}
                <select
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  required
                  {...register("injuries", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 5,
                  })}
                >
                  <option value=""></option>
                  <option value="tak">tak</option>
                  <option value="nie">nie</option>
                </select>
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Cel treningowy: {""}
                <select
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  required
                  {...register("purpose", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 30,
                  })}
                >
                  <option value=""></option>
                  <option value="Core Stability">Core Stability</option>
                  <option value="Total Body Workout">Total Body Workout</option>
                </select>
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Uwagi: {""}
                <input
                  {...register("comments", {
                    required: { value: true, message: "Pole wymagane" },
                    maxLength: 100,
                    minLength: 3,
                  })}
                  type="text"
                  name="comments"
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  required
                  // placeholder="Jakie masz uwagi?"
                />
              </label>
            </div>
          </div>
          {/* <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2"></div> */}
          <input
            type="submit"
            value="Dodaj klienta i wygeneruj jednostkę treningową"
            style={{ padding: "10px", fontSize: "10px", maxHeight: "35px" }}
            className="btn btn-primary mr-1"
          />
        </form>
      </div>
    </section>
  );
};

export default GenerateTraining;
