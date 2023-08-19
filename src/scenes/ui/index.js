import Phaser from "phaser";
import Score from "../../classes/score";
import EventName from "../../consts/event-name";
import GameStatus from "../../consts/game-status";
import Text from "../../classes/text";
import iconPlay from "../../assets/buttons/Icon_Play.png";
import gameStatus from "../../consts/game-status";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('ui-scene')
    // super({ key: 'ui-scene', active: true})
    this.level = 1;
  }

  create () {
    console.log('create ui-scene ')
    // this
    this.score = new Score(this, 640, 16, 0).setOrigin(0.3, 0.42).setPadding(0)
    this.score = new Score(this, 640, 16, 0).setOrigin(0.3, 0.42).setPadding(0)
    this.score2 = new Score(this, 640, 16, 1).setOrigin(0.5).setPadding(1)
    this.score3 = new Score(this, 640, 16, 2).setOrigin(1).setPadding(0)
    this.score4 = new Score(this, 640, 16, 3).setOrigin(0.4).setPadding(0)
    this.score5 = new Score(this, 640, 16, 4).setPadding(0)

    // if(this.level == 1) this.score.setActive(false).setVisible(false)
    this.initListeners()
  }

  chestLootHandler () {
    console.log({scene: this.scene})
    this.score.changeValue('INCREASE', 1)
    console.log({ score: this.score.getValue(), winScore: this.score.getValue() === 3 })
    // if(this.score.getValue() === 3) {
    //   this.game.events.emit(EventName.gameEnd, { status: gameStatus.win })
    // }
  }

  gameEndHandler ({status, level}) {
    console.log({status, level})
    console.log({ game: this.game, scene: this.game.scene })
    
    if(this.level !== 1)
      this.level = Number(level)
    if(status === GameStatus.restart) {
        console.log(`Restart - level-${Number(level)}-scene`)
        this.scene.get(`level-${Number(this.level)}-scene`).scene.start()
        this.scene.get('movement-scene').scene.restart()        
        this.scene.restart()
    }

    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
    console.log("this.game.scale ", this.game.scale)
    console.log("this.game.scale ", this.game.scale.width)
    console.log("this.game.scale ", this.game.scale.height)
    console.log("this.game.scale ",this.game.scale.width / 2)
    console.log("this.game.scale ",  this.game.scale.height * 0.4)

    if(status === GameStatus.lose) {
      this.gameEndPhase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
         'NÃO FOI DESSA VEZ'
      )
      .setAlign('center')
      .setColor('#ff0000')
      .setLineSpacing(0)
      
      this.gameEndPhase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase.width / 2,
        this.game.scale.height * 0.4,
      )
      
      this.gameEndPhase2 = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
         'MAS VOCÊ PODE TENTAR NOVAMENTE!'
      )
      .setAlign('center')
      .setColor('#ff0000')
      .setLineSpacing(0)
      
      this.gameEndPhase2.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase2.width / 2,
        this.game.scale.height * 0.4 + 30,
      )

      this.gameEndPhase3 = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
         'CLIQUE PARA TENTAR NOVAMENTE'
      )
      .setAlign('center')
      .setColor('#ff0000')
      .setLineSpacing(0)
      
      this.gameEndPhase3.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase3.width / 2,
        this.game.scale.height * 0.4 + 60,
      )

      this.gameEndPhase4 = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
         'CLIQUE PARA TENTAR NOVAMENTE -- 4'
      )
      .setAlign('center')
      .setColor('#ff0000')
      .setLineSpacing(0)
      
      this.gameEndPhase4.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase4.width / 2,
        this.game.scale.height * 0.4 + 60,
      ).setOrigin(1)

      this.gameEndPhase6 = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
         'CLIQUE PARA TENTAR NOVAMENTE ---- 6'
      )
      .setAlign('center')
      .setColor('#ff0000')
      .setLineSpacing(0)
      
      this.gameEndPhase6.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase6.width / 2,
        this.game.scale.height * 0.4 + 60,
      ).setOrigin(0.5)

      this.gameEndPhase5 = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
         'CLIQUE PARA TENTAR NOVAMENTE ----5'
      )
      .setAlign('center')
      .setColor('#ff0000')
      .setLineSpacing(0)
      
      this.gameEndPhase5.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase5.width / 2,
        this.game.scale.height * 0.4 + 60,
      )

      
      console.log("this.game.scale ", this.gameEndPhase.height)  
      console.log("this.game.scale ", this.gameEndPhase2.height)  
      console.log("this.game.scale ", this.gameEndPhase3.height)  

      new Text(
        this,
        20,
        20,
        ['NÃO FOI DESSA VEZ', 'MAS VOCÊ PODE TENTAR NOVAMENTE!', 'CLIQUE PARA TENTAR NOVAMENTE']
        // status === GameStatus.lose
        //   ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        //   : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
      )
      .setAlign('center')
      .setColor('#fff000')
      .setLineSpacing(1)

      new Text(
        this,
        20,
        40,
        ['NÃO FOI DESSA VEZ', 'MAS VOCÊ PODE TENTAR NOVAMENTE!', 'CLIQUE PARA TENTAR NOVAMENTE']
        // status === GameStatus.lose
        //   ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        //   : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
      )
      .setAlign('center')
      .setColor('#ff0ff0')
      .setLineSpacing(1.5)

      new Text(
        this,
        20,
        60,
        ['NÃO FOI DESSA VEZ', 'MAS VOCÊ PODE TENTAR NOVAMENTE!', 'CLIQUE PARA TENTAR NOVAMENTE']
        // status === GameStatus.lose
        //   ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        //   : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
      )
      .setAlign('center')
      .setColor('#000fff')
      .setLineSpacing(2)

      new Text(
        this,
        20,
        80,
        ['NÃO FOI DESSA VEZ', 'MAS VOCÊ PODE TENTAR NOVAMENTE!', 'CLIQUE PARA TENTAR NOVAMENTE']
        // status === GameStatus.lose
        //   ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        //   : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
      )
      .setAlign('center')
      .setColor('#00ffff')
      .setLineSpacing(0.5)

      new Text(
        this,
        20,
        100,
        ['NÃO FOI DESSA VEZ', 'MAS VOCÊ PODE TENTAR NOVAMENTE!', 'CLIQUE PARA TENTAR NOVAMENTE']
        // status === GameStatus.lose
        //   ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        //   : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
      )
      .setAlign('center')
      .setColor('#00ff00')
      .setLineSpacing(0.75)

    } else {
      this.gameEndPhase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        `PARABÉNS! VOCÊ COMPLETOU O NÍVEL ${level}!`
      )
      .setAlign('center')
      .setColor('#ffffff')
      .setLineSpacing(0)

      this.gameEndPhase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase.width / 2,
        this.game.scale.height * 0.4,
      )

      this.gameEndPhase2 = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        `CLIQUE PARA INICIAR O NÍVEL ${Number(level) + 1}`
      )
      .setAlign('center')
      .setColor('#ffffff')
      .setLineSpacing(0)

      this.gameEndPhase2.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase2.width / 2,
        this.game.scale.height * 0.4 + 30,
      )
    }

    this.game.scene.pause(`level-${Number(level)}-scene`)
    this.game.scene.pause('movement-scene')

    this.input.on('pointerdown', () => {
      this.game.events.off(EventName.chestLoot, this.chestLootHandler)
      this.game.events.off(EventName.gameEnd, this.gameEndHandler)
      this.game.events.off(EventName.executeSteps)
      this.game.events.off(EventName.steps)
      if(status === GameStatus.lose) {
          this.scene.get(`level-${Number(this.level)}-scene`).scene.restart()
          this.scene.get('movement-scene').scene.restart()
          // this.scene.restart()
      } else if(status === GameStatus.win) {
        console.log(`Pause - level-${Number(level)}-scene`)
        // this.game.scene.pause(`level-${Number(level)}-scene`)
        // this.game.scene.pause('movement-scene')
        
        console.log(`Stop - level-${Number(level)}-scene`)
        // this.scene.stop(`level-${Number(level)}-scene`)
        this.scene.get(`level-${Number(level)}-scene`).scene.stop()

        console.log(`Start - level-${Number(level) + 1}-scene`)
        this.scene.get(`level-${Number(level) + 1}-scene`).scene.start()
        this.scene.get('movement-scene').scene.restart()        
      }
      this.scene.restart()
    })
  }

  initListeners() {
    this.game.events.on(EventName.gameEnd, this.gameEndHandler, this)
    this.game.events.on(EventName.chestLoot, this.chestLootHandler, this)
  }
}
