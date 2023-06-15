import './BookingList.css'
function BookingList() {
  return <>
    <div className="row">
      <div className="ml-2 col-md-12">
        <div className="panel">
          <div className="panel-heading">
            <div className="row">
              <div className="col col-sm-3 col-xs-12">
                <h4 className="title">
                  Recent <span>Request</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="panel-body table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>PropertyName</th>
                  <th>Age</th>
                  <th>Job Title</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>dfgh</td>
                  <td>date</td>
                  <td>31</td>
                  <td> mimimi mimi message</td>
                  <td>Sinaai-Waas</td>
                  <td>
                    {/* <ul className="action-list">
                              <li>
                                <a href="#" data-tip="edit">
                                  <i className="fa fa-edit" />
                                </a>
                              </li>
                              <li>
                                <a href="#" data-tip="delete">
                                  <i className="fa fa-trash" />
                                </a>
                              </li>
                            </ul> */}
                    {/* {item.status == true && "pending"}
                    {item.status == false && "reject"} */}
                    Active
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
}
export default BookingList;