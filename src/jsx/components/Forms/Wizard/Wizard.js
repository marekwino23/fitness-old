import React, { Fragment } from "react";

// import WizardForm from "../Wizard/StepOne";
import PageTitle from "../../../layouts/PageTitle";

const Wizard = () => {
  return (
    <Fragment>
      <PageTitle activeMenu="Wizard" motherMenu="Home" />

      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Form step</h4>
            </div>
            <div className="card-body">
              <form
                onSubmit={(e) => e.preventDefault()}
                id="step-form-horizontal"
                className="step-form-horizontal"
              >
                {/* <WizardForm
                showNavigation={true}
                steps={steps}
                prevStyle={prevStyle}
                nextStyle={nextStyle}
                /> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Wizard;
