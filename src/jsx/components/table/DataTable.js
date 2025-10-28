import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import BasicDatatable from "./BasicDatatable";

const DataTable = (data) => {
  console.log(data);
  return (
    <Fragment>
      <PageTitle activeMenu="Datatable" motherMenu="Table" />
      <div className="row">
        <BasicDatatable></BasicDatatable>
        {/* <SimpleDataTable></SimpleDataTable>
            <ProfileDatatable></ProfileDatatable>
            <FeesCollection></FeesCollection>
            <PatientTable></PatientTable> */}
      </div>
    </Fragment>
  );
};

export default DataTable;
