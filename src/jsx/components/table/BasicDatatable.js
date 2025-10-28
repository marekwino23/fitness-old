import { Link } from "react-router-dom";

const BasicDatatable = () => {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Wszyscy trenerzy</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div id="job_data" className="dataTables_wrapper ">
              <table
                className="display w-100 dataTable "
                id="example5"
                role="grid"
                aria-describedby="example5_info"
              >
                <thead>
                  <tr role="row">
                    <th className="sorting_asc" style={{ width: "177px" }}>
                      Imie
                    </th>
                    <th className="sorting" style={{ width: "278px" }}>
                      Nazwisko
                    </th>
                    <th className="sorting" style={{ width: "46px" }}>
                      Wiek
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="odd" role="row">
                    <td className="sorting_1">Airi Satou</td>
                    <td>Accountant</td>
                    <td>33</td>
                  </tr>
                </tbody>
                {/* <tfoot>
                  <tr>
                    <th rowSpan="1" colSpan="1">
                      Name
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Position
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Office
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Age
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Start date
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Salary
                    </th>
                  </tr>
                </tfoot> */}
              </table>
              <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                <div className="dataTables_info"></div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="example5_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to="/table-datatable-basic"
                    // onClick={() =>
                    //   activePag.current > 0 && onClick(activePag.current - 1)
                    // }
                  >
                    Previous
                  </Link>
                  <span>
                    {/* {paggination.map((number, i) => (
                      <Link
                        key={i}
                        to="/table-datatable-basic"
                        className={`paginate_button  ${
                          activePag.current === i ? "current" : ""
                        } `}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))} */}
                  </span>
                  <Link
                    className="paginate_button next"
                    to="/table-datatable-basic"
                    // onClick={() =>
                    //   activePag.current + 1 < paggination.length &&
                    //   onClick(activePag.current + 1)
                    // }
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDatatable;
