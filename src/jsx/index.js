import React, { useState } from 'react'
/// React router dom
import {Switch, Route } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

/// Layout
import Nav from './layouts/nav'
import Footer from "./layouts/Footer";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import TrainersForm from "./components/Forms/Wizard/AddTrainers";
import Trainers from "./components/Forms/Wizard/Trainers";
import CustomersForm from "./components/Forms/Wizard/AddCustomers";
import Customers from "./components/Forms/Wizard/Customers";
import Resources from "./components/Forms/Wizard/Resources";

//Scroll To Top
import ScrollToTop from "./layouts/ScrollToTop";
import GetExcercises from "./components/Forms/Wizard/GetExcercises";
import CustomerProfile from "./components/Forms/Wizard/CustomerProfile";
import TrainerProfile from "./components/Forms/Wizard/TrainerProfile";
import TrainingPlan from "./components/Forms/Wizard/TrainingPlan";
import Home from "./components/Dashboard/Home";
import EditCustomer from "./components/Forms/Wizard/EditCustomer";
import EditTrainers from "./components/Forms/Wizard/EditTrainers";
import ResourceProfile from "./components/Forms/Wizard/ResourceProfile";
import GenerateTraining from "./components/Forms/Wizard/GenerateTraining";
import TrainingExercises from "./components/Forms/Wizard/TrainingExercises";
import CreatePdf from "./components/Forms/Wizard/CreatePdf";
import Register from "./pages/Registration";

const Markup = () => {
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");
  const [activeEvent, setActiveEvent] = useState(!path);

  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },

    /// Form
    { url: "trainers", component: Trainers },
    { url: "page-register", component: Register },
    { url: "add-trainers", component: TrainersForm },
    { url: "customers", component: Customers },
    { url: "resources", component: Resources },
    { url: "excercises", component: GetExcercises },
    { url: "add-customers", component: CustomersForm },
    { url: "generate-training", component: GenerateTraining },
    { url: "edit-customer/:id", component: EditCustomer },
    { url: "customer-profile/edit-customer/:id", component: EditCustomer },
    { url: "edit-trainer/:id", component: EditTrainers },
    { url: "trainer-profile/edit-trainer/:id", component: EditTrainers },
    { url: "calendar", component: Calendar },
    { url: "app-profile", component: AppProfile },
    { url: "customer-profile/:id", component: CustomerProfile },
    { url: "training-plan/createPdf/:id", component: CreatePdf },
    { url: "training-plan/:id", component: TrainingPlan },
    { url: "customer-profile/training-plan/:id", component: TrainingPlan },
    { url: "training-exercises/:id", component: TrainingExercises },
    {
      url: "customer-profile/training-exercises/:id",
      component: TrainingExercises,
    },
    { url: "training-plan/resource/:id", component: ResourceProfile },
    { url: "training-exercises/resource/:id", component: ResourceProfile },
    { url: "trainer-profile/:id", component: TrainerProfile },
  ];

  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}`}
      >
        {!pagePath && (
          <Nav
            onClick={() => setActiveEvent(!activeEvent)}
            activeEvent={activeEvent}
            onClick2={() => setActiveEvent(false)}
            onClick3={() => setActiveEvent(true)}
          />
        )}
        <div
          className={` ${!path && activeEvent ? "rightside-event" : ""} ${
            !pagePath ? "content-body" : ""
          }`}
        >
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup
