var fs = require("fs");
var rewire = require("rewire");
var taxi = rewire("../modules/taxi");

describe("Short Route", function() {
  /* the routedata comes from an external API that is not guaranteed to return consistent data. We substitute a different function for testing that returns a fixed object. */
  /*taxi.__set__('getRouteData', function(start, end) {
		console.log('MOCK 2')
		const data = fs.readFileSync('spec/routedata/cov_uni_cat.json', "utf8")
		return JSON.parse(data)
	})*/

  it("should set Pasila, Helsinki as the current location", function(done) {
    taxi.setHome("Pasila, Helsinki", function(data) {
      expect(data.lat).toEqual(60.19839);
      expect(data.lng).toEqual(24.92787);
      done();
    });
  });

  it("should calculate the fare to Huopalahti, Helsinki", function(done) {
    taxi.getFare("Huopalahti, Helsinki", function(data) {
      expect(data.distance).toEqual(4041);
      expect(data.duration).toEqual(498);
      expect(data.cost).toEqual(6.78);
      done();
    });
  });
});
