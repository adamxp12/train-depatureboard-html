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

    //request.send()

    addData('{"date":"2019-10-16","time_of_day":"23:13","request_time":"2019-10-16T23:13:47+01:00","station_name":"Chelmsford","station_code":"chm","departures":{"all":[{"mode":"train","service":"21939001","train_uid":"L70584","platform":"2","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"23:12","aimed_arrival_time":"23:12","aimed_pass_time":null,"origin_name":"London Liverpool Street","destination_name":"Colchester","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L70584/2019-10-16/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"LATE","expected_arrival_time":"23:15","expected_departure_time":"23:15","best_arrival_estimate_mins":1,"best_departure_estimate_mins":1},{"mode":"train","service":"21781002","train_uid":"L71175","platform":"1","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"23:25","aimed_arrival_time":"23:25","aimed_pass_time":null,"origin_name":"Norwich","destination_name":"London Liverpool Street","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L71175/2019-10-16/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"LATE","expected_arrival_time":"23:26","expected_departure_time":"23:26","best_arrival_estimate_mins":12,"best_departure_estimate_mins":12},{"mode":"train","service":"21939001","train_uid":"L71268","platform":"2","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"23:34","aimed_arrival_time":"23:34","aimed_pass_time":null,"origin_name":"London Liverpool Street","destination_name":"Ipswich","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L71268/2019-10-16/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"NO REPORT","expected_arrival_time":"23:34","expected_departure_time":"23:34","best_arrival_estimate_mins":20,"best_departure_estimate_mins":20},{"mode":"train","service":"21939001","train_uid":"L70995","platform":"2","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"23:52","aimed_arrival_time":"23:52","aimed_pass_time":null,"origin_name":"London Liverpool Street","destination_name":"Clacton On Sea","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L70995/2019-10-16/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"ON TIME","expected_arrival_time":"23:52","expected_departure_time":"23:52","best_arrival_estimate_mins":38,"best_departure_estimate_mins":38},{"mode":"train","service":"21781002","train_uid":"L71174","platform":"2","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"00:03","aimed_arrival_time":"00:02","aimed_pass_time":null,"origin_name":"London Liverpool Street","destination_name":"Norwich","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L71174/2019-10-16/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"ON TIME","expected_arrival_time":"00:02","expected_departure_time":"00:03","best_arrival_estimate_mins":48,"best_departure_estimate_mins":49},{"mode":"train","service":"21939001","train_uid":"L70590","platform":"2","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"00:22","aimed_arrival_time":"00:22","aimed_pass_time":null,"origin_name":"London Liverpool Street","destination_name":"Colchester","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L70590/2019-10-16/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"ON TIME","expected_arrival_time":"00:22","expected_departure_time":"00:22","best_arrival_estimate_mins":68,"best_departure_estimate_mins":68},{"mode":"train","service":"21939001","train_uid":"L70594","platform":"2","operator":"LE","operator_name":"Greater Anglia","aimed_departure_time":"00:59","aimed_arrival_time":"00:58","aimed_pass_time":null,"origin_name":"London Liverpool Street","destination_name":"Colchester","source":"Network Rail","category":"XX","service_timetable":{"id":"https://transportapi.com/v3/uk/train/service/train_uid:L70594/2019-10-17/timetable.json?app_id=f5c93649\u0026app_key=9c77e6157b633de37ed0df273617fb42\u0026live=true"},"status":"ON TIME","expected_arrival_time":"00:58","expected_departure_time":"00:59","best_arrival_estimate_mins":104,"best_departure_estimate_mins":105}]}}');
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
    if(status == "EARLY") return "Early"
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
        // var stopsstr = stopsstr.substring(stopsstr.indexOf(stationname));
        $("#callat").html(stopsstr);
        startMarquee();
            };
        };
        //request.send();
        return("")
        var test = '{"service":"21939001","train_uid":"L70590","headcode":"","toc":{"atoc_code":"LE"},"train_status":"P","origin_name":"London Liverpool Street","destination_name":"Colchester","stop_of_interest":null,"date":"2019-10-16","time_of_day":null,"mode":"train","request_time":"2019-10-17T00:17:34+01:00","category":"XX","operator":"LE","operator_name":"Greater Anglia","stops":[{"station_code":"LST","tiploc_code":"LIVST","station_name":"London Liverpool Street","stop_type":"LO","platform":"14","aimed_departure_date":"2019-10-16","aimed_departure_time":"23:48","aimed_arrival_date":null,"aimed_arrival_time":null,"aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":null,"expected_departure_time":null,"expected_arrival_date":null,"expected_arrival_time":null,"expected_pass_date":null,"expected_pass_time":null,"status":null},{"station_code":"SRA","tiploc_code":"STFD","station_name":"Stratford","stop_type":"LI","platform":"10","aimed_departure_date":"2019-10-16","aimed_departure_time":"23:55","aimed_arrival_date":"2019-10-16","aimed_arrival_time":"23:55","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":null,"expected_departure_time":null,"expected_arrival_date":null,"expected_arrival_time":null,"expected_pass_date":null,"expected_pass_time":null,"status":null},{"station_code":"SNF","tiploc_code":"SHENFLD","station_name":"Shenfield","stop_type":"LI","platform":"3","aimed_departure_date":"2019-10-17","aimed_departure_time":"00:11","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:10","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":null,"expected_departure_time":null,"expected_arrival_date":null,"expected_arrival_time":null,"expected_pass_date":null,"expected_pass_time":null,"status":null},{"station_code":"INT","tiploc_code":"INGTSTN","station_name":"Ingatestone","stop_type":"LI","platform":"2","aimed_departure_date":"2019-10-17","aimed_departure_time":"00:15","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:15","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":null,"expected_departure_time":null,"expected_arrival_date":null,"expected_arrival_time":null,"expected_pass_date":null,"expected_pass_time":null,"status":null},{"station_code":"CHM","tiploc_code":"CHLMSFD","station_name":"Chelmsford","stop_type":"LI","platform":"2","aimed_departure_date":"2019-10-17","aimed_departure_time":"00:22","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:22","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":"2019-10-17","expected_departure_time":"00:24","expected_arrival_date":"2019-10-17","expected_arrival_time":"00:24","expected_pass_date":null,"expected_pass_time":null,"status":"LATE"},{"station_code":"HAP","tiploc_code":"HFLPEVL","station_name":"Hatfield Peverel","stop_type":"LI","platform":null,"aimed_departure_date":"2019-10-17","aimed_departure_time":"00:28","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:28","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":"2019-10-17","expected_departure_time":"00:30","expected_arrival_date":"2019-10-17","expected_arrival_time":"00:30","expected_pass_date":null,"expected_pass_time":null,"status":"LATE"},{"station_code":"WTM","tiploc_code":"WITHAME","station_name":"Witham","stop_type":"LI","platform":"3","aimed_departure_date":"2019-10-17","aimed_departure_time":"00:35","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:34","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":"2019-10-17","expected_departure_time":"00:37","expected_arrival_date":"2019-10-17","expected_arrival_time":"00:36","expected_pass_date":null,"expected_pass_time":null,"status":"LATE"},{"station_code":"KEL","tiploc_code":"KELVEDN","station_name":"Kelvedon","stop_type":"LI","platform":"2","aimed_departure_date":"2019-10-17","aimed_departure_time":"00:39","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:39","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":"2019-10-17","expected_departure_time":"00:41","expected_arrival_date":"2019-10-17","expected_arrival_time":"00:41","expected_pass_date":null,"expected_pass_time":null,"status":"LATE"},{"station_code":"MKT","tiploc_code":"MRKSTEY","station_name":"Marks Tey","stop_type":"LI","platform":"2","aimed_departure_date":"2019-10-17","aimed_departure_time":"00:45","aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:45","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":"2019-10-17","expected_departure_time":"00:47","expected_arrival_date":"2019-10-17","expected_arrival_time":"00:47","expected_pass_date":null,"expected_pass_time":null,"status":"LATE"},{"station_code":"COL","tiploc_code":"CLCHSTR","station_name":"Colchester","stop_type":"LT","platform":"1","aimed_departure_date":null,"aimed_departure_time":null,"aimed_arrival_date":"2019-10-17","aimed_arrival_time":"00:59","aimed_pass_date":null,"aimed_pass_time":null,"expected_departure_date":null,"expected_departure_time":null,"expected_arrival_date":"2019-10-17","expected_arrival_time":"01:01","expected_pass_date":null,"expected_pass_time":null,"status":"LATE"}]}'
        

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