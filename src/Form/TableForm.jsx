import React from "react";
import { connect } from "react-redux";

const TableForm = ({ students, searchString, dispatch }) => {
  const handleDelete = (key) => {
    const action = {
      type: "HANDLE_DELETE",
      payload: key,
    };
    dispatch(action);
  };

  const handleEdit = (values) => {
    const action = {
      type: "HANDLE_EDIT",
      payload: values,
    };
    dispatch(action);
    const disabled = {
      type: "HANDLE_DISABLE",
      payload: null,
    };
    dispatch(disabled);
  };

  const handleInput = (e) => {
    let searchString = e.target.value;
    const action = {
      type: "search",
      payload: searchString,
    };
    dispatch(action);
  };

  let studentsArray = null;
  if (students.length && searchString) {
    studentsArray = students.filter((student) =>
      student.key.includes(searchString)
    );
  } else {
    studentsArray = [...students];
  }

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="row mb-3">
        <div className="col">
          <div>
            <h3 className="my-3">Tìm kiếm sinh viên theo mã</h3>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã sinh viên"
                onChange={handleInput}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="btnSearch"
                >
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th style={{ backgroundColor: "lightgray" }}>Mã SV</th>
            <th style={{ backgroundColor: "lightgray" }}>Họ Tên</th>
            <th style={{ backgroundColor: "lightgray" }}>Số điện thoại</th>
            <th style={{ backgroundColor: "lightgray" }}>Email</th>
            <th style={{ backgroundColor: "lightgray" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsArray.length > 0 &&
            studentsArray.map((student, index) => {
              const rowColor = index % 2 === 0 ? "white" : "lightblue";

              return (
                <tr key={student.key} style={{ backgroundColor: rowColor }}>
                  <td>{student.key}</td>
                  <td>{student.name}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        handleEdit(student);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(student.key);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
  searchString: state.searchString,
});

export default connect(mapStateToProps)(TableForm);
