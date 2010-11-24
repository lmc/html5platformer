var TestMapLoader = Class.create(MapLoader,{
  load: function(map){

    var map_data = new Image;
    map_data.src = 'images/map_test.png';
    var map_canvas = new Element('canvas',{width: 480,height: 320}).getContext('2d');
    map_canvas.drawImage(map_data,0,0);
    map_canvas_data = map_canvas.getImageData(0,0,480,320).data;
    for(var x = 0; x < 480; x++){
      for(var y = 0; y < 320; y++){

        if(!map.data[x]) map.data[x] = [];

        if(map_canvas_data[(y * 480 + x) * 4] == 0) {            
          map.data[x][y] = 1;
        }else{
          map.data[x][y] = 0;
        }
      }
    }
  }
});