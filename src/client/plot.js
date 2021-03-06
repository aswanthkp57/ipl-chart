const fetchMatchPlayedData = function () {
  let matchPlayedArray = [];
  fetch("http://localhost:3000/matchplayed")
    .then(function (response) {
      response.json().then(function (data) {
        console.log(" data loaded in api");
        console.log(data);
        displayMatchPlayedHighChart(data);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

function displayMatchPlayedHighChart(matchPlayedArray) {
  Highcharts.chart("container", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matched Played per Year",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Year",
      },
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Match Played",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Match Played : <b>{point.y:.1f} matches</b>",
    },
    series: [
      {
        name: "Match Played",
        data: matchPlayedArray,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y:f}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
}

fetchMatchPlayedData();
