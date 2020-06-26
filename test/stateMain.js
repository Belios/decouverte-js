var StateMain = {

  preload: function () {
    game.load.spritesheet('sonic', 'allsonicsprite.png', 24, 32);
  },

  create: function () {
    this.speed=2;
    this.sonic=game.add.sprite(game.world.centerX,game.world.centerY,"sonic");
    this.sonic.anchor.set(0.5,0.5);
    this.sonic.animations.add('down', [0,1,2,3], 12,true);

    this.sonic.animations.play('down');
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        this.sonic.x-=this.speed;
        this.sonic.animations.play('left');
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      this.sonic.x+=this.speed;
      this.sonic.play('right');

    } else
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
      this.sonic.y-=this.speed;
      this.sonic.play('up');

    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
      this.sonic.y+=this.speed;
      this.sonic.play('down');
    }
    else {
      this.sonic.play('stay');
    }
  }
}
