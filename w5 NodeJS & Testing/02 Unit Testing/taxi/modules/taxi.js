let sync = require("sync-request");

let home;

exports.setHome = (location, callback) => {
  // const loc = getLatLon(location);
  home = getLatLon(location);
  let latLng = home.split(",");
  callback({ lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) });
};

exports.getFare = function(destination, callback) {
  let dest = getLatLon(destination);
  const data = getRouteData(home, dest); // this is making the live API call
  let distance = data["response"]["route"][0]["summary"]["distance"];
  let duration = data["response"]["route"][0]["summary"]["travelTime"];
  let cost = calculateFare(distance, duration);
  callback({ distance: distance, duration: duration, cost: parseFloat(cost) });
};

/* this function returns API data but the data won't lety between calls. We could get away without mocking this call. */
function getLatLon(address) {
  let url =
    "https://geocoder.api.here.com/6.2/geocode.json?app_id=s0YCilYwRU2lE3nG16YI&app_code=6K8f3YlyBiXpaoNPRGQWCw&searchtext=";
  let res = sync("GET", url + address);
  data = JSON.parse(res.getBody().toString("utf8"));
  let loc =
    data["Response"]["View"][0]["Result"][0]["Location"]["DisplayPosition"];
  return loc.Latitude.toFixed(6) + "," + loc.Longitude.toFixed(6);
}

/* this function also returns live API data but this data will lety continously based on time of day and traffic conditions. This means it will require mocking in tests. by storing the function in a private letiable we can substitute for a different function when testing. Because we are replacing the code block it will never be called by our test suite so we flag the code coverage tool to ignore it. */
/* istanbul ignore next */
let getRouteData = function(start, end) {
  let url =
    "https://route.api.here.com/routing/7.2/calculateroute.json?app_id=s0YCilYwRU2lE3nG16YI&app_code=6K8f3YlyBiXpaoNPRGQWCw&waypoint0=geo!";
  url =
    url +
    start +
    "&waypoint1=geo!" +
    end +
    "&mode=fastest;car;traffic:disabled";
  const res = sync("GET", url);
  return JSON.parse(res.getBody().toString("utf8"));
};

function calculateFare(distance, duration) {
  let cost = (distance / 127) * 0.213014; // Close to the right value
  return cost.toFixed(2);
}
