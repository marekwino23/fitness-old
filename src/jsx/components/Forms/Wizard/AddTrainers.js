import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../../../../constants";

const AddTrainers = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const history = useHistory();
  const [file, setFile] = useState("");
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
      age:null,
      phone: "",
      email: "",
    },
  });

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onClick = async () => {
    const data = getValues();
    const body = new FormData();
    body.set("key", "f32652bb4b2bc7d525ff9f56256361f7");

    body.append("image", file);

    const payload = {
      name: data.name,
      surname: data.surname,
      age: +data.age,
      phone: data.phone,
      email: data.email,
      user_id: user.user.id,
    };

    try {
      let resp;
      if (file !== "") {
        resp = await axios({
          method: "POST",
          url: "https://api.imgbb.com/1/upload",
          data: body,
        });
      }
      const response = await fetch(`${BACKEND_URL}/trainers`, {
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
        cogoToast.success("Trener został dodany do listy");
        history.push("/trainers");
      } else {
        cogoToast.error("Nieprawidłowe dane");
      }
    } catch (error) {
      console.error("erorr: ", error);
    }
  };
  return (
    <section>
      <div style={{ padding: "0 0 20px 0" }} className="card-header">
        <h4 className="card-title">Dodaj trenera</h4>
      </div>
      <div className="row">
        <form
          style={{ display: "grid", width: "100%", grid: "auto / auto auto " }}
          onSubmit={handleSubmit(onClick)}
        >
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
                placeholder="Wpisz imię"
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
                placeholder="Wpisz nazwisko"
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
              </label>
              <input
                type="file"
                onChange={onChange}
                name="file"
                style={{ width: "300px", height: "45px" }}
                id="inputGroupPrepend2"
                aria-describedby="inputGroupPrepend2"
              />
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
                    maxLength: 50,
                  })}
                  name="email"
                  type="email"
                  style={{ width: "300px", height: "35px" }}
                  required
                  className="form-control"
                  placeholder="Podaj swój email"
                />
              </label>
            </div>
          </div>
          <input
            style={{
              fontSize: "10px",
              maxWidth: "180px",
              padding: "10px",
              height: "35px",
            }}
            type="submit"
            value="Dodaj"
            className="btn btn-primary mr-1"
          />
        </form>
        {/* <div className="col-lg-12 mb-2">
          <div className="form-group">
            <label className="text-label">Phone Number*</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="(+1)408-657-9007"
              required
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AddTrainers;
