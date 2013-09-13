var socket = io.connect()
  , pos = {};
pos.ax = 0;
pos.ay = 0;
pos.rx = 0;
pos.ry = 0;

$(function(){
  $('#log-text').text('x: ' + pos.ax + ', y: ' + pos.ay);
  
  var bx = 0;
  var by = 0;

  var touchHandler = function(e){
    var touch = e.originalEvent.touches[0];
    var offsets = $('#touch-pad').offset();
    
    if(e.type === 'touchstart'){
      pos.rx = 0;
      pos.ry = 0;
      console.log('touch start');
    }else if(e.type === 'touchmove'){
      var ax = parseInt((touch.pageX - offsets.left)*3/2, 10);
      var ay = parseInt((touch.pageY - offsets.top)*3/2, 10);
      if(ax < 0){ ax = 0; }
      if(480 < ax){ ax = 480;}
      if(ay < 0){ ay = 0; }
      if(360 < ay){ ay = 360; }
      
      pos.ax = ax;
      pos.ay = ay;
      pos.rx = ax - bx;
      pos.ry = ay - by;
      bx = ax;
      by = ay;
      socket.emit('point-update', pos);
      $('#log-text').text('x: ' + pos.ax + ', y: ' + pos.ay);
      
    }else if(e.type === 'touchend'){
      if(pos.rx === 0 && pos.ry === 0){
        socket.emit('broadcast', 'tapped');
      }
      pos.rx = 0;
      pos.ry = 0;
    }else{
      console.log('can\'t handle touch event');
      return false;
    }
    
    e.preventDefault();
  };
  
  $('#touch-pad').bind('touchmove touchstart touchend', touchHandler);
});
