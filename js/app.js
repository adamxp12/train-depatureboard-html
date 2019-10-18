$(document).foundation()


$(document).ready(function() {
   setInterval("updateClock()", 1000);
   setInterval("getData()", 180000);
   getData();
});

var stationname = "";


function updateClock () {
    var currentTime = new Date ( );
      
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );
      
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
    var currentTimeString = "<span class='clocklarge'>"+currentHours + ":" + currentMinutes + ":</span>" + currentSeconds;
    $(".clock").html(currentTimeString);
}


function getData() {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://huxley.apphb.com/departures/'+trainconf.station+'/?accessToken='+trainconf.accessToken+'&expand=true', true)
    //request.open('GET', 'https://gist.githubusercontent.com/adamxp12/e07ca1f40f35d5d96a9e09b120668af9/raw/04e75e48b71cc11d8c727bb618b6b50f7fd9c4c7/test.json', true)
    request.onreadystatechange = function () {
        if(request.status != 200) {
            $("#totalstatus").html("api down nuuuu &#128293; &#128557;")
        }

        request.onload = function () {
            addData(this.response);
        };
    };
    request.send()
}

function addData(data2) {
    //var data = getData();
    var data = JSON.parse(data2)
    stationname = data.locationName;
    var departures = data.trainServices;
    var departslist = "";
    var i = 0;
    console.log(departures);

    departures.forEach(depart => {
        
        departslist = departslist + '<div class="row depart"> \
        <div class="column shrink"> \
          '+depart.std+' \
        </div> \
        <div class="column" style="height: 36px; overflow:hidden"> \
          '+depart.destination[0].locationName+' \
        </div> \
        <div class="column shrink"> \
          '+formatStatus(depart)+' \
        </div> \
      </div>'

      if(i==0 && depart.etd != "Cancelled" && depart.etd != "Delayed") {
        departslist = departslist +'<div class="row depart"> \
        <div class="column shrink"> \
        Calling At: \
      </div> \
      <div class="column"> \
      <div id="callat" class="marquee">\
      '+formatCallAt(depart)+'\
      </div>\
        </div></div>';
    } else if (i==0 && depart.etd == "Cancelled") {
        departslist = departslist +'<div class="row depart"> \
      <div class="column"> \
      <div id="callat" class="marquee">\
      '+depart.cancelReason+'\
      </div>\
        </div></div>';
    } else if (i==0 && depart.etd == "Delayed") {
        departslist = departslist +'<div class="row depart"> \
      <div class="column"> \
      <div id="callat" class="marquee">\
      '+depart.delayReason+'\
      </div>\
        </div></div>';
    }

    i++;

      $('#departs').html(departslist);
    });
    startMarquee();

}

function formatStatus(depart) {
    var status = depart.etd;
    if(status == "On time") return "On Time"
    if(status == "ARRIVED") return "Arrived"
    if(status == "CANCELLED") return "Cancelled"
    if(status == "EARLY") return "On Time"
    if(status == "NO REPORT") return "No Data"
    if(status == "OFF ROUTE") return "Off Route"
    if(status == "REINSTATEMENT") return "Reinstatement"
    if(status == "STARTS HERE") return "Starts Here"

    if(status.includes(":")) {
        return "Exp "+depart.etd;
    }
    return status;
}

function formatCallAt(depart) {
        var stops = depart.subsequentCallingPoints;
        var stopsstr = "";
        
        if (stops) {
            
            var callpoints = stops[0].callingPoint;
            var i = 0;
        callpoints.forEach(stop => {
            if(i == (callpoints.length-1) && callpoints.length != 1) {
                stopsstr = stopsstr+ "and " + stop.locationName+" ";
            } else if (i == callpoints.length-2) {
                stopsstr = stopsstr+ stop.locationName+" ";
            } else {
                stopsstr = stopsstr+ stop.locationName+", ";
            }
            i++;
        })

        if(depart.length > 1) {
            stopsstr = stopsstr + "&nbsp;&nbsp;&nbsp;&nbsp; This train is formed of "+depart.length+" coaches."
        }
        return stopsstr;
        }
        
        
        
        return("")        

}

function startMarquee() {
    $('.marquee').marquee({
        //duration in milliseconds of the marquee
        speed: 50,
        //gap in pixels between the tickers
        gap: 50,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: false
    });
}