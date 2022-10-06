const m=MindFusion.Mapping;
const d=MindFusion.Drawing;

//create a new instance of the map
const view=new m.Map(document.getElementById("map"));
view.theme = "standard";

const hLocation = new m.LatLong(59.93274292289714, 10.73321488040773)

const l=new m.Map("Streets");

l.urlTemplate = "https://api.mapbox.com/styles/v1/kiriza/ck5b99uha1hfc1cs5zl4mbt98.html?fresh=true&title=view&access_token=pk.eyJ1Ijoia2lyaXphIiwiYSI6ImNrNTNseGc0ZDBhMHMzZm1jdjBoMWYweWEifQ.X3lZ_RB7KFuRgfgZB7fwMw"


