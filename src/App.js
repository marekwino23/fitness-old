import { Suspense, useEffect } from "react";
/// Components
import Index from "./jsx/index";
import Home from "./jsx/components/Dashboard/Home";
import AppProfile from "./jsx/components/AppsMenu/AppsMenu/AppProfile/AppProfile";
import Login from "./jsx/pages/Login";
import { connect, useDispatch } from "react-redux";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
// action
import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import Register from "./jsx/pages/Registration";

// const SignUp = lazy(() => import("./jsx/pages/Registration"));
// const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"))
function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = sessionStorage.getItem("user");

  useEffect(() => {
    if (JSON.parse(auth) === null) {
      history.push("/login");
    }
  }, [auth, history]);
  useEffect(() => {
    checkAutoLogin(dispatch, props.history);
  }, [dispatch, props.history]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Home} />
      <Route path="/app-profile" component={AppProfile} />
      <Route path="/page-register" component={Register} />
      {/* <Route path="/page-forgot-password" component={ForgotPassword} /> */}
    </Switch>
  );
  if (auth?.length) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <Index />
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
