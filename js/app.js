$(document).foundation()


$(document).ready(function() {
  if(trainconf.showSecondsClock) {
    setInterval("updateClock()", 1000);
  } else {
    setInterval("updateClock()", 10000);
  }
   
   setInterval("getData()", 180000);
   getData();
});

var stationname = "";


function updateClock () {
    var currentTime = new Date ( );
      
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );
    var currentDay = currentTime.getDate();
    var currentMonth = currentTime.getMonth();
    var currentYear = currentTime.getFullYear();
      
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    if(trainconf.showSecondsClock) {
      currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
      var currentTimeString = "<span class='clocklarge'>"+currentHours + ":" + currentMinutes + ":</span>" + currentSeconds+"<br>";
    } else {
      currentSeconds = "";
      var currentTimeString = "<span class='clocklarge'>"+currentHours + ":" + currentMinutes + "<br>";
    }
    if(trainconf.showDate) currentTimeString = currentTimeString +"<small>"+currentDay+"/"+currentMonth+"/"+currentYear+"</small>";
    
    currentHours = null;
    currentMinutes = null;
    currentSeconds = null;
    currentDay = null;
    currentMonth = null;
    currentYear
    //$(".clock").html(currentTimeString);
    document.getElementById("clock").innerHTML = currentTimeString;
}


function getData() {
    var request = new XMLHttpRequest()
    if(trainconf.toStation) {
        request.open('GET', 'https://huxley.apphb.com/departures/'+trainconf.station+'/to/'+trainconf.toStation+'/?accessToken='+trainconf.accessToken+'&expand=true', true)
    } else {
        request.open('GET', 'https://huxley.apphb.com/departures/'+trainconf.station+'/?accessToken='+trainconf.accessToken+'&expand=true', true)
    }
    //request.open('GET', 'https://gist.githubusercontent.com/adamxp12/e07ca1f40f35d5d96a9e09b120668af9/raw/04e75e48b71cc11d8c727bb618b6b50f7fd9c4c7/test.json', true)
    request.onreadystatechange = function () {
        if(request.status != 200) {
            $("#totalstatus").html("api down nuuuu &#128293; &#128557;")
        }

        request.onload = function () {
            stopMarquee();
            addData(this.response);
        };
    };
    request.send()
}

function addData(data2) {
    //var data = getData();
    var data = JSON.parse(data2)
    stationname = data.locationName;
    var traindepartures = data.trainServices;
    var busServices = data.busServices;
    var departslist = "";
    var i = 0;
    if(data.nrccMessages && trainconf.showNrccMessagesMarquee) {
        departslist = departslist +'<div class="row depart"> \
          <div class="column"> \
          <div id="callat" class="marquee">\
          '+data.nrccMessages[0].value.replace(/<\/?[^>]+(>|$)/g, "")+'\
          </div>\
            </div></div>';
            $('#departs').html(departslist);
    }

    if(traindepartures != null) {
        traindepartures.forEach(depart => {
        
            departslist = departslist + '<div class="row depart"> \
            <div class="column shrink"> \
              '+depart.std+' \
            </div> \
            <div class="column" style="height: 36px; overflow:hidden"> \
              '+depart.destination[0].locationName+' \
            </div> \
            <div class="column shrink"> \
              '+formatStatus(depart)+'&nbsp; \
            </div> \
          </div>'
    
          if(i==0 && depart.etd != "Cancelled" && depart.etd != "Delayed") {
            departslist = departslist +'<div class="row depart"> \
            <div class="column shrink"> \
            Calling At: \
          </div> \
          <div class="column"> \
          <div id="callat" class="marquee">\
          '+formatCallAt(depart, false)+'\
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
    } 
    if(busServices !=null) {
        if(trainconf.alwaysShowBusses || traindepartures == null) {
            busServices.forEach(depart => {
        
                departslist = departslist + '<div class="row depart"> \
                <div class="column shrink"> \
                  '+depart.std+' \
                </div> \
                <div class="column" style="height: 36px; overflow:hidden"> \
                  '+depart.destination[0].locationName+' \
                </div> \
                <div class="column shrink"> \
                  '+formatStatus(depart)+'&nbsp; \
                </div> \
              </div>'
        
              if(i==0 && depart.etd != "Cancelled" && depart.etd != "Delayed") {
                departslist = departslist +'<div class="row depart"> \
                <div class="column shrink"> \
                Calling At: \
              </div> \
              <div class="column"> \
              <div id="callat" class="marquee">\
              '+formatCallAt(depart, true)+'\
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
    }
        
    if(stationname !=null && traindepartures == null && busServices == null) {
        departslist = departslist + '<div class="row depart"> \
            <div class="column text-center"> \
              Welcome to \
            </div></div><div class="row depart">  \
            <div class="column text-center"> \
              <b>'+stationname+'</b> \
            </div></div>\
            <div class="row depart">  \
            <div class="column text-center"> \
              <b>&nbsp;</b> \
            </div></div>\
            <div class="row depart">  \
            <div class="column text-center"> \
              The are currently no trains scheduled \
            </div></div>';
            $('#departs').html(departslist);
    } else {
        // API down probs
    }
    startMarquee();
    data = null;
    traindepartures = null;
    busServices = null;
    departslist = null;
    

}

function formatStatus(depart) {
    var status = depart.etd;
    if(status == "On time") return "On Time"

    if(status.includes(":")) {
        return "Exp "+depart.etd;
    }
    return status;
}

function formatCallAt(depart, isBus) {
        var stops = depart.subsequentCallingPoints;
        var stopsstr = "";
        
        // Platform number if it is in API
        // the API only gives platform numbers for the next trains to arrive per platform. so unfortunetly cant display platform for all trains
        // only trains that are next to arrive
        if(depart.platform && trainconf.showPlatformInMarquee) {
            if(depart.platform == "BUS" || isBus) {
                stopsstr = stopsstr + "This service is a bus replacement. &nbsp; Calling at &nbsp;"
            } else {
                stopsstr = stopsstr + "The next train to arrive at platform "+depart.platform+" will be calling at &nbsp;"
            }
        }

        // Messy code to create the calling at string
        if (stops) {
            
            var callpoints = stops[0].callingPoint;
            var i = 0;
        callpoints.forEach(stop => {
            var name = stop.locationName
            if(trainconf.shortenInternational) name = name.replace("International", "Intl");
            if(i == (callpoints.length-1) && callpoints.length != 1) {
                stopsstr = stopsstr+ "and " + name+" ";
            } else if (i == callpoints.length-2) {
                stopsstr = stopsstr+ name+" ";
            } else {
                stopsstr = stopsstr+ name+", ";
            }

            i++;
        })
        }

        // Show coach length
        if(depart.length > 1 && trainconf.showCoachLength) {
            stopsstr = stopsstr + "&nbsp;&nbsp;&nbsp;&nbsp; This train is formed of "+depart.length+" coaches."
        }

        stops = null;
        return stopsstr;       

}


function stopMarquee() {
  $('.marquee').marquee('destroy');
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