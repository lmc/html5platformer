var Renderer = Class.create({
  
  initialize: function(canvas,options){
    options = options || {};
    
    this.target_fps = 60;
    this.canvas = canvas;
    
    this.map = {
      object: null,
      offset_x: 480,
      offset_y: 360,
      scale_x:  1.0,
      scale_y: -1.0
    };
    
    this.sprites_path = 'images/';
    this.sprites = {};
  },
  
  load_sprite: function(name,callback){
    this.sprites[name] = new Image;
    this.sprites[name].onload = callback || function(){};
    this.sprites[name].src = this.sprites_path + name + '.png';
  },
    
  draw_background: function(){
    this.canvas.clearRect(0,0,960,480);
  },
  
  draw_map: function(){
    for(var i = 0; i < this.map.object.data.length; i++){
      for(var j = 0; j < this.map.object.data[i].length; j++){
        var map_value = this.map.object.data[i][j];
        if(map_value){
          var map_coords = this.map2canvas(i,j);
          this.canvas.drawImage(this.sprites.ground,map_coords.x,map_coords.y);
        }
      }
    }
  },
  
  draw_characters: function(characters){
    for(var i = 0; i < characters.length; i++){
      var character = characters[i];
      var coords = this.map2canvas(character.x,character.y);
      
      var x = coords.x + character.sprite.offset_x;
      var y = coords.y + character.sprite.offset_y;
      
      this.canvas.drawImage(this.sprites[character.sprite.name],x,y);
    }
  },
  
  blit: function(){
    
  },
  
  
  
  map2canvas: function(map_x,map_y){
    var x = (map_x - map_y) *  this.map.object.tile.height     ;
    var y = (map_x + map_y) * (this.map.object.tile.height / 2);
    
    x *= this.map.scale_x;
    y *= this.map.scale_y;
    
    x += this.map.offset_x;
    y += this.map.offset_y;
    
    return {x: x, y: y};
  },
  
  canvas2map: function(cvs_x,cvs_y){
    //cvs_x += map_pos.off_x;
    //cvs_y += map_pos.off_y;
    
    console.log('o cvs vvv');
    console.log(cvs_x,cvs_y);
    
    cvs_x /= map_pos.sc_x;
    cvs_y /= map_pos.sc_y;
    
    console.log(cvs_x,cvs_y);
    
    //var y = (2 * (cvs_y - cvs.offsetTop - map_pos.off_y) - cvs_x + cvs.offsetLeft + map_pos.off_x) / 2;
    var y = (cvs_y + map_pos.off_y) - cvs_x + map_pos.off_x;
    //var x = cvs_x + y - map_pos.off_x - tile.w - cvs.offsetLeft;
    var x = cvs_x + y - map_pos.off_x - tile.w;
    
    console.log(x,y);
    
    y = Math.round(y / 54);
    x = Math.round(x / 54);
    
    console.log(x,y);
    
    
    return {x: x, y: y};
  }
  
});