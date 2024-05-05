import React, { useState } from "react";
import "./Register.css";
// import video from
import { Link, useNavigate } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
import Axios from "axios";
import { omit } from "lodash";
// import { BsFillShieldLockFill } from "react-icons/Bs";
const Register = () => {
  //usestate to hold our inputs
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigateTo = useNavigate();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
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
      case "username":
        if (value.trim().length === 0) {
          setErrors({
            ...errors,
            username: "Please enter the First Name.",
          });
        } else if (!/^[A-Z a-z]+$/.test(value)) {
          setErrors({
            ...errors,
            username: "Only characters are allowed.",
          });
        } else if (value.length > 10) {
          setErrors({
            ...errors,
            username: "Max allowed characters are 10.",
          });
        } else {
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;

      case "email":
        if (!value || value === null) {
          setErrors({
            ...errors,
            email: "Please Enter your email.",
          });
        } else if (
          !/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value)
        ) {
          setErrors({
            ...errors,
            email: "Invalid Email.",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "password":
        if (!value || value === null) {
          setErrors({
            ...errors,
            password: "Please Enter your password.",
          });
        } else if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(value)) {
          setErrors({
            ...errors,
            password: "Invalid password.",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
    }
  };

  //onclick let the user entered
  const createUser = (e) => {
    e.preventDefault();
    //axios to create an Api to connect server
    Axios.post("http://localhost:3002/register", {
      //create variables to send to the server through the route
      Email: email,
      Username: username,
      password: password,
    }).then((response) => {
      console.log("teju");
      console.log("user has been created");
      //on registered
      
      navigateTo("/");
      //clearing the fields
      setemail("");
      setusername("");
      setpassword("");
    });
    // function register() {
    let list = Object.keys(values);

    let err = Object.keys(errors);
    if (list.length < 2 || err.length > 0) {
      alert("Please enter required details");
    } else {
      const user = {
        username,
        email,
        password,
      };
      console.log(user);
      list.map((item) => {
        validate(item, values[item]);
      });
      // disptach(registerUser(user));
      alert("registered successfully");
      // }
    }
  };

  return (
    <div  style={{backgroundColor:'lightblue', paddingBottom:"50px"}}>

<div className="RegisterPage flex" >
      <div className="container flex">
        {/* <div className="footerDiv flex">
          <span className="text">Have an account</span>
          <Link to={"/register"}>
            <button className="btn">Login</button>
          </Link>
        </div> */}
        {/* <div className="formDiv flex"> */}
        <form action="" className="form grid">

        <label className="k" ><h1>Signup</h1></label>
          <div className="inputDiv">
            <label  className="kl" htmlFor="email">Email</label>
            <div className="inputflex">
              {/* <FaUserShield className="icon" /> */}
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Email"
                onChange={(event) => {
                  handleChange(event);
                  setemail(event.target.value);
                }}
              ></input>
              {errors.email && (
                <p data-testid="validate-email" className="text-danger">
                  {errors.email}
                  {/* please enter email */}
                </p>
              )}
            </div>
          </div>

          <div className="inputDiv">
          
          
            <label className="kl" htmlFor="username">Username</label>
            <div className="inputflex">
              {/* <FaUserShield className="icon" /> */}
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Enter Username"
                onChange={(event) => {
                  handleChange(event);
                  setusername(event.target.value);
                }}
              ></input>
              {errors.username && (
                <p
                  data-testid="validate-name"
                  id="namefirst"
                  className="text-danger inline-block"
                >
                  {errors.username}
                </p>
              )}
            </div>
          </div>

          <div className="inputDiv">
            <label className="kl" htmlFor="password">Password</label>
            <div className="inputflex">
              {/* <BsFillshieldLockFill className="icon" /> */}
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter Password"
                onChange={(event) => {
                  handleChange(event);
                  setpassword(event.target.value);
                }}
              ></input>
              {errors.password && (
                <p className="text-danger" data-testid="validate-password">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <center>
            <button type="submit"  className="btn btn-outline-primary flex inputlogin" onClick={createUser}>
              <span >Register</span>
            </button>
          </center>
          <span className="text">Already have an account?<a href="/">Login</a></span> 
          
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
