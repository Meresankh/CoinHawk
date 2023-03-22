var request = new XMLHttpRequest();
request.open('GET', 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', true);
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        console.log(data);
        console.log(data.lastPrice);
        
        removeDecimal(document.getElementById("price").innerHTML = data.lastPrice + " $");
        document.getElementById("volume").innerHTML = data.volume + " $";
        document.getElementById("low").innerHTML = data.lowPrice + " $";
        document.getElementById("high").innerHTML = data.highPrice + " $";
        document.getElementById("change").innerHTML = data.priceChangePercent + " %";
    }
}
request.send();
//function set interval 30 seconds
setInterval(function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            var old = document.getElementById("price").innerHTML
            var newPrice = data.lastPrice + "$";
            if (old < newPrice) {
                removeDecimal(document.getElementById("price").innerHTML = data.lastPrice);
                document.getElementById("price").style.color = "green";
            } else {
                document.getElementById("price").innerHTML = data.lastPrice;
                document.getElementById("price").style.color = "red";
            }

            document.getElementById("volume").innerHTML = data.volume;
            document.getElementById("change").innerHTML = data.priceChangePercent;
        }
    }
    request.send();
}, 30000);

//function that takes in a string and removes characters after the decimal point
function removeDecimal(string) {
    var newString = string.split(".");
    console.log(newString[0] + "kurba");
    return newString[0];
}
