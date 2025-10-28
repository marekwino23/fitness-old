import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../constants";

// image
//import logo from "../../images/logo-full.png";
import logo from "../../images/logo.png";
// import logoText from "../../images/logo-text.png";
import loginbg from "../../images/a4e.jpg";
import ReactLoading from "react-loading";
import cogoToast from "cogo-toast";

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorObj, setErrorObj] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch();

  const onChange = ({ target }) => {
    if (!target.value)
      setErrorObj((prev) => ({ ...prev, [target.name]: "Pole jest wymagane" }));
    target.name === "email"
      ? setEmail(target.value)
      : setPassword(target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.statusCode === 200) {
            setLoading(false);
            cogoToast.success("Zalogowany");
            sessionStorage.setItem("user", JSON.stringify(response));
            history.push("/dashboard");
          } else if (response.statusCode === 400) {
            cogoToast.error("Nieprawidłowe hasło lub email");
            setLoading(false);
          } else if (response.statusCode === 500) {
            cogoToast.error(
              "Nie znaleziono użytkownika, prosze spróbować jeszcze raz"
            );
            setLoading(false);
          } else if (response[0].statusCode === 404) {
            setLoading(false);
            cogoToast.error(
              "Nie znaleziono użytkownika, prosze spróbować jeszcze raz"
            );
          }
        })
        .catch((error) => console.error("error: ", error));
    }, [2000]);
  };

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5 brand-logo">
            <img className="logo-abbr mr-1" src={logo} alt="" width="200" />
            {/* <img
              className="brand-title ml-2"
              src={logoText}
              alt=""
              width="108"
            /> */}
          </div>
          {/* <h3 className="mb-2">Welcome back!</h3>
					<p>User Experience & Interface Design <br />Strategy SaaS Solutions</p> */}
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + loginbg + ")" }}
        ></div>
      </div>
      {loading === true ? (
        <ReactLoading
          style={{
            position: "absolute",
            width: "100px",
            top: "385px",
            left: "637px",
          }}
          type="spin"
          color="blue"
          height={100}
          width={100}
        />
      ) : null}
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.errorMessage && (
                    <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">Logowanie</h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Adres email</strong>
                      </label>
                      <div>
                        <input
                          type="email"
                          onChange={onChange}
                          className="form-control"
                          name="email"
                          placeholder="Wpisz adres email"
                        />
                      </div>
                      {errorObj.email && (
                        <div className="text-danger fs-12">
                          {errorObj.email}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1">
                        <strong>Hasło</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={onChange}
                        name="password"
                        placeholder="Wpisz hasło"
                      />
                      {errorObj.password && (
                        <div className="text-danger fs-12">
                          {errorObj.password}
                        </div>
                      )}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Pamiętaj mnie
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button
                        style={{
                          height: "35px",
                          fontSize: "10px",
                          padding: "10px",
                        }}
                        onClick={onLogin}
                        className="btn btn-primary btn-block"
                      >
                        Zaloguj się
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                    <p>
                      Nie masz konta?{" "}
                      <Link className="text-primary" to="./page-register">
                        Stwórz nowe konto
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
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
