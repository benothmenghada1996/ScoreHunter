const express = require('express');
const router = express.Router();


//*******Models Importation*********// 
const Match = require("../models/match");
// Business Logic : getAllMatches
router.get("/matches", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get all matches");
    Match.find().then((docs) => {
      res.json({ matchesTab: docs });
    });
  });
  // Business Logic : addMatch
  router.post("/matches", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Add match", req.body);
    let matchObj = new Match(req.body);
    // if frontend object attributes does not mutch schema attributes
    // let matchObj = new Match({
    //   scoreOne : req.body.s1,
    //   scoreTwo : req.body.s2,
    //   teamOne : req.body.t1,
    //   teamTwo : req.body.t2,
    // });
    matchObj.save();
    res.json({ msg: "added successfully" });
    // obj.id = generateId(matches);
    // matches.push(obj);
  });
  // Business Logic : editMatch
  router.put("/matches", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Edit match", req.body);
    // let newMatch = req.body;
    // for (let i = 0; i < matches.length; i++) {
    //   if (matches[i].id == newMatch.id) {
    //     matches[i] = newMatch;
    //     break;
    //   }
    // }
    // res.json({ msg: "Edited with Success" });
    let newMatch = req.body;
    Match.updateOne({ _id: newMatch._id }, newMatch).then((response) => {
      console.log("Here response after update", response);
      response.nModified == 1
        ? res.json({ msg: "Edited successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : deleteMatchById
  router.delete("/matches/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Delete match By Id", req.params.id);
    let id = req.params.id;
    // let isFounded = false;
    // for (let i = 0; i < matches.length; i++) {
    //   if (matches[i].id == id) {
    //     isFounded = true;
    //     matches.splice(i, 1);
    //     break;
    //   }
    // }
    // if (isFounded) {
    //   res.json({ msg: "deleted with success" });
    // } else {
    //   res.json({ msg: "Not Found" });
    // }
    Match.deleteOne({ _id: id }).then((response) => {
      console.log("Here response after delete", response);
      // if (response.deletedCount == 1){
      //   res.json({ msg: "Deleted successfully" });
      // }
      // else{
      //   res.json({ msg: "Error" });
      //   }
      response.deletedCount == 1
        ? res.json({ msg: "Deleted successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : getMatchById
  router.get("/matches/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get matche By Id", req.params.id);
    Match.findOne({ _id: req.params.id }).then((doc) => {
      res.json({ match: doc });
    });
    // let findedMatch = matches.find((obj) => {
    //   return obj.id == req.params.id;
    // });
    // res.json({ match: findedMatch });
  });
  // Business Logic : Search matches by scores
  router.post("/matches/search", (req, res) => {
    console.log("Here into BL : Search matches", req.body);
    Match.find({ scoreOne: req.body.scoreOne, scoreTwo: req.body.scoreTwo }).then(
      (docs) => {
        res.json({ data: docs });
      }
    );
  });
  
  module.exports = router;