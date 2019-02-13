var taxi = require("./modules/taxi");
debugger;

// Jostain syystä negatiiviset koordinaatit eivät tomiineet...

console.time("set helsinki as home");
taxi.setHome("Helsinki", function(data) {
  console.log("\nSetting helsinki as home");
  console.log(data);
  console.log(data.lat);
  console.timeEnd("set helsinki as home");
});

console.time("standard fare");
taxi.getFare("\nTampere", function(data) {
  console.log("\nto Tampere");
  console.log(data);
  console.timeEnd("standard fare");
});

console.time("set oulu as home");
taxi.setHome("Oulu", function(data) {
  console.log("\nOulu");
  console.log(data);
  console.log(data.lat);
  console.timeEnd("set oulu as home");
});

console.time("long fare");
taxi.getFare("Helsinki", function(data) {
  console.log("\nto Helsinki");
  console.log(data);
  console.timeEnd("long fare");
});

console.time("short fare");
taxi.getFare("Oulunsalo", function(data) {
  console.log("\nto Oulunsalo");
  console.log(data);
  console.timeEnd("short fare");
});

console.time("set pasila as home");
taxi.setHome("Pasila, Helsinki", function(data) {
  console.log("\nPasila");
  console.log(data);
  console.log(data.lat);
  console.timeEnd("set pasila as home");
});

console.time("short fare");
taxi.getFare("Huopalati, Helsinki", function(data) {
  console.log("\nto Huopalahti");
  console.log(data);
  console.timeEnd("short fare");
});

console.time("very long fare");
taxi.getFare("Ivalo", function(data) {
  console.log("\nto Ivalo");
  console.log(data);
  console.timeEnd("very long fare");
});
