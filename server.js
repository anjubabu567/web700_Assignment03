/********************************************************************************
*  WEB700 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Anju Babu Student ID: 115640245 Date: 24-06-2025
*
********************************************************************************/
const LegoData = require("./modules/legoSets");
const legoData = new LegoData();

const express = require("express");
const path = require("path");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Route: Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

// Route: About Page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Route: Get all Lego sets or by theme
app.get("/lego/sets", (req, res) => {
  const themeQuery = req.query.theme;

  if (themeQuery) {
    legoData.getSetsByTheme(themeQuery)
      .then(data => res.json(data))
      .catch(err => res.status(404).send(err));
  } else {
    legoData.getAllSets()
      .then(data => res.json(data))
      .catch(err => res.status(404).send(err));
  }
});

// Route: Get specific Lego set by set number
app.get("/lego/sets/:set_num", (req, res) => {
  const setNum = req.params.set_num;

  legoData.getSetByNum(setNum)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err));
});

// Custom 404 Page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});


legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on port ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.log("Server failed to start:", err);
  });
