                    //*******Module Importation*********//
// import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// // import express-session module
// const session = require('express-session');
// // import jsonwebtoken module
// const jwt = require('jsonwebtoken');
// // import axios module
// const axios = require('axios');
// // import multer module
// const multer = require('multer');
// // import path module
// const path = require('path');
// import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/sportDB");
// // import bcrypt module
// const bcrypt = require("bcrypt");

                    //*******Creation express Application*********//
// create express application
const app = express();

const UserRouter = require('./routes/users');
const MatchRouter = require('./routes/matches');
const PlayerRouter = require('./routes/players');
const TeamRouter = require('./routes/teams');

                    //*******Configuration**********//
// send JSON responses
app.use(bodyParser.json());
// Get object from Req
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  next();
});

// files : shortcut of backend/images
// app.use('/images', express.static(path.join('backend/images')))
// const MIME_TYPE = {
// 'image/png': 'png',
// 'image/jpeg': 'jpg',
// 'image/jpg': 'jpg'
// }
// const storageConfig = multer.diskStorage({
//   // destination
//   destination: (req, file, cb) => {
//   const isValid = MIME_TYPE[file.mimetype];
//   let error = new Error("Mime type is invalid");
//   if (isValid) {
//   error = null;
//   }
//   cb(null, 'backend/images')
//   },
//   filename: (req, file, cb) => {
//   const name = file.originalname.toLowerCase().split(' ').join('-');
//   const extension = MIME_TYPE[file.mimetype];
//   const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
//   extension;
//   cb(null, imgName);
//   }
// });

                   //*******Models Importation*********// 




// fonction pour générer l'id
// function generateId(T) {
//   let max;
//   if (T.length == 0) {
//     max = 0;
//   } else {
//     max = T[0].id;
//     for (let i = 1; i < T.length; i++) {
//       if (T[i].id > max) {
//         max = T[i].id;
//       }
//     }
//   }
//   return max + 1;
// }
// function validateEmail(email) {
//   let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//   return regexEmail.test(email);
// }

                   //*******Data Base Simulation*********// 
let matches = [
  { id: 1, team1: "Real", team2: "PSG", scoreOne: 3, scoreTwo: 3 },
  { id: 2, team1: "Barca", team2: "Inter", scoreOne: 6, scoreTwo: 2 },
  { id: 3, team1: "Milan", team2: "Inter", scoreOne: 2, scoreTwo: 0 },
];
let teams = [
  {
    id: "1",
    name: "Real",
    foundation: "1980",
    stadiumId: 2,
    Owner: "Med Salah",
  },
  {
    id: "2",
    name: "PSG",
    foundation: "1970",
    stadiumId: 1,
    Owner: "Med Salah",
  },
];
let stadiums = [
  { id: 1, name: "aguerbi", capacity: "60000", country: "Tunisia" },
  { id: 2, name: "saint-paris", capacity: "20000", country: "France" },
];
let players = [
  {
    id: "1",
    Name: "Cristiano",
    Number: "7",
    Age: "35",
    Position: "Attaquant",
    teamId: 2,
  },
  {
    id: "2",
    Name: "Messi",
    Number: "10",
    Age: "38",
    Position: "Attaquant",
    teamId: 1,
  },
  {
    id: "3",
    Name: "Salah",
    Number: "6",
    Age: "38",
    Position: "Attaquant",
    teamId: 1,
  },
];
let users = [
  {
    id: "1",
    firstName: "Ghada",
    lastName: "Ben Othmen",
    email: "ghada@gmail.com",
    pwd: "12345678",
  },
  {
    id: "2",
    firstName: "Amal",
    lastName: "Ben Jemaa",
    email: "amal@gmail.com",
    pwd: "32165498",
  },
];

                    //*******Business Logic*********// 


app.use('',UserRouter);
app.use('',MatchRouter);
app.use('',PlayerRouter);
app.use('',TeamRouter);







// Business Logic : Search Weather By City
app.post("/weather", (req, res) => {
  console.log("Here into BL : Search weather by city", req.body.city);
  let key = "438ce0b208c9cda6ffe0b796eb0f1184"
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}&units=metric`;
  axios.get(apiURL).then((weatherResult) => {
    let response = weatherResult.data.main;
    console.log("weather data", weatherResult);
    let weatherToSend = {
      temperature : response.temp,
      pression : response.pressure,
      humidity : response.humidity,
      windSpeed : weatherResult.data.wind.speed,
      icone : `https://openweathermap.org/img/wn/${weatherResult.data.weather[0].icon}@2x.png`,
    }
    res.json({response : weatherToSend})
  }); 
});



// Route pour récupérer l'heure pour une région donnée depuis OpenWeatherMap
app.get('/time/:region', async (req, res) => {
  try {
    const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Remplacez par votre clé API OpenWeatherMap
    const region = req.params.region;
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${OPENWEATHER_API_KEY}`);
    
    if (response.data && response.data.dt) {
      const timestamp = response.data.dt; // Timestamp UNIX
      const time = new Date(timestamp * 1000).toLocaleTimeString(); // Convertir le timestamp UNIX en heure locale

      res.json({ region, time });
    } else {
      res.status(404).json({ message: 'Impossible de récupérer l\'heure pour cette région.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'heure.' });
  }
});


// Route pour récupérer l'heure pour une région donnée depuis WorldTimeAPI
app.get('/time/:region', async (req, res) => {
  try {
    const region = req.params.region;
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/${region}`);
    const time = response.data.datetime;

    res.json({ region, time });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'heure.' });
  }
});









                        //*******Export express App (to be importable from another files)*********//  
module.exports = app;

//business logic calcule imc
// app.post("/imcs", (req, res) => {
//   //Traitement de la Req
//   //imc => instance de type Imc
//   let imc = new Imc(req.body);
//   imc.imc = imc.poids / ((imc.taille / 100) * (imc.taille / 100));
//   console.log("imc", imc);
//   //save() methode predefinie mongoose
//   imc.save((err, doc) => {
//       console.log("here err", err);
//       console.log("here doc", doc);
//       if (imc.imc <= 18.5) {
//           res.json({ msg: "insuffisance ponderale" });

//       } else if (imc.imc > 18.5 && imc.imc <= 25) {
//           res.json({ msg: "corpulence normale" });

//       }
//       else if (imc.imc > 25 && imc.imc <= 30) {
//           res.json({ msg: "Surpoids" });

//       }
//       else if (imc.imc > 30 && imc.imc <= 35) {
//           res.json({ msg: "besite modere" });
//       }
//       else if (imc.imc > 35 && imc.imc <= 40) {
//           res.json({ msg: "besite severe" });
//       }
//       else if (imc.imc > 40) {
//           res.json({ msg: "besite morbide et massive" });
//       }
//   });
//   // match.id = generateId(matchesTab);
//   // matchesTab.push(match);
// });
