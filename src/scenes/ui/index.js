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
  }

  create () {
    console.log('create ui-scene')
    // this
    this.score = new Score(this, 640, 16, 0).setOrigin(0.2, 0.37).setPadding(0)
    this.score.setActive(false).setVisible(false)
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
    console.log('create ui-scene LEVEL GAME ', this.game.level)
    console.log({ game: this.game, scene: this.game.scene })
    
    if(level && level !== 1)
      this.game.level = Number(level)
    if(status === GameStatus.restart) {
        console.log(`Restart - level-${Number(level)}-scene`)
        this.scene.get(`level-${Number(this.game.level)}-scene`).scene.start()
        this.scene.get('movement-scene').scene.restart()        
        this.scene.restart()
    }

    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');

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
      ).setOrigin(0, 0.75)
      
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
      ).setOrigin(0, 0.75)

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
      ).setOrigin(0, 0.75)

    } else {
      this.gameEndPhase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        Number(this.game.level) === 5 ? `PARABÉNS! VOCÊ COMPLETOU TODOS OS NÍVEIS` : `PARABÉNS! VOCÊ COMPLETOU O NÍVEL ${level}!`
      )
      .setAlign('center')
      .setColor('#ffffff')
      .setLineSpacing(0)

      this.gameEndPhase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhase.width / 2,
        this.game.scale.height * 0.4,
      ).setOrigin(0, 0.75)

      if(Number(this.game.level) !== 5) {
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
        ).setOrigin(0, 0.75)
      }

    }

    this.game.scene.pause(`level-${Number(level)}-scene`)
    this.game.scene.pause('movement-scene')

    this.input.on('pointerdown', () => {
      this.game.events.off(EventName.chestLoot, this.chestLootHandler)
      this.game.events.off(EventName.gameEnd, this.gameEndHandler)
      this.game.events.off(EventName.executeSteps)
      this.game.events.off(EventName.steps)
      if(status === GameStatus.lose) {
          this.scene.get(`level-${Number(this.game.level)}-scene`).scene.restart()
          this.scene.get('movement-scene').scene.restart()
          // this.scene.restart()
      } else if(status === GameStatus.win) {
        console.log(`Pause - level-${Number(level)}-scene`)
        // this.game.scene.pause(`level-${Number(level)}-scene`)
        // this.game.scene.pause('movement-scene')
        
        console.log(`Stop - level-${Number(level)}-scene`)
        // this.scene.stop(`level-${Number(level)}-scene`)
        
        this.scene.get(`level-${Number(level)}-scene`).scene.stop()
        
        this.game.level = Number(level) + 1
        console.log(`Start - level-${this.game.level}-scene`)
        this.scene.get(`level-${this.game.level}-scene`).scene.start()
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
