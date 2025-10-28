import React, { Fragment } from "react";
import profile from "../../../../images/profile/tlo_admin.jpg";
import PageTitle from "../../../layouts/PageTitle";

const AppProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <Fragment>
      <PageTitle activeMenu="Profil administratora" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
                <div className="cover-photo"></div>
              </div>
              <div className="profile-info">
                <div style={{ paddingTop: "35px" }} className="profile-photo">
                  <img
                    width={57}
                    height={57}
                    src={profile}
                    className="rounded-circle"
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
