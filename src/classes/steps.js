import Text from "./text";

export default class StepsCount extends Text {
  constructor(scene, x, y, initSteps = 0, limitSteps = 11) {
    super(scene, x, y, `${initSteps}/${limitSteps} Movimentos`, '20px');
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
    this.setText(`${this.stepsValue}/${this.limitSteps} Movimentos`);
  }

  getValue() {
    return this.stepsValue;
  }
}
