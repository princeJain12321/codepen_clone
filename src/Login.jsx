import React, { useState, useEffect } from "react";
import "./components/Login.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { omit } from "lodash";
const Login = () => {
  //usestate to store inputs
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const navigateTo = useNavigate();
  //let us now showthe message to user
  const [loginStatus, setloginStatus] = useState();
  const [statusholder, setstatusholder] = useState("message");
  // const navigateTo = useNavigate;
  const Otp = (event) => {
    event.preventDefault();
    // toast.success("OTP sent Successfully");
    alert("Otp sent successfully");
  };
  const loginUser = (e) => {
    //lets prevent submitting
    e.preventDefault();
    //axios to create an Api to connect server
    let list = Object.keys(values);
    let err = Object.keys(errors);
    list.map((item) => {
      validate(item, values[item]);
    });
    if (list.length < 1 || err.length > 0) {
      alert("Please enter required details");
    } else {
      // const user = {
      //   loginEmail,
      //   loginPassword,
      // };
      // console.log(user);
      // disptach(registerUser(user));

      Axios.post("http://localhost:3002/login", {
        //create variables to send to the server through the route
        Email: loginEmail,
        password: loginPassword,
      }).then((response) => {
        console.log(response);
        //catching response 1st,data successfully done to db , if error credentials are wrong
        if (response.data.message || loginEmail == "" || loginPassword == "") {
          setloginStatus("credentials doesnt exist");
        } else {
          alert("Login Successfully");
          navigateTo("/codepen");
          <navigate>'/dashboard'</navigate>; //if credentials match navigate to db
        }
      });
      // }
    }

    const otp = "123456";
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setstatusholder("showMessage"); //show mesage
      setTimeout(() => {
        setstatusholder("message"); //hide message
      }, 4000);
    }
  }, [loginStatus]);

  //
  const handleChange = (event) => {
    event.persist();
    let name = event.target.name;
    let val = event.target.value;
    // console.log("acb", name, val);
    validate(name, val);
    setValues({
      ...values,
      [name]: val,
    });
  };

  const validate = (name, value) => {
    switch (name) {
      case "loginEmail":
        if (!value || value === null) {
          setErrors({
            ...errors,
            loginEmail: "Please Enter your email.",
          });
        } else if (
          !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value)
        ) {
          setErrors({
            ...errors,
            loginEmail: "Invalid Email.",
          });
        } else {
          let newObj = omit(errors, "loginEmail");
          setErrors(newObj);
        }
        break;

      case "loginPassword":
        if (!value || value === null) {
          setErrors({
            ...errors,
            loginPassword: "Please Enter your password.",
          });
        } else if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(value)) {
          setErrors({
            ...errors,
            loginPassword: "Invalid password.",
          });
        } else {
          let newObj = omit(errors, "loginPassword");
          setErrors(newObj);
        }
        break;

      // case "otpValue":
      // if (!value || value === null) {
      //   setErrors({
      //     ...errors,
      //     loginEmail: "Please Enter your email.",
      //   });
      // } else if (
      //   !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value)
      // ) {
      //   setErrors({
      //     ...errors,
      //     loginEmail: "Invalid Email.",
      //   });
      // } else {
      //   let newObj = omit(errors, "loginEmail");
      //   setErrors(newObj);
      // }
      // break;
    }
  };

  /// clearing form submit

  // const onsubmit = () => {
  //   setloginEmail("");
  //   setloginPassword("");
  // };
  return (
    <div style={{ flex: 1 ,backgroundColor:'lightblue'}}>
      <div className="loginPage flex">
        <div className="container flex  mr-auto ">
          <form action="" className="form grid" onSubmit={onsubmit}>
            <label className="raj">
              <center>
                <h1>Login</h1>
              </center>
            </label>
            <span className={statusholder}>{loginStatus}</span>
            <div className="inputDiv">
              <label className="rajshree" htmlFor="Email">
                Email
              </label>
              <div className="inputflex">
                <input
                  type="text"
                  id="email"
                  name="loginEmail"
                  value={loginEmail}
                  placeholder="Enter Email"
                  onChange={(event) => {
                    handleChange(event);
                    setloginEmail(event.target.value);
                  }}
                ></input>
                {errors.loginEmail && (
                  <p data-testid="validate-email" className="text-danger">
                    {errors.loginEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="inputDiv">
              <label className="rajshree" htmlFor="password">
                Password
              </label>
              <div className="inputflex">
                <input
                  type="password"
                  id="password"
                  name="loginPassword"
                  value={loginPassword}
                  placeholder="Enter Password"
                  onChange={(event) => {
                    handleChange(event);
                    setloginPassword(event.target.value);
                  }}
                ></input>
                {errors.loginPassword && (
                  <p className="text-danger" data-testid="validate-password">
                    {errors.loginPassword}
                  </p>
                )}
              </div>
            </div>

            {/* <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                type="submit"
                className="btn  btn-outline-primary flex inputlogin"
                onClick={Otp}
                style={{ height: "40px", width: "80px", marginTop: "8px" }}
              >
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Enter Otp
                </span>
              </button>

              <input
                type="text"
                style={{ width: "50%", marginLeft: "20px", height: "40px" }}
                maxLength="6"
              ></input>
            </div> */}

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <center>
              <button
                type="submit"
                className="btn  btn-outline-primary flex inputlogin"
                onClick={loginUser}
              >
                <span>Login</span>
              </button></center>
              {/* <div className="footerDiv flex-wrap">
                <span className="text">Don't have an account</span>
                <Link to={"/register"} className="signupbtn">
                  <button className="btn  btn-outline-primary flex inputlogin">
                    Signup
                  </button>
                </Link>
                
              </div> */}

            </div>
            
            <br></br>
              
            <span className="text">Don't have an account? Register <a href="/register">here.</a></span> <br></br>
            <span className="text">Forgot Pasword <a href="/ForgotPswd">here.</a></span> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

