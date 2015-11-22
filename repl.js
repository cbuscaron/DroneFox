var fs = require('fs');
var path = require('path');
var df = require('dateformat')
  , arDrone = require('ar-drone')
  , arDroneConstants = require('ar-drone/lib/constants')
  , autonomy = require('../');

var client  = arDrone.createClient();
var ctrl    = new autonomy.Controller(client, {debug: false})
function navdata_option_mask(c) {
  return 1 << c;
}

 
  

process.on('SIGINT', function() {
    console.log('Got SIGINT.');
    //ctrl.zero();
    client.land();
    //client.ftrim();
    setTimeout(function(){
      process.exit(0);
    }, 1000)
});
// From the SDK.
var navdata_options = (
    navdata_option_mask(arDroneConstants.options.DEMO)
  | navdata_option_mask(arDroneConstants.options.VISION_DETECT)
  | navdata_option_mask(arDroneConstants.options.MAGNETO)
  | navdata_option_mask(arDroneConstants.options.WIFI)
);

// Connect and configure the drone
client.config('general:navdata_demo', true);
client.config('general:navdata_options', navdata_options);
client.config('video:video_channel', 1);
client.config('detect:detect_type', 12);
client.ftrim();

client.takeoff();

//client.disableEmergency();
/*
client.after(15000, function(){ 
  //client.takeoff();  
  //ctrl.zero()
})

client.takeoff();
*/

client.after(15000, function(){ 
  client.calibrate(0);  
  ctrl.zero()
})
/*
client.after(15000, function(){ 
  //client.calibrate(0);  
  ctrl.zero()
})
*/

client.after(5000, function(){ 
     ctrl.go({x: 5, y:0});
})

client.after(5000, function(){ 
     ctrl.cw(180);
})

client.after(5000, function(){ 
     ctrl.go({x: 0, y:0});
})


//client.after(5000, function(){ 
  //   ctrl.cw(180);
//})
/*
//client.after(10000, function(){ 
  //   ctrl.go({x: 3, y:0});
//})
//client.after(5000, function(){ 
//     ctrl.go({x: 0, y:0});
//})
client.after(15000, function(){ 
  //client.calibrate(0);  
  ctrl.zero()
})
*/
client.after(5000, function(){ 
     client.land()
     //ctrl.zero()
     
})
;

//client.after(5000, function(){ 
//client.land()


//})
//client.after(5000, function(){ 
//client.land()
//})
// Add a ctrl object to the repl. You can use the controller
// from there. E.g.
// ctrl.go({x:1, y:1});
//








