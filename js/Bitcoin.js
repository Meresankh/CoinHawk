var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT",
  true
);
request.onload = function () {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    var lastPrice = removeDecimal(data.lastPrice);
    var volume = removeDecimal(data.volume);
    var lowPrice = removeDecimal(data.lowPrice);
    var highPrice = removeDecimal(data.highPrice);
    var priceChangePercent = data.priceChangePercent;

    document.getElementById("price").innerHTML = lastPrice + " $";
    document.getElementById("volume").innerHTML = volume + " BTC";
    document.getElementById("low").innerHTML = lowPrice + " $";
    document.getElementById("high").innerHTML = highPrice + " $";
    document.getElementById("change").innerHTML = priceChangePercent + " %";

    if (priceChangePercent < 0) {
      document.getElementById("change").style.color = "red";
    } else {
      document.getElementById("change").style.color = "green";
    }
  }
};
request.send();

setInterval(function () {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT",
    true
  );
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      var old = document.getElementById("price").innerHTML;
      var newPrice = removeDecimal(data.lastPrice);

      //if the price has changed, change the color of the price for 2 seconds

      document.getElementById("price").innerHTML = newPrice + " $";

      if (old > newPrice) {
        document.getElementById("price").style.color = "red";
        setTimeout(function () {
          document.getElementById("price").style.color = "black";
        }, 1000);
      } else {
        document.getElementById("price").style.color = "green";
        setTimeout(function () {
            document.getElementById("price").style.color = "black";
          }, 1000);
      }

      document.getElementById("volume").innerHTML =
        removeDecimal(data.volume) + " BTC";
      document.getElementById("change").innerHTML =
        data.priceChangePercent + " %";
    }
  };
  request.send();
}, 10000);

//function that takes in a string and removes characters after the decimal point
function removeDecimal(string) {
  var newString = string.split(".");
  newString[1] = newString[1].substring(0, 2);
  return newString[0] + "." + newString[1];
}

//api call for BTC coinbase
// function coinbase() {
//   var request = new XMLHttpRequest();
//   request.open("GET", "https://api.coinbase.com/v2/prices/BTC-USD/spot", true);
//   request.onload = function () {
//     var data = JSON.parse(this.response);
//     if (request.status >= 200 && request.status < 400) {
//       if (data.data.amount < document.getElementById("price1").innerHTML) {
//         document.getElementById("price1").style.color = "red";
//       } else {
//         document.getElementById("price1").style.color = "green";
//       }
//       document.getElementById("price1").innerHTML = data.data.amount + " $";
//     }
//   };
//   request.send();
// }
// setInterval(coinbase, 10000);
// coinbase();

// //api call for BTC bitstamp
// function bitstamp() {
//   var request = new XMLHttpRequest();
//   request.open("GET", "https://www.bitstamp.net/api/v2/ticker/btcusd/", true);
//   request.onload = function () {
//     var data = JSON.parse(this.response);
//     if (request.status >= 200 && request.status < 400) {
//       console.log(data);
//       console.log(data.last);
//       if (data < document.getElementById("price2").innerHTML) {
//         document.getElementById("price2").style.color = "red";
//       } else {
//         document.getElementById("price2").style.color = "green";
//       }

//       document.getElementById("price2").innerHTML = data.last + " $";
//       document.getElementById("volume2").innerHTML =
//       removeDecimal(data.volume) + " BTC";
//       document.getElementById("low2").innerHTML = data.low + " $";
//       document.getElementById("high2").innerHTML = data.high + " $";
//       document.getElementById("change2").innerHTML =
//         data.percent_change_24 + " %";

//       if (data.percent_change_24 < 0) {
//         document.getElementById("change2").style.color = "red";
//       } else {
//         document.getElementById("change2").style.color = "green";
//       }
//     }
//   };
//   request.send();
// }
// bitstamp();
// setInterval(bitstamp, 30000);
