import Text from "./text";

export default class StepsCount extends Text {
  constructor(scene, x, y, initSteps = 0, limitSteps = 11) {
    super(scene, x, y, `Movimentos\n${initSteps}/${limitSteps}`, '1.5rem');
    scene.add.existing(this);
    this.stepsValue = initSteps;
    this.limitSteps = limitSteps;
  }

  changeValue(operation, value) {
    switch (operation) {
      case "INCREASE":
        this.stepsValue += value;
        break;
      case "DECREASE":
        this.stepsValue -= value;
        break;
      case "SET_VALUE":
        this.stepsValue = value;
        break;
      default:
        break;
    }
    this.setText(`Movimentos\n${this.stepsValue}/${this.limitSteps}`);
  }

  getValue() {
    return this.stepsValue;
  }
}
