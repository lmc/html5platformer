var Character = Class.create({
  initialize: function(map,sprite_name){
    this.map = map;
    
    this.coords = [0,0];
    this.velocity = [0,0];
    
    this.selected = false;
    
    this.drawable_callback = function(canvas,screen_x,screen_y,renderer){
    }

    this.sprite = {
      name:   sprite_name,
      width:    1,
      height:   7,
      offset_x: 0,
      offset_y: 0,
    };
    
    this.max_velocity = 10.0;
    this.max_velocity_boost = 3.0
    this.friction = 0.45;
    this.gravity = 0.0;
  },
  
  think: function(){
    this.think_physics();
  },
  
  think_physics: function(){
    this.coords[0] += parseInt(this.velocity[0]);
    this.coords[1] += parseInt(this.velocity[1]);
    
    var new_velocity;
    if(Math.abs(this.velocity[0]) > 0.0){
      if(this.velocity[0] > 0.0){
        new_velocity = this.velocity[0] - this.friction;
        if(new_velocity < 0.0) new_velocity = 0.0;
      }else{
        new_velocity = this.velocity[0] + this.friction;
        if(new_velocity > 0.0) new_velocity = 0.0;
      }
      this.velocity[0] = new_velocity;
    }
    
    this.velocity[1] -= this.gravity;
  },
  
  controller_input: function(input){
    var velocity_boost = 1.0;
    if(Math.abs(this.velocity[0]) < this.max_velocity_boost)
      velocity_boost = this.max_velocity_boost - this.velocity[0];
    
    this.velocity[0] += input.x * velocity_boost;
    this.velocity[1] += input.y;
    
    if(this.velocity[0] > this.max_velocity)
      this.velocity[0] = this.max_velocity;
  },
  
  position_to_move_to_for_input: function(input){
  },
  
  can_move_to_position: function(coords){
  }
});