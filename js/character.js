var Character = Class.create({
  initialize: function(map,sprite_name){
    this.map = map;
    
    this.coords = [0,0];
    this.velocity = [0,0];
    
    this.grounded = false;
    
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
    this.gravity = -0.2;
  },
  
  think: function(){
    this.think_collision();
    this.think_physics();
  },
  
  hitbox_bounds: function(x,y){
    return {x1: x, y1: y, x2: (x + this.sprite.width), y2: (y + this.sprite.height)};
  },
  
  think_collision: function(){
    var old_x = this.coords[0];
    var old_y = this.coords[1];
    var new_x = this.coords[0] + parseInt(this.velocity[0]);
    var new_y = this.coords[1] + parseInt(this.velocity[1]);
    var bounds = this.hitbox_bounds(new_x,new_y);
    
    var dx = old_x - new_x;
    var dy = old_y - new_y;
    
    //FIXME: Need fast efficient pixel-based collision detection with ejection
    if(this.map.data[bounds.x2][bounds.y2]){
      this.velocity[0] = 0.0;
      this.velocity[1] = 0.0;
      this.grounded = true;
    }else{
      this.grounded = false;
    }
    
    this.coords[0] = new_x;
    this.coords[1] = new_y;
  },
  
  think_physics: function(){
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
    
    if(!this.grounded){
      this.velocity[1] -= this.gravity;
    }
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