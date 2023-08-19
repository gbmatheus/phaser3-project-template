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
    this.score = new Score(this, 640, 16, 0).setOrigin(0, 0.4)
    this.score2 = new Score(this, 640, 16, 1).setOrigin(0.5)
    this.score3 = new Score(this, 640, 16, 2).setOrigin(1)
    this.score4 = new Score(this, 640, 16, 3).setOrigin(0.25)
    this.score5 = new Score(this, 640, 16, 4)

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
    this.gameEndPhase = new Text(
      this,
      this.game.scale.width / 2,
      this.game.scale.height * 0.4,
      status === GameStatus.lose
        ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
        : `PARABÉNS! VOCÊ COMPLETOU O NÍVEL ${level}!\nCLIQUE PARA INICIAR O NÍVEL ${Number(level) + 1}`
      // status === GameStatus.lose
      //   ? `NÃO FOI DESSA VEZ,\n MAS VOCÊ PODE TENTAR NOVAMENTE! \nCLIQUE PARA TENTAR NOVAMENTE`
      //   : `PARABÉNS! VOCÊ COMPLETOU A FASE!\nCLIQUE PARA INICIAR A PRÓXIMA FASE`
    )
    .setAlign('center')
    .setColor(status === GameStatus.lose ? '#ff0000' : '#ffffff')
    .setLineSpacing(0)
    
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

    this.gameEndPhase.setPosition(
      this.game.scale.width / 2 - this.gameEndPhase.width / 2,
      this.game.scale.height * 0.4,
    )

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
