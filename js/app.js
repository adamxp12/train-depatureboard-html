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
    request.open('GET', 'https://transportapi.com/v3/uk/train/station/'+trainconf.station+'/live.json?app_id='+trainconf.appid+'&app_key='+trainconf.appkey+'&darwin=false&train_status=passenger', true)
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
    stationname = data.station_name;
    var departures = data.departures.all;
    var departslist = "";
    var i = 0;
    console.log(departures);

    departures.forEach(depart => {
        
        departslist = departslist + '<div class="row depart"> \
        <div class="column shrink"> \
          '+depart.aimed_arrival_time+' \
        </div> \
        <div class="column" style="height: 36px; overflow:hidden"> \
          '+depart.destination_name+' \
        </div> \
        <div class="column shrink"> \
          '+formatStatus(depart.status, depart)+' \
        </div> \
      </div>'

      if(i==0) {
        departslist = departslist +'<div class="row depart"> \
        <div class="column shrink"> \
        Calling At: \
      </div> \
      <div class="column"> \
      <div id="callat" class="marquee">\
      '+formatCallAt(depart)+'\
      </div>\
        </div></div>';
    }

    i++;

      $('#departs').html(departslist);
    });

}

function formatStatus(status, depart) {
    if(status == "ON TIME") return "On Time"
    if(status == "ARRIVED") return "Arrived"
    if(status == "CANCELLED") return "Cancelled"
    if(status == "EARLY") return "On Time"
    if(status == "NO REPORT") return "No Data"
    if(status == "OFF ROUTE") return "Off Route"
    if(status == "REINSTATEMENT") return "Reinstatement"
    if(status == "STARTS HERE") return "Starts Here"

    if(status == "LATE") {
        return "Exp "+depart.expected_arrival_time;
    }
    return status;
}

function formatCallAt(depart) {
    var request = new XMLHttpRequest()
        request.open('GET', depart.service_timetable.id, true)
        request.onreadystatechange = function () {
            request.onload = function () {
                var jtest = JSON.parse(this.response);
        var stops = jtest.stops;
        var stopsstr = "";
        var i = 0;
        stops.forEach(stop => {
            if(i == (stops.length-1) && stops.length != 1) {
                stopsstr = stopsstr+ "and " + stop.station_name+" ";
            } else if (i == stops.length-2) {
                stopsstr = stopsstr+ stop.station_name+" ";
            } else {
                stopsstr = stopsstr+ stop.station_name+", ";
            }
            i++;
            
        })
        var stopsstr = stopsstr.substring(stopsstr.indexOf(stationname));
        $("#callat").html(stopsstr);
        startMarquee();
            };
        };
        request.send();
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