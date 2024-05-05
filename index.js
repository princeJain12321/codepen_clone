// const express= require('express')
// const mysql =require('mysql')
// const cors= require('cors')

// const app=express()
// app.use(cors());
// app.use(express.json());

// constdb=mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password:'',
//     database:'login_sample_db'
// })

// app.post('/signup',(req,res)=>{
//     const sql="INSERT INTO users('name', 'email', 'password')Values(?)";
//     const values=[
//         req.body.name,
//         req.body.email,
//         req.body.password,
//     ]
//     db.query(sql,[values],(err,data)=>{
//         if(err)return res.json(err);
//         return res.json(data);
//     })
// })


// app.listen(8080,()=>{
//     console.log("listening")
// })


const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {  console.log("server is running on port 3001");
});

//mysql database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "", //if u have set xampp password please enter it here
  database: "adminpanel_new",
});

// app.get("/api/get", (req, res) => {
//   const sqlGet = "SELECT * FROM products";
//   db.query(sqlGet, (error, result) => {
//     res.send(result);
//   });
// });
// app.get("/api/getOrder", (req, res) => {
//   const sqlGet = "  SELECT o.*,u.email,u.username,p.title FROM orders as o left join users as u on o.user_id=u.id left join products as p on o.product_id=p.id";
// //  const sqlGet=" Select * from orders;"
//   db.query(sqlGet, (error, result) => {
//     res.send(result);
//   });
// });

// app.get("/api/get/:id", (req, res) => {
//   const { id } = req.params;
//   const sqlGet = "SELECT * FROM products where id = ?";
//   db.query(sqlGet, id, (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });

// app.put("/api/update/:id", (req, res) => {
//   const { id } = req.params;
//   const { title, description, price, url } = req.body;
//   const sqlUpdate =
//     "UPDATE products SET title = ?,description = ?,price = ?, url = ? WHERE id = ?";
//   db.query(sqlUpdate, [title, description, price, url, id], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(result);
//   });
// });

// app.post("/api/post", (req, res) => {
//   const { title, description, price, url } = req.body;
//   const sqlInsert =
//     "INSERT INTO products(title,description,price,url) VALUES (?,?,?,?)";
//   db.query(sqlInsert, [title, description, price, url], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

// // app.delete("/api/remove/:id", (req, res) => {
// //   const { id } = req.params;
// //   const sqlRemove = "DELETE FROM products WHERE id = ?";
// //   db.query(sqlRemove, id, (error, result) => {
// //     if (error) {
// //       console.log(error);
// //     }
// //   });
// // });

// app.get("/", (req, res) => {
//   // const sqlInsert = "INSERT INTO products (title,description,price,url) VALUES ('shoes','mustbuyjlj','500','https.lol.com')";
//   // db.query(sqlInsert,(error,result) => {
//   //     console.log("error",error);
//   //     console.log("result",result);
//   res.send("Hello Express");

//   // })
// });

// app.get("/dss", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO orders(UserId,FirstName,LastName,ProductName,price)VALUES('12','Devika','kadam','shoes','2000');";
//   db.query(sqlInsert, (error, result) => {
//     console.log("error", error);
//     console.log("result", result);
//     res.send("Hello Express");
//   });
// });

// routes to the server that will register a user.
app.post("/register", (req, res) => {
  //we need to get variables sent from the form
  const sentemail = req.body.Email;
  const sentUsername = req.body.Username;
  const sentpassword = req.body.password;
console.log("KK")
  // creating sql statemet to insert the user to  the db
  const SQL = " INSERT INTO users(email,username,password)VALUES(?,?,?)";

  const Values = [sentemail, sentUsername, sentpassword];
  //query to excute the sql statement
  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("user inserted successful");
      res.send({ message: "user added" });
      //user has not been submitted ,we need to use express
    }
  });
});
app.post("/login", (req, res) => {
  console.log(req.body);
  //we need to get varisbles sent from the form
  // const sentemail = req.body.Email;
  const sentloginEmail = req.body.Email;
  const sentloginpassword = req.body.password;

  // creating sql statemet to insert the user to  the db
  const SQL = "SELECT * FROM users WHERE Email = ? && password= ?";

  const Values = [sentloginEmail, sentloginpassword];
  //query to excute the sql statement
  db.query(SQL, Values, (err, results) => {
    if (err) {
      console.log("teju");
      res.send({ error: err });
    } else if (results.length > 0) {
      console.log(results[0]);
      const token = jwt.sign({ user: results[0] }, "teju");
      res.json({ data: results[0], token });
    } else {
      console.log("qwerty");
      res.send({ message: "Credentials don't match" });
    }
  });
});
// app.post("/otpValidation",(req,res)=>{
//   console.log(req.body);
//   //we need to get varisbles sent from the form
//   // const sentemail = req.body.Email;
//   const sentloginEmail = req.body.Email;
//   const sentloginpassword = req.body.password;
//   console.log("eee");
//   // creating sql statemet to insert the user to  the db
//   // const SQL = "SELECT * FROM users WHERE Email = ? && password= ?";

// })