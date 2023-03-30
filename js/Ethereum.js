//when tittle is clicked go back to the index.html page
function goBack() {
    window.history.back();
  }
  
  
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT",
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
      document.getElementById("volume").innerHTML = volume + " ETH";
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
      "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT",
      true
    );
    request.onload = function () {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        var old = document.getElementById("price").innerHTML;
        var newPrice = removeDecimal(data.lastPrice);
  
        //if the price has changed, change the color of the price for 2 seconds
  
        document.getElementById("price").innerHTML = newPrice + " $";
        console.log(old - newPrice);
        if (old > newPrice && newPrice != 0) {
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
          removeDecimal(data.volume) + " ETH";
        document.getElementById("change").innerHTML =
          data.priceChangePercent + " %";
      }
    };
    request.send();
  }, 30000);
  
  
  // //api call for BTC bitstamp using headers
  function bitstamp() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://www.bitstamp.net/api/v2/ticker/ethusd/Jan", true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        var currPrice = data.last;
        document.getElementById("price2").innerHTML = currPrice + " $";
        document.getElementById("volume2").innerHTML =
        removeDecimal(data.volume) + " ETH";
        document.getElementById("low2").innerHTML = data.low + " $";
        document.getElementById("high2").innerHTML = data.high + " $";
        document.getElementById("change2").innerHTML = data.percent_change_24 + " %";
  
        if (data.percent_change_24 < 0) {
          document.getElementById("change2").style.color = "red";
        } else {
          document.getElementById("change2").style.color = "green";
        }
      }
    };
    request.send();
  }
  bitstamp();
  setInterval(bitstamp, 30000);

//api call to kraken for ETH
function kraken() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.kraken.com/0/public/Ticker?pair=ETHUSD", true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        console.log(data);
        var currPrice = removeDecimal(data.result.XETHZUSD.c[0]);
        document.getElementById("price3").innerHTML = currPrice + " $";
        document.getElementById("volume3").innerHTML =
        removeDecimal(data.result.XETHZUSD.v[1]) + " ETH";
        document.getElementById("low3").innerHTML = removeDecimal(data.result.XETHZUSD.l[1]) + " $";
        document.getElementById("high3").innerHTML = removeDecimal(data.result.XETHZUSD.h[1]) + " $";
        document.getElementById("change3").innerHTML = removeDecimal(data.result.XETHZUSD.c[1]) + " %";

        if (data.result.XETHZUSD.p[1] < 0) {
          document.getElementById("change3").style.color = "red";
        } else {
          document.getElementById("change3").style.color = "green";
        }
      }
    };
    request.send();
  }
  kraken();



  //function that takes in a string and removes characters after the decimal point
  function removeDecimal(string) {
    var newString = string.split(".");
    newString[1] = newString[1].substring(0, 2);
    return newString[0] + "." + newString[1];
  }



