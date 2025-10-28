import cogoToast from "cogo-toast";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { logout } from "../../../store/actions/AuthActions";
import { isAuthenticated } from "../../../store/selectors/AuthSelectors";

function LogoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  function onLogout() {
    sessionStorage.clear();
    localStorage.removeItem("userDetails");
    dispatch(logout);
    history.push("/login");
    cogoToast.success("Wylogowany");
    setTimeout(() => {}, [2000]);
    // window.location.reload();
  }
  return (
    <button
      className="dropdown-item ai-icon"
      onClick={onLogout}
      style={{ border: "none" }}
    >
      <svg
        id="icon-logout"
        xmlns="http://www.w3.org/2000/svg"
        className="text-danger"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1={21} y1={12} x2={9} y2={12} />
      </svg>
      <span className="ml-2">Wyloguj </span>
    </button>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));
