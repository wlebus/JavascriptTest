ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	
	'plugins.impactEvents',

	'game.entities.player',
	
	'game.levels.start',
	'game.levels.town-basement'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	bgSnd: new ig.Sound('media/music/Above_Ground_BGM.ogg'),
	player: null,
	
	init: function() {
		
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.W, 'up');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.S, 'down');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.A, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.D, 'right');

		ig.input.bind( ig.KEY.SPACE, 'jump');
		ig.input.bind( ig.KEY.PERIOD, 'jump');

		ig.input.bind( ig.KEY.COMMA, 'attack');
		
		this.gravity = 688;
		this.loadLevel( LevelTownBasement );
		//this.loadLevel( LevelStart );
		ig.music.add('media/music/Above_Ground_BGM.ogg');
		ig.music.volume = 0.5;
		//ig.music.play();

		var settings = [];
		this.player = this.spawnEntity( 'EntityPlayer', 400, 148, settings );
	},
	
	update: function() {
/*
		if (ig.input.pressed('left')) {
			this.gravity -= 16;
			console.log(this.gravity);
		}
		if (ig.input.pressed('right')) {
			this.gravity += 16;
			console.log(this.gravity);
		}
*/

		this.screen.x = this.player.pos.x-ig.system.width/2;
		if (this.screen.x < 0) {
			this.screen.x = 0;//code
		}
		if (this.screen.x > this.backgroundMaps[0].pxWidth-ig.system.width) {
			this.screen.x = this.backgroundMaps[0].pxWidth-ig.system.width;
		}

		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 30, 320, 208, 2 );

});
