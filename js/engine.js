//THOUGHTS: Use a canvas as the background, with the 1-bit alpha used for collision/damage?
var Engine = Class.create({
  initialize: function(canvas,effects_canvas,map_loader_instance){
    this.map = null;
    this.renderer = null;
    
    this.prng_seed = 0;
    
    this.think_framerate = 60;
    this.renderer_framerate = 15;
    this.think_timer = null;
    this.renderer_timer = null;
    
    this.initialize_map(map_loader_instance);
    this.initialize_renderer(canvas,effects_canvas);
    this.initialize_controls();
  },
  
  initialize_map: function(map_loader_instance){
    this.map = new Map();
    map_loader_instance.load(this.map);
  },
  
  initialize_renderer: function(canvas,effects_canvas){
    this.renderer = new Renderer(canvas.getContext('2d'),effects_canvas.getContext('2d'));
    this.renderer.map = this.map;
    
    this.renderer.map.characters.each(function(character){
      this.renderer.load_sprite(character.sprite.name);
    },this);
  },
  
  initialize_controls: function(){
    Event.observe(window,'keydown',function(event){
      var key = String.fromCharCode(event.keyCode);
      switch(key){
        case 'W': this.get_selected_character().controller_input({x:  0.0, y:  1.0}); break;
        case 'S': this.get_selected_character().controller_input({x:  0.0, y: -1.0}); break;
        case 'A': this.get_selected_character().controller_input({x: -1.0, y:  0.0}); break;
        case 'D': this.get_selected_character().controller_input({x:  1.0, y:  0.0}); break;
      }
    }.bind(this));
  },
  
  initialize_think: function(){
    if(true){
      this.think_timer    = setInterval(this.think.bind(this),1000 / this.think_framerate);
      this.renderer_timer = setInterval(this.renderer_think.bind(this),1000 / this.renderer_framerate);
    }else{
      this.think();
      this.renderer_think();
    }
  },
  
  think: function(){
    for(var i = 0; i < this.map.characters.length; i++)
      this.map.characters[i].think();
  },
  
  renderer_think: function(){
    this.renderer.blit();
  },
  
  get_selected_character: function(){
    return this.map.characters[0];
  }
});

var BlankFunction = function(){};