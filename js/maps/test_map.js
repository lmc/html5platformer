var TestMapLoader = Class.create(MapLoader,{
  load: function(map){

    var map_data = [
      [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
      [0,1,1,1,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
      [1,1,1,0,0,0,0,0,1,1,0,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
      [1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    
    for(var i = 0; i < map_data.length; i++){
      for(var j = 0; j < map_data[i].length; j++){
        
        if(!map.data[j]) map.data[j] = [];
        
        map.data[j][i] = map_data[i][j]; //NOTE: mind that we're flipping dimensions!
      }
    }
    
    map.data[3][3].drawable_callback = function(canvas,x,y,renderer){
    };
    
    var character = new Character(map,'sprite');
    character.x = 2;
    character.y = 2;
    map.characters.push(character);
  }
});