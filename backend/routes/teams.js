const express = require('express');
const router = express.Router();

const Team = require("../models/team");


// Business Logic : getAllTeams
router.get("/teams", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get all teams");
    // res.json({ teamsTab: teams });
    Team.find().then((docs) => {
      res.json({ teamsTab: docs });
    });
  });
  // Business Logic : addTeam
  router.post("/teams", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Add Team", req.body);
    let teamObj = new Team(req.body);
    teamObj.save((err,doc) => {
      if (err) {
        res.json({ msg: "error"});
      } else {
        res.json({ msg: "added successfully" });
      }
    });
    // let obj = req.body
    // teams.push(obj);
    // res.json({ msg: "added successfully" });
  });
  // Business Logic : editTeam
  router.put("/teams", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Edit Team");
    let newTeam = req.body;
    // for (let i = 0; i < teams.length; i++) {
    //   if (teams[i].id == newTeam.id) {
    //     teams[i] = newTeam;
    //     break;
    //   }
    // }
    // res.json({ msg: "Edited with Success" });
    Team.updateOne({ _id: newTeam._id }, newTeam).then((response) => {
      console.log("Here response after update", response);
      response.nModified == 1
        ? res.json({ msg: "Edited successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : deleteTeamById
  router.delete("/teams/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Delete team By Id");
    let id = req.params.id;
    // let isFounded = false;
    // for (let i = 0; i < teams.length; i++) {
    //   if (teams[i].id == id) {
    //     isFounded = true;
    //     teams.splice(i, 1);
    //     break;
    //   }
    // }
    // if (isFounded) {
    //   res.json({ msg: "deleted with success" });
    // } else {
    //   res.json({ msg: "Not Found" });
    // }
    Team.deleteOne({ _id: id }).then((response) => {
      console.log("Here response after delete", response);
      response.deletedCount == 1
        ? res.json({ msg: "Deleted successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : getTeamById
  router.get("/teams/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get team By Id");
    let id = req.params.id;
    // let findedTeam = teams.find((obj) => {
    //   return obj.id == id;
    // });
    // res.json({ team: findedTeam });
    Team.findOne({ _id: id }).then((doc) => {
      res.json({ team: doc });
    });
  });
  // Business Logic : getTeamById
  router.get("/teams/:teamId/players", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get all team players");
    try {
      Team.findById(req.params.teamId)
        .populate("players")
        .then((team) => {
      if (!team) {
          return res.status(404).json({ message: "Team not found" });
      }
      res.json({team : team});
    });
    } catch (error) {}
  });
  // Business Logic : search Team by stadium Name
  router.post("/teams/searchByStadiumName", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get Stadium By Stadium Name", req.body);
    let stadium = stadiums.find((obj) => {
      return obj.name == req.body.name;
    });
    if (!stadium) {
      res.json({ msg: "Stadium Not Found" });
    } else {
      let findedTeam = teams.find((obj) => {
        return obj.stadiumId == stadium.id;
      });
      res.json({ findedstadium: stadium, team: findedTeam });
    }
  });
  // Business Logic : search Team by stadium Name
  router.post("/teams/search", (req, res) => {
    console.log("Here into BL : Search team", req.body);
    Team.find({ stadium: req.body.stadium }).then((docs) => {
      res.json({ data: docs });
    });
  });

  // Business Logic : getAllStadiums
router.get("/stadiums", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get all matches");
    res.json({ StadiumsTab: stadiums });
  });
  // Business Logic : addStadium
  router.post("/stadiums", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Add match", req.body);
    let obj = req.body;
    obj.id = generateId(stadiums);
    stadiums.push(obj);
    res.json({ msg: "added successfully" });
  });
  // Business Logic : get Stadium by Stadium name
  router.post("/teams/searchByStadiumName", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get Stadium By Stadium Name", req.body);
    let stadium = stadiums.find((obj) => {
      return obj.name == req.body.name;
    });
    if (!stadium) {
      res.json({ msg: "Stadium Not Found" });
    } else {
      let findedTeam = teams.find((obj) => {
        return obj.stadiumId == stadium.id;
      });
      res.json({ findedstadium: stadium, team: findedTeam });
    }
  });
  module.exports = router;