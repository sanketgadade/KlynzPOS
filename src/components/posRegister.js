import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import { postPosData } from "../AxiosAPI/clientPosData";
import Button from "@mui/material/Button";
import logo from "../images/BTlogo.png";

const PosRegister = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const SUPPORTED_FORMATS = [
    // "application/pdf",
    ".csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const formik = useFormik({
    initialValues: {
      // customerName: "",
      // customerEmail: "",
      customerPosFile: "",
    },
    validationSchema: Yup.object({
      // customerName: Yup.string().required("Name is required"),
      // customerEmail: Yup.string()
      //   .email("Please enter valid email")
      //   .required("Email is required"),
      customerPosFile: Yup.mixed()
        .required("File is required")
        .test(
          "fileType",
          "Only the following formats are accepted: .xlsx, .xls, .csv",
          (value) =>
            !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
    }),
    onSubmit: async (data, helpers) => {
      const formData = new FormData();
      formData.append("customerPosFile", data.customerPosFile);
      console.log(data);
      setisLoading(true);

      swal({
        // title: `Delete`,
        text: `Are you sure,You want to submit?`,
        icon: "success",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const res = await postPosData(data);

          if (res.status == 200) {
            swal({
              title: "Data Submitted Successfully",
              icon: "success",
              button: false,
              timer: 2000,
              // button: "Ok",
            });

            helpers.resetForm();
            setisLoading(false);
            // setIsRegister(true);
            window.setTimeout(() => window.location.reload(), 3000);
          } else {
            swal({
              title: "Something went wrong",
              icon: "error",
              button: false,
              timer: 2000,
              // button: "Ok",
            });
            setisLoading(false);
            window.location.reload();
          }
        } else {
          setisLoading(false);
        }
      });
    },
  });

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="App">
      <div id="bg-vid"></div>
      <div className="page-holder align-items-center py-4 bg-gray-100 vh-100">
        <div className="container">
          <div className="row align-items-center">
            <div className={"show col-lg-12 px-lg-4"}>
              <div className="card">
                <div className="card-header px-lg-5">
                  <div className="card-heading text-primary">
                    {/* Welcome to Klynz */}
                    <img src={logo} height="46px" />
                  </div>
                </div>
                <div className="card-body p-lg-5">
                  <h3 className="mb-4"> Upload POS Data </h3>
                  <p className="text-muted text-sm mb-5"></p>
                  <form id="loginForm" action="index.html">
                    {/* <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="custName"
                        type="text"
                        placeholder="Your name goes here"
                        value={formik.values.customerName}
                        onChange={formik.handleChange("customerName")}
                        name="customerName"
                        required
                      />
                      <label htmlFor="custName">Full Name</label>
                      <span style={{ color: "red", float: "left" }}>
                        {formik.errors.customerName}
                      </span>
                    </div> */}
                    <div className="form-floating mb-2">
                      <input
                        id="posFile"
                        type="file"
                        //defaultValue={formik.values.customerPosFile}
                        //value={formik.values.customerPosFile}
                        onChange={(event) =>
                          formik.setFieldValue(
                            "customerPosFile",
                            event.target.files[0]
                          )
                        }
                        // accept=".xlsx, .xls, .csv"
                        accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        required
                      />
                    </div>
                    {/* <span style={{ color: "Black" }}>
                      Please select files with CSV,Excel format.
                    </span> */}
                    <div className="form-floating mb-2">
                      <span style={{ color: "red" }}>
                        {formik.errors.customerPosFile}
                      </span>
                    </div>
                    {/* <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="custEmail"
                        type="email"
                        placeholder="Email"
                        value={formik.values.customerEmail}
                        onChange={formik.handleChange("customerEmail")}
                        name="customerEmail"
                        required
                      />
                      <label htmlFor="custEmail">Email</label>
                      <span style={{ color: "red", float: "left" }}>
                        {formik.errors.customerEmail}
                      </span>
                    </div> */}
                    <div>
                      {isLoading ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary"
                          type="button"
                          // onClick={formik.handleSubmit}
                          onClick={(event) => formik.handleSubmit(event)}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="card-footer px-lg-5 py-lg-4">
                  <div className="text-sm text-muted">
                    &copy; {new Date().getFullYear()} - BarTrac Services
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosRegister;
