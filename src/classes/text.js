import Phaser, { GameObjects } from "phaser";

export default class Text extends GameObjects.Text {
  constructor(scene, x, y, text, fontSize = '24px') {
    console.log(scene)
    super(scene, x, y, text, {
      fontSize: fontSize,
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4
    });
    this.setPadding({ x: 0, y: 0 })
    this.setOrigin(0, 0)
    scene.add.existing(this)
  }
}