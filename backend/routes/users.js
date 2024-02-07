const express = require('express');
const router = express.Router();
// import bcrypt module
const bcrypt = require("bcrypt");
// import multer module
const multer = require('multer');
// import jsonwebtoken module
const jwt = require('jsonwebtoken');

// Session Configuration
const secretKey = 'your-secret-key';
// import express-session module
const session = require('express-session');
router.use(session({
   secret: secretKey,
}));

const User = require("../models/user.js");

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
    }
const storageConfig = multer.diskStorage({
      // destination
      destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
      error = null;
      }
      cb(null, 'backend/images')
      },
      filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const extension = MIME_TYPE[file.mimetype];
      const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
      cb(null, imgName);
      }
});


// Business Logic : Login User
router.post("/users/login", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Login User", req.body);
    // if (!validateEmail(req.body.email)) {
    //   res.json({ msg: "format email is invalid" });
    // } else {
    //   let findedUser = users.find((obj) => {
    //     return obj.email == req.body.email;
    //   });
    //   if (!findedUser) {
    //     res.json({ msg: "please check your email" });
    //   } else {
    //     if (findedUser.pwd != req.body.pwd) {
    //       res.json({ msg: "please check your pwd" });
    //     } else {
    //       res.json({ msg: "welcome" });
    //     }
    //   }
    // }
    let user;
    User.findOne({ email: req.body.email })
      .then((findedUser) => {
        console.log("here findedUser", findedUser);
        if (!findedUser) {
          // return
          return res.json({ msg: "please check your Email" });
        } else {
          user = findedUser;
          return bcrypt.compare(req.body.pwd, findedUser.pwd);
          // bcrypt.compare(req.body.pwd , findedUser.pwd).then((pwdResult) => {
          //   console.log("here pwd Result", pwdResult);
          // });
        }
      })
      .then((cryptedPwd) => {
        console.log("Here crypted pwd", cryptedPwd);
        if (!cryptedPwd) {
          return res.json({ msg: "please check your pwd" });
        } else {
          let userToSend = {
            id: user._id,
            fName: user.firstName,
            lName: user.lastName,
            role: user.role,
          };
          const token = jwt.sign(userToSend, secretKey, { expiresIn:'1h' });
          res.json({ msg: "Welcome", token: token});
        }
      });
  });
  // Business Logic : Signup User
  router.post("/users/signup", multer({ storage: storageConfig }).single('img'),(req, res) => {
    // traitement de la requete
    console.log("Here into BL : Signup", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
      console.log("Here crypted pwd", cryptedPwd);
      req.body.pwd = cryptedPwd;
      req.body.avatar = `http://localhost:3000/files/${req.file.filename}`
      let userObj = new User(req.body);
      userObj.save((err, doc) => {
        console.log("error", err);
        (err)
          ? res.json({ msg: "Error" })
          : res.json({ msg: "added successfully" });
      });
    // let user = req.body;
    // if (!validateEmail(user.email)) {
    //   res.json({ msg: "Invalid Email Format" });
    // } else {
    //   let findedUser = users.find((obj) => {
    //     return obj.email == user.email;
    //   });
    // }
    // if (findedUser) {
    //   res.json({ msg: "email existe deja" });
    // } else {
    //   user.id = generateId(users);
    //   users.push(user);
    //   res.json({ msg: "added with success" });
    // }
    });
  
  
  });
  // Business Logic : edit Profile
  // please check your pwd ==0
  // Edited successfully = 1
  router.put("/users", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Edit Profile", req.body);
    let user;
    User.findById(req.body.id)
      .then((doc) => {
        console.log("Here doc", doc);
        user = doc;
        return bcrypt.compare(req.body.oldPwd, doc.pwd);
      })
      .then((pwdResult) => {
        console.log("Here result compare", pwdResult);
        // (!pwdResult) ?  res.json({msg : "please check your pwd"}) :
        if (!pwdResult) {
          return res.json({ msg: "0" });
        } else {
          bcrypt.hash(req.body.newPwd, 8).then((cryptedPwd) => {
            console.log("Here crypted pwd", cryptedPwd);
            user.pwd = cryptedPwd;
            let newProfile = new User(user);
            User.updateOne({ _id: user._id }, newProfile).then((response) => {
              console.log("Here response after update", response);
              response.nModified == 1
                ? res.json({ msg: "1" })
                : res.json({ msg: "Error" });
            });
          });
        }
      });
  });
  // Business Logic : deleteUserByEmail
  router.delete("/users/:email", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Delete User By Id");
    let email = req.params.email;
    // let isFounded = false;
    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].email == email) {
    //     isFounded = true;
    //     users.splice(i, 1);
    //     break;
    //   }
    // }
    // if (isFounded) {
    //   res.json({ msg: "deleted with success" });
    // } else {
    //   res.json({ msg: "Not Found" });
    // }
    User.deleteOne({ email: email }).then((response) => {
      console.log("Here response after delete", response);
      response.deletedCount == 1
        ? res.json({ msg: "Deleted successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : displayAllUsers
  router.get("/users", (req, res) => {
    console.log("Here into BL : Display all users");
    User.find().then((docs) => {
      res.json({ usersTab: docs });
    });
  });
  // Business Logic : getUserById
router.get("/users/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get user By Id");
    let id = req.params.id;
    User.findById(id).then((doc) => {
      res.json({ findedUser: doc });
    });
  });


                          //*******Export express App (to be importable from another files)*********//  
module.exports = router;