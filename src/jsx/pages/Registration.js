import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import logo from "../../images/logo.png";
import { BACKEND_URL } from "../../constants";

const Register = () => {
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
      email: "",
      password: "",
    },
  });

  const onSubmit = async (e) => {
    const data = getValues();
    fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 200) {
          cogoToast.success("Użytkownik utworzony. Teraz możesz sie zalogować");
          setTimeout(() => {
            history.push("/login");
          }, [2000]);
        } else if (response.statusCode === 400) {
          cogoToast.error("Email jest już zajęty");
        }
      });
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div
                    style={{ backgroundColor: "#008f91" }}
                    className="auth-form"
                  >
                    <div className="text-center mb-3">
                      <img width={70} src={logo} alt="" />
                    </div>

                    <h4 className="text-center mb-4 text-white">Rejestracja</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Imię</strong>
                        </label>
                        <input
                          {...register("name", {
                            required: { value: true, message: "Pole wymagane" },
                            maxLength: 20,
                            minLength: 3,
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Wpisz swoje imię"
                          name="name"
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Nazwisko</strong>
                        </label>
                        <input
                          {...register("surname", {
                            required: { value: true, message: "Pole wymagane" },
                            maxLength: 20,
                            minLength: 3,
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Wpisz swoje nazwisko"
                          name="surname"
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Email</strong>
                        </label>
                        <input
                          {...register("email", {
                            required: { value: true, message: "Pole wymagane" },
                            maxLength: 50,
                          })}
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Wpisz swój email"
                        />
                        {errors.email && (
                          <p style={{ color: "white" }}>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Hasło</strong>
                        </label>
                        <input
                          {...register("password", {
                            required: { value: true, message: "Pole wymagane" },
                            minLength: {
                              value: 8,
                              message: "Minimalna długość hasła to 8 znaków",
                            },
                          })}
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Wpisz swoje hasło"
                        />
                        {errors.password && (
                          <p style={{ color: "white" }}>
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="text-center mt-4">
                        <input
                          type="submit"
                          value="Wyślij"
                          className="btn bg-white text-primary btn-block"
                        />
                      </div>
                    </form>
                    <div className="new-account mt-3 text-white">
                      <p>
                        Posiadasz już konto?{" "}
                        <Link className="text-white" to="/login">
                          Zaloguj się
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
