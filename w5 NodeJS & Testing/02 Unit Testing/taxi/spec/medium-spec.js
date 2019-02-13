var fs = require("fs");
var rewire = require("rewire");
var taxi = rewire("../modules/taxi");

describe("Medium Length Route", function() {
  /* the routedata comes from an external API that is not guaranteed to return consistent data. We substitute a different function for testing that returns a fixed object. */
  // taxi.__set__("getRouteData", function(start, end) {
  //   console.log("MOCK 1");
  //   const data = fs.readFileSync("spec/routedata/hel_ivalo.json", "utf8");
  //   return JSON.parse(data);
  // });

  it("should set Helsinki as the current location", function(done) {
    taxi.setHome("Helsinki", function(data) {
      expect(data.lat).toEqual(60.17116);
      expect(data.lng).toEqual(24.93266);
      //   expect(data.lat).toEqual(52.405899);
      //   expect(data.lng).toEqual(-1.495929); // Negative coordinates didin't work for some reason
      done();
    });
  });

  it("should calculate the fare to Tampere", function(done) {
    taxi.getFare("Tampere", function(data) {
      expect(data.distance).toEqual(177166);
      expect(data.duration).toEqual(6922);
      expect(data.cost).toEqual(297.16);
      done();
    });
  });
});
