import cogoToast from "cogo-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import imageDefault from "../../../../images/profile/5856.jpg";
import { BACKEND_URL } from "../../../../constants";
import axios from "axios";

const EditCustomer = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [injuries, setInjuries] = useState("");
  const [purpose, setPurpose] = useState("");
  const [typeWork, setTypeWork] = useState();
  const [customer, setCustomer] = useState(null);
  const [file, setFile] = useState();
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
      city: "",
      street: "",
      postalCode: "",
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

  // const options_work = [
  //   { value: "siedząca", label: "siedząca" },
  //   { value: "stojąca", label: "stojąca" },
  //   { value: "mieszana", label: "mieszana" },
  // ];

  // const options_injuries = [
  //   { value: "tak", label: "tak" },
  //   { value: "nie", label: "nie" },
  // ];

  // const options_purpose = [
  //   { value: "Core stability", label: "Core stability" },
  //   { value: "Total Body Workout", label: "Total Body Workout" },
  // ];

  const onChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    }
  };

  const editTraining = async () => {
    const data = getValues();
    let randomArray = [];
    for (let i = 0; i < 450; i++) {
      let randomNumber = Math.round(Math.random() * 107 + 1);
      if (!randomArray.includes(randomNumber)) {
        randomArray.push(randomNumber);
      }
    }
    try {
      const response = await fetch(`${BACKEND_URL}/edit-customer-training`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          randomNumbers: randomArray,
          weight: data.weight === null ? customer?.weight : +data.weight,
          bmi: data.bmi === null ? customer?.bmi : +data.bmi,
          typeWork: data.typeWork === "" ? customer?.typeWork : data.typeWork,
          resultHarward:
            data.resultHarward === null
              ? customer?.harwardResult
              : +data.resultHarward,
          grade: data.grade === null ? customer?.grade : +data.grade,
          resultStrength:
            data.resultStrength === null
              ? customer?.strengthTest
              : data.resultStrength,
          injuries: data.injuries === "" ? customer?.injuries : data.injuries,
          purpose: data.purpose === "" ? customer?.purpose : data.purpose,
          comments: data.comments === "" ? customer?.comments : data.comments,
        }),
      });
      const result = await response.json();

      if (result.statusCode === 200) {
        cogoToast.success("Dane o treningu klienta zostały zaaktualizowane");
        history.push("/customers");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  const editForm = async (e) => {
    const data = getValues();
    const body = new FormData();
    body.set("key", "f32652bb4b2bc7d525ff9f56256361f7");
    body.append("image", file);

    const payload = {
      id: params.id,
      name: data.name === "" ? customer?.customer_name : data.name,
      surname: data.surname === "" ? customer?.customer_surname : data.surname,
      age: data.age === null ? customer?.customer_age : +data.age,
      phone: data.phone === "" ? customer?.customer_phone : data.phone,
      email: data.email === "" ? customer?.customer_email : data.email,
      city: data.city === "" ? customer?.city : data.city,
      street: data.street === "" ? customer?.street : data.street,
      postalCode:
        data.postalCode === "" ? customer?.postalCode : data.postalCode,
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
      const response = await fetch(`${BACKEND_URL}/edit-customer-info`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          file: resp ? resp.data.data.url : customer?.customer_file,
        }),
      });
      const result = await response.json();

      if (result.statusCode === 200) {
        cogoToast.success(
          "Dane o kliencie zostały zaaktualizowane, teraz możesz zaaktualizować swój trening"
        );
        setStatus(true);
        history.push("/customers");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setLoading(true);
      setTimeout(() => {
        fetch(
          `${BACKEND_URL}/customers/${params.id}/${parseInt(user.user.id)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": true,
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            if (!response.hasOwnProperty("error")) {
              setCustomer(response[0]);
              setPurpose(response[0].purpose);
              setInjuries(response[0].injuries);
              setTypeWork(response[0].typeWork);
            }
          })
          .catch((error) => {
            console.error("error: ", error);
          })
          .finally(() => setLoading(false));
      }, [1000]);
    }
  }, [user.user.id, params.id, setInjuries, setLoading, setPurpose]);

  console.log(typeWork);

  return (
    <section
      style={{ display: "flex", flexFlow: "column", alignItems: "baseline" }}
    >
      <div className="card-header">
        <h4 className="card-title">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {" "}
            Edycja klienta: {customer?.customer_name}
            {customer?.customer_file !== "null" ? (
              <img
                className="edit-box-element-image"
                alt="klient"
                src={customer?.customer_file}
              />
            ) : (
              <img
                className="edit-box-element-image"
                alt="klient"
                src={imageDefault}
              />
            )}
          </div>
        </h4>
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
                placeholder={customer?.customer_name}
                // required
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
                placeholder={customer?.customer_surname}
                // required
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
                    // required: { value: true, message: "Pole wymagane" },
                    min: { value: 16, message: "Minimalny wiek to 16lat" },
                    max: { value: 120, message: "Maksymalna wiek to 120lat" },
                  })}
                  type="number"
                  name="age"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  placeholder={customer?.customer_age}
                  className="form-control"
                  // placeholder="Podaj swój wiek"
                />
              </label>
              {errors.age && (
                <p style={{ color: "red" }}>{errors.age.message}</p>
              )}
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
                  // required
                  className="form-control"
                  placeholder={customer?.customer_phone}
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
                  // required
                  className="form-control"
                  placeholder={customer?.customer_email}
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
                    maxLength: 30,
                  })}
                  type="text"
                  name="city"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  className="form-control"
                  placeholder={customer?.city}
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
                    maxLength: 30,
                  })}
                  type="text"
                  name="street"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  className="form-control"
                  placeholder={customer?.street}
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
                    maxLength: 30,
                  })}
                  type="text"
                  name="postalCode"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  className="form-control"
                  placeholder={customer?.postalCode}
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2"></div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <input
                type="submit"
                style={{
                  padding: "10px",
                  height: "35px",
                  border: "none",
                  marginTop: "16px",
                  width: "158px",
                  fontSize: "10px",
                  backgroundColor: "orange",
                }}
                value="Zaaktualizuj dane klienta"
                className="btn btn-primary mr-1"
              />
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2"></div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Waga[kg]: {""}
                <input
                  {...register("weight", {
                    // required: { value: true, message: "Pole wymagane" },
                    min: { value: 1, message: "Minimalny wiek to 1kg" },
                    max: { value: 200, message: "Maksymalna wiek to 200kg" },
                  })}
                  type="number"
                  step="0.01"
                  name="weight"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  className="form-control"
                  placeholder={customer?.weight}
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                BMI: {""}
                <input
                  {...register("bmi", {
                    // required: { value: true, message: "Required" },
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
                  // required
                  placeholder={customer?.bmi}
                  name="bmi"
                  className="form-control"
                  // placeholder="Podaj swoje BMI"
                />
              </label>
              {errors.bmi && (
                <p style={{ color: "red" }}>{errors.bmi.message}</p>
              )}
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Rodzaj pracy: {customer?.typeWork}
                <select
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  {...register("typeWork", {
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
                    // required: { value: true, message: "Pole wymagane" },
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
                  placeholder={customer?.harwardResult}
                  // required
                  className="form-control"
                  // placeholder="Podaj swój wynik próby Harwardzkiej"
                />
                {errors.resultHarward && (
                  <p style={{ color: "red" }}>{errors.resultHarward.message}</p>
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
                    min: 1,
                    max: 5,
                  })}
                  type="number"
                  name="grade"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  className="form-control"
                  placeholder={customer?.grade}
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Wynik testu siły: {""}
                <input
                  {...register("resultStrength", {
                    // required: { value: true, message: "Required" },
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
                  placeholder={customer?.strengthTest}
                  name="resultStrength"
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  // placeholder="Podaj swój wynik testu siły"
                />
              </label>
            </div>
          </div>
          <div style={{ maxWidth: "100%" }} className="col-lg-6 mb-2">
            <div className="form-group">
              <label className="text-label">
                Kontuzje: {customer?.injuries}
                <select
                  className="form-control"
                  name="injuries"
                  style={{ maxWidth: "200px", height: "35px" }}
                  // required
                  {...register("injuries", {
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
                Cel treningowy: {customer?.purpose}
                <select
                  className="form-control"
                  name="purpose"
                  style={{ maxWidth: "200px", height: "35px" }}
                  // required
                  {...register("purpose", {
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
                    maxLength: 100,
                  })}
                  type="text"
                  name="comments"
                  className="form-control"
                  style={{ width: "300px", height: "35px" }}
                  // required
                  placeholder={customer?.comments}
                />
              </label>
            </div>
          </div>
        </form>
        <button
          onClick={editTraining}
          className="btn btn-primary mr-1"
          style={{
            padding: "10px",
            height: "35px",
            marginBottom: "20px",
            fontSize: "10px",
          }}
        >
          Zaaktualizuj trening klienta
        </button>
      </div>
    </section>
  );
};

export default EditCustomer;
