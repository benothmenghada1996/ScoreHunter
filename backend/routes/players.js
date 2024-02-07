const express = require('express');
const router = express.Router();

const Player = require("../models/player");


// Business Logic : getAllPlayers
router.get("/players", (req, res) => {
    console.log("Here into BL : Get all players");
    // res.json({ playersTab: players });
    Player.find().then((docs) => {
      res.json({ playersTab: docs });
    });
  });
  // Business Logic : addPlayer
  router.post("/players", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Add Player", req.body);
    // let playerObj = new Player(req.body);
    // playerObj.save((err,doc) => {
    //   if (doc) {
    //     res.json({ msg: "added successfully"});
    //   } else {
    //     res.json({ msg: "Error" });
    //   }
    // }
    // );
    // res.json({ msg: "added successfully" });
    try{
      // find team by ID
      Team.findById(req.body.teamId).then((team) => {
        if (!team) {
        return res.status(404).json({ msg: "Team not found" });
        }
        req.body.team = team._id
        const player = new Player(req.body);
        player.save((err, doc) => {
          team.players.push(player);
          team.save();
          res.status(201).json({msg:"done"});
        });
        });
    } catch (error) {
      console.log("Here error", error);
    }
  });
  // Business Logic : editPlayer
  router.put("/players", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Edit Player");
    let newPlayer = req.body;
    // for (let i = 0; i < players.length; i++) {
    //   if (players[i].id == newPlayer.id) {
    //     players[i] = newPlayer;
    //     break;
    //   }
    // }
    // res.json({ msg: "Edited with Success" });
    Player.updateOne({ _id: newPlayer._id }, newPlayer).then((response) => {
      console.log("Here response after update", response);
      response.nModified == 1
        ? res.json({ msg: "Edited successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : deletePlayerById
  router.delete("/players/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Delete player By Id");
    let id = req.params.id;
    // let isFounded = false;
    // for (let i = 0; i < players.length; i++) {
    //   if (players[i].id == id) {
    //     isFounded = true;
    //     players.splice(i, 1);
    //     break;
    //   }
    // }
    // if (isFounded) {
    //   res.json({ msg: "deleted with success" });
    // } else {
    //   res.json({ msg: "Not Found" });
    // }
    Player.deleteOne({ _id: id }).then((response) => {
      console.log("Here response after delete", response);
      response.deletedCount == 1
        ? res.json({ msg: "Deleted successfully" })
        : res.json({ msg: "Error" });
    });
  });
  // Business Logic : getPlayerById
  router.get("/players/:id", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get player By Id");
    let id = req.params.id;
    // let findedPlayer = players.find((obj) => {
    //   return obj.id == id;
    // });
    // res.json({ player: findedPlayer });
    Player.findOne({ _id: id }).then((doc) => {
      res.json({ player: doc });
    });
  });
  // Business Logic : get players by team name
  router.post("/players/searchByTeamName", (req, res) => {
    // traitement de la requete
    console.log("Here into BL : Get All Players By Team Id", req.body);
    let team = teams.find((obj) => {
      return obj.name == req.body.name;
    });
    if (!team) {
      res.json({ msg: "Team Not Found" });
    } else {
      let findedPlayers = players.filter((obj) => {
        return obj.teamId.toLowerCase() == team.id.toLowerCase();
      });
      res.json({ players: findedPlayers });
    }
  });


  module.exports = router;