const express = require('express');
// include the Themeparks library
var Themeparks = require("themeparks");
const app = express();
const moment = require('moment');

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/:parkId', (req, res) => {

  switch (req.params.parkId) {
    case 'waltDisneyWorldMagicKingdom':
      var park = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      break;
    case 'WaltDisneyWorldEpcot':
      var park = new Themeparks.Parks.WaltDisneyWorldEpcot();
      break;
    case 'WaltDisneyWorldHollywoodStudios':
      var park = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
      break;
    case 'WaltDisneyWorldAnimalKingdom':
      var park = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
      break;
    case 'DisneylandResortMagicKingdom':
      var park = new Themeparks.Parks.DisneylandResortMagicKingdom();
      break;
    case 'DisneylandResortCaliforniaAdventure':
      var park = new Themeparks.Parks.DisneylandResortCaliforniaAdventure();
      break;
    case 'DisneylandParisMagicKingdom':
      var park = new Themeparks.Parks.DisneylandParisMagicKingdom();
      break;
    case 'DisneylandParisWaltDisneyStudios':
      var park = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();
      break;
    case 'ShanghaiDisneyResortMagicKingdom':
      var park = new Themeparks.Parks.ShanghaiDisneyResortMagicKingdom();
      break;
    case 'TokyoDisneyResortMagicKingdom':
      var park = new Themeparks.Parks.TokyoDisneyResortMagicKingdom();
      break;
    case 'TokyoDisneyResortDisneySea':
      var park = new Themeparks.Parks.TokyoDisneyResortDisneySea();
      break;
    case 'HongKongDisneyland':
      var park = new Themeparks.Parks.HongKongDisneyland();
      break;
  }

  // access a specific park
  var parkInfo = {
    parkName: park.Name.split(' -')[0],
    parkLocation: park.Name.split(' - ')[1],
    parkTimes: {

    },
    rideInfo: {

    }
  };
  // get park opening times
  park.GetOpeningTimes().then(function (times) {
    // print opening times
    for (var i = 0, time; time = times[i++];) {
      parkInfo.parkTimes[time.date] = {
        opens: time.openingTime,
        closes: time.closingTime
      }
    }
  }, console.error);


  // access wait times by Promise
  park.GetWaitTimes().then(function (rides) {
    // print each wait time
    for (var i = 0, ride; ride = rides[i++];) {
      parkInfo.rideInfo[ride.id] = {
        name: ride.name,
        waitTime: ride.waitTime,
        fastPass: ride.fastPass,
        status: ride.status,
        open: ride.active,
        openingTimes: ride.schedule
      }
    }
  }, console.error).then(() => {
    res.json(parkInfo);
  });

})

app.listen(process.env.PORT || 5000, () => {
  console.log('server starting');
})