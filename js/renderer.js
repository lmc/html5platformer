var Renderer = Class.create({
  
  initialize: function(canvas,effects_canvas,options){
    options = options || {};
    
    this.target_fps = 15;
    this.blit_timer = null;
    
    this.canvases = {
      main:    canvas,
      effects: effects_canvas
    }
    this.canvas = this.canvases.main;
    
    this.effects = [];
    this.selected_effect = null;
    this.selected_coordinates = [null,null];
    
    this.camera_focus_target = null; //OR {x: world_pos, y: world_pos}
    
    this.map = null;
    this.map_image = null;
    
    this.canvas_size = {
      width:  480,
      height: 320
    };
    
    this.map_render_data = {
      offset_x: 0,
      offset_y: 0,
      scale_x:  1.0,
      scale_y:  1.0
    };
    
    this.sprites_path = 'images/';
    this.sprites = {};
  },
  
  //TODO: See if keeping sprites as native canvas elements is faster?
  load_sprite: function(name,callback){
    this.sprites[name] = new Image;
    this.sprites[name].onload = callback || function(){};
    this.sprites[name].src = this.sprites_path + name + '.png';
    return this.sprites[name];
  },
  
  create_effect: function(){
    var effect = new Effect(this);
    this.effects.push(effect);
    return effect;
  },
  
  before_blit: function(){
    if(this.camera_focus_target){
      this.focus_camera(this.camera_focus_target.x,this.camera_focus_target.y);
      this.camera_focus_target = null;
    }
  },
    
  draw_background: function(){
    this.canvas.clearRect(0,0,960,640);
  },
  
  draw_map: function(){
    this.canvas.drawImage(this.map_image,0,0);
  },
  
  draw_characters: function(){
    for(var i = 0; i < this.map.characters.length; i++){
      var character = this.map.characters[i];
      this.canvas.drawImage(this.sprites[character.sprite.name],character.coords[0],character.coords[1]);
    }
  },
  
  blit: function(){
    this.before_blit();
    this.draw_background();
    this.draw_map();
    this.draw_characters();
  },
  
  target_framerate_for_timer: function(){
    return 1000 / this.target_fps;
  },
  
  focus_camera: function(x,y,scroll_time){
    var to_offset = this.map2canvas(x,y);
    
    this.map_render_data.offset_x -= to_offset.x;
    this.map_render_data.offset_y -= to_offset.y;
    
    this.map_render_data.offset_x += (this.canvas_size.width / 2);
    this.map_render_data.offset_y += (this.canvas_size.height / 2);
  },
  
  map2canvas: function(x,y){
    return {
      x: x * this.map_render_data.scale_x,
      y: y * this.map_render_data.scale_y
    };
  },
  
  //also returns the bottom corner as x2,y2
  map2canvas2: function(x,y){
    return {
      x:  x * this.map_render_data.scale_x,
      y:  y * this.map_render_data.scale_y,
      x2: (x + 1) * this.map_render_data.scale_x,
      y2: (y + 1) * this.map_render_data.scale_y,
    };
  }
  
});