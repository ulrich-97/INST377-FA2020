
function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const clearEmptyData = data.filter((f) => f.geocoded_column_1);
      const list = clearEmptyData.map((m) => ({
        category: m.category,
        name: m.name,
        latlong: m.geocoded_column_1.coordinates,
      }));
      return list;
    })
    .then((data) => {
      return data.reduce((result,  current) => {
        if (!result[current.category]) {
          result[current.category] = [];
        }
        result[current.category].push(current);
        return result;
      }, {});
    })
    .then((data) => {
      console.log("new data", data );
      const reformattedData = Object.entries(data).map((current, i) => {
        console.log(current);
        return {
          y: current[1].length,
          label: current[0],
        };
      });
      return reformattedData;
    })
    .then((result) => {
      console.log(result);  
    
    const list = JSON.parse(sessionStorage.getItem('restaurantList'));
    const convertedList = win.convertRestaurantsToCategories(list);
    })
}

window.onload = function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  chart = new CanvasJS.Chart("chartContainer");
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    "rgba(1,77,101,.2)",
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks: { 
        customBreaks: [
          {
            startValue: 40,
            endValue: 50,
            color: 10,
          },
          {
            startValue: 85,
            endValue: 100,
          },
          {
            startValue: 140,
            endValue: 175,
          },
        ],
      }, // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: 'win.convertRestaurantsToCategories(list)',
    }],
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});