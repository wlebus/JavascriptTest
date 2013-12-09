ig.module( 
	'game.entities.player' 
)
.requires(
	'impact.entity'
)
.defines(function(){


EntityPlayer = ig.Entity.extend({
	
	maxVel: {x:100, y:500},
	runspeed: 92,
	jumpspeed: 224,
	jumpThresold: 10,
	size: {x:16, y:32},
	collides: ig.Entity.COLLIDES.ACTIVE,
	animSheet: new ig.AnimationSheet( 'media/sprites/link.png', 32, 32 ),
	
	state: 0,//EntityPlayer.STATE.NONE,
	flip: false,
	
	
	init: function(x, y, settings) {
		this.addAnim( 'idle', 1.0, [0]);
		this.addAnim( 'run', 0.1, [1,2,3]);
		this.addAnim( 'attack', 1.0, [4,5], true);
		this.addAnim( 'jump', 1.0, [6], true);
		this.addAnim( 'attackDown', 1.0, [8], true);
		this.addAnim( 'attackUp', 1.0, [9], true);
		this.addAnim( 'crouch', 1.0, [11], true);
		this.addAnim( 'crouchAttack', 1.0, [12], true);
		this.parent(x, y, settings);
	},
		
	update: function() {
/*
		if (ig.input.pressed('up')) {
			this.jumpspeed += 16;
			console.log(this.jumpspeed);
		}
		if (ig.input.pressed('down')) {
			this.jumpspeed -= 16;
			console.log(this.jumpspeed);
		}
*/
		//reset state
		if (this.standing) {
			this.state = EntityPlayer.STATE.NONE;
		}
		else{
			this.state = EntityPlayer.STATE.JUMPING;
		}
		
		//adjust states based on input
		if ( ig.input.pressed('attack')) {
			this.state &= EntityPlayer.STATE.ATTACKING;
			this.vel.x = 0;
		}
		if ( ig.input.pressed('jump')) {
			if (this.standing) {
				this.state &= EntityPlayer.STATE.JUMPING;
				this.vel.y = -this.jumpspeed;
			}
		}
		if ( ig.input.state('left')) {
			this.vel.x = -this.runspeed;
			this.flip = true;
		}
		else if( ig.input.state('right')) {
			this.vel.x = this.runspeed;
			this.flip = false;
		}
		else{
			this.vel.x = 0;
		}
		
		//set anim
		if (this.state & EntityPlayer.STATE.JUMPING) {
				if(this.vel.y < this.jumpThresold){
					this.currentAnim = this.anims.jump.rewind();
				}
				else{
					this.currentAnim = this.anims.idle.rewind();
				}
		}
		if (this.state & EntityPlayer.STATE.ATTACKING) {
				this.currentAnim = this.anims.attack.rewind();
		}
		if (this.state == EntityPlayer.STATE.NONE) {
			if (this.vel.x) {
				this.currentAnim = this.anims.run;
			}
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;
		this.offset.x = this.flip?20:0;


		this.parent();
	},
	
	draw: function() {
		this.parent();
	}
});

EntityPlayer.STATE = {
	NONE: 0,
	ATTACKING: 1,
	JUMPING: 2,
	CROUCH: 4,
};

});
