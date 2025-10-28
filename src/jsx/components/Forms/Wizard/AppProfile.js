import React, { Fragment, useState } from "react";
// import { Button, Dropdown, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { SRLWrapper } from "simple-react-lightbox";
//** Import Image */
// import profile01 from "../../../../images/profile/1.jpg";
// import profile02 from "../../../../images/profile/2.jpg";
// import profile03 from "../../../../images/profile/3.jpg";
// import profile04 from "../../../../images/profile/4.jpg";
// import profile05 from "../../../../images/profile/5.jpg";
// import profile06 from "../../../../images/profile/6.jpg";
// import profile07 from "../../../../images/profile/7.jpg";
// import profile08 from "../../../../images/profile/8.jpg";
// import profile09 from "../../../../images/profile/9.jpg";
import profile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";

const AppProfile = () => {
  // const [activeToggle, setActiveToggle] = useState("posts");
  // const [sendMessage, setSendMessage] = useState(false);
  // const [postModal, setPostModal] = useState(false);
  // const [cameraModal, setCameraModal] = useState(false);
  // const [linkModal, setLinkModal] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  // const [replayModal, setReplayModal] = useState(false);

  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Profil" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
                <div className="cover-photo"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">
                      {user.user.name} {user.user.surname}
                    </h4>
                    <p>Administrator</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{user.user.email}</h4>
                    <p>Email</p>
                  </div>
                  {/* <Dropdown className="dropdown ml-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-user-circle text-primary mr-2" />
                        View profile
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary mr-2" />
                        Add to close friends
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary mr-2" />
                        Add to group
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-ban text-primary mr-2" />
                        Block
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
