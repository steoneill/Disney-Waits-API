const express = require("express");
// include the Themeparks library
let Themeparks = require("themeparks");
const app = express();
const moment = require("moment");

let park;

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/:parkId", (req, res) => {
  switch (req.params.parkId) {
    case "WaltDisneyWorldMagicKingdom":
      park = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      break;
    case "WaltDisneyWorldEpcot":
      park = new Themeparks.Parks.WaltDisneyWorldEpcot();
      break;
    case "WaltDisneyWorldHollywoodStudios":
      park = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
      break;
    case "WaltDisneyWorldAnimalKingdom":
      park = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
      break;
    case "DisneylandResortMagicKingdom":
      park = new Themeparks.Parks.DisneylandResortMagicKingdom();
      break;
    case "DisneylandResortCaliforniaAdventure":
      park = new Themeparks.Parks.DisneylandResortCaliforniaAdventure();
      break;
    case "DisneylandParisMagicKingdom":
      park = new Themeparks.Parks.DisneylandParisMagicKingdom();
      break;
    case "DisneylandParisWaltDisneyStudios":
      park = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();
      break;
    case "ShanghaiDisneyResortMagicKingdom":
      park = new Themeparks.Parks.ShanghaiDisneyResortMagicKingdom();
      break;
    case "TokyoDisneyResortMagicKingdom":
      park = new Themeparks.Parks.TokyoDisneyResortMagicKingdom();
      break;
    case "TokyoDisneyResortDisneySea":
      park = new Themeparks.Parks.TokyoDisneyResortDisneySea();
      break;
    case "HongKongDisneyland":
      park = new Themeparks.Parks.HongKongDisneyland();
      break;
  }

  // access wait times by Promise
  park
    .GetWaitTimes()
    .then(function(rides) {
      // print each wait time
      var Rides = rides.map(ride => {
        parkInfo.rideInfo.push({
          Name: ride.name,
          waitTime: ride.waitTime,
          fastPass: ride.fastPass,
          status: ride.status,
          open: ride.active,
          openingTimes: ride.schedule
        });
      });
    }, console.error)
    .then(() => {
      res.json(parkInfo);
    });

  // get park opening times
  park.GetOpeningTimes().then(function(times) {
    var parkTimes = times.map(time => {
      parkInfo.parkTimes.push({
        Opens: time.openingTime,
        Closes: time.closingTime
      });
    });
  }, console.error);

  let ParkNameFull = park.Name.split(" - ");

  // access a specific park
  var parkInfo = {
    parkName: ParkNameFull[0],
    parkLocation: ParkNameFull[1],
    parkTimes: [],
    rideInfo: []
  };
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server starting");
});
