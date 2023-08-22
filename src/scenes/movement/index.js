import Phaser from "phaser";
import StepsCount from "../../classes/steps";
import EventName from "../../consts/event-name";
import DirectionPlayer from "../../consts/direction";
import Text from "../../classes/text";
import ReturnButton from "../../assets/buttons/Icon_Return.png";
import ArrowUp from "../../assets/buttons/Icon_ArrowUp.png";
import ArrowDown from "../../assets/buttons/Icon_ArrowDown.png";
import ArrowLeft from "../../assets/buttons/Icon_ArrowLeft.png";
import ArrowRight from "../../assets/buttons/Icon_ArrowRight.png";
import Play from "../../assets/buttons/Icon_Tube.png";
import Trash from "../../assets/buttons/Icon_Trash.png";
// import Zone from "../../assets/buttons/Item2.png";
import Zone from "../../assets/buttons/Item2_2.png";
import StepsZone from "../../assets/buttons/Item6.png";
import directions from "../../consts/direction";
import gameStatus from "../../consts/game-status";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("movement-scene");
    // super({ key: "movement-scene", active: true });
    // super({ key: "movement-scene", active: true, visible: false });
    this.buttons = [];
    this.selectButtonIndex = 0;
    this.steps = [];
    this.stepsLimit = 11;
    this.executeStepsStatus = "WAIT";
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image("arrow_restart", ReturnButton);
    this.load.image("arrow_up", ArrowUp);
    this.load.image("arrow_down", ArrowDown);
    this.load.image("arrow_left", ArrowLeft);
    this.load.image("arrow_right", ArrowRight);
    this.load.image("play", Play);
    this.load.image("trash", Trash);
    this.load.image("zone", Zone)
    this.load.image("steps_zone", StepsZone)
  }

  create() {
    const { width, height } = this.scale;
    const scaleButton = 0.2;
    console.log('movement-scene ', { width, height, maxSteps: this.game.maxSteps })

    // mapa - 640 x 480
    // zona de largar o botão
    this.zone = this.add.zone(24, 480, 528, 60).setDropZone();
    this.zoneImage = this.add.image(24, 480, 'zone').setDisplaySize(528, 60).setOrigin(0).setInteractive();
    this.zoneImage.input.dropZone = true;

    const stepsContainerImage = this.add.image(0, this.zoneImage.y + this.zoneImage.displayHeight + 20, 'steps_zone').setDisplaySize(736, 80).setOrigin(0)
    this.zoneImage.input.dropZone = true;

    this.iconReturn = this.add
    .image(640, 48, "arrow_restart")
    .setScale(scaleButton);
    this.iconReturn.setName("restart");
    this.iconReturn.setInteractive();
    this.iconReturn.on("pointerover", () => {
        this.iconReturn.setTint(0xE3B4B2);
      })
      .on("pointerout", () => {
        this.iconReturn.setTint();
      })
      // .on("pointerdown", () => {
      //   console.log("RESTART click");
      //   this.iconReturn.setTint(0x66ff7f);
      //   this.stepsCount.changeValue('SET_VALUE', 0)
      //   this.game.events.emit(EventName.executeSteps, "RESTART", { steps: [] });
      //   // this.scene.start('loading-scene')
      // })
      .on("pointerup", () => {
        // this.scene.restart()
        this.steps = []
        this.game.events.emit(EventName.gameEnd, { status: gameStatus.restart })
      })

    this.stepsImageObject = this.add.group();

    let moveIcon = false;
    this.iconArrowUp = this.add
      .image(0, 0, "arrow_up")
      .setScale(scaleButton);
    this.iconArrowUp.setName(directions.up);
    this.iconArrowUp.setInteractive();
    this.iconArrowUp.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  this.iconArrowUp);
        this.iconArrowUp.setTint(0xfffff0);
        let x = this.zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + this.iconArrowUp.displayWidth;
        }
        
        if(this.stepsImageObject.getChildren().length < this.game.maxSteps) {
          let stepImageObject = this.add
            .image(x, this.zone.y, this.iconArrowUp.texture.key)
            .setScale(scaleButton).setOrigin(0, -0.1)
    
          this.steps.push(this.iconArrowUp.name);
          // this.stepsImageObject.add(stepImageObject.getChildren())
          this.stepsImageObject.add(stepImageObject);
          this.stepsCount.changeValue('INCREASE', 1)
          console.log("stepsImageObject after add step ", {
            stepsImageObject: this.stepsImageObject.getChildren(),
          });
          stepImageObject.on("pointerdown", (event) => {
            console.log({event, stepImageObject});
            //  Then destroy it. This will fire a 'destroy' event that the Group will hear
            //  and then it'll automatically remove itself from the Group.
            console.log("stepsImageObject before delete step ", {
              stepImageObject: this.stepsImageObject.getChildren(),
            });
            const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
            console.log({indexStepDestroy})
            let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            stepImageObject.destroy();
            this.stepsCount.changeValue('DECREASE', 1)
  
            for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
              if(this.stepsImageObject.getChildren()[index])
              {
                console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
                nextStepPositionX = this.stepsImageObject.getChildren()[index].x
                this.stepsImageObject.getChildren()[index].setX(positionX)
                positionX = nextStepPositionX
              }
            }
            console.log("stepsImageObject after delete step ", {
              stepsImageObject: this.stepsImageObject.getChildren(),
            });
          })
          .on("pointerover", () => {
            stepImageObject.setTint(0xfff000);
          }).on("pointerout", () => {
            stepImageObject.setTint();
          })
          .setInteractive();
        } else {
          alert("Você atingiu o número máximo de movimentos.")
        }
      }
    })

    this.iconArrowDown = this.add
      .image(
        this.iconArrowUp.x + this.iconArrowUp.displayWidth + 16,
        this.iconArrowUp.y,
        "arrow_down"
      )
      .setScale(scaleButton);
    this.iconArrowDown.setName(directions.down);
    this.iconArrowDown.setInteractive();
    this.iconArrowDown.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  this.iconArrowDown);
        this.iconArrowDown.setTint(0xfffff0);
        let x = this.zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + this.iconArrowDown.displayWidth;
        }
        
        if(this.stepsImageObject.getChildren().length < this.game.maxSteps) {
          let stepImageObject = this.add
            .image(x, this.zone.y, this.iconArrowDown.texture.key)
            .setScale(scaleButton).setOrigin(0, -0.1)
    
          this.steps.push(this.iconArrowDown.name);
          // this.stepsImageObject.add(stepImageObject.getChildren())
          this.stepsImageObject.add(stepImageObject);
          this.stepsCount.changeValue('INCREASE', 1)

          console.log("stepsImageObject after add step ", {
            stepsImageObject: this.stepsImageObject.getChildren(),
          });
          stepImageObject.on("pointerdown", (event) => {
            console.log({event, stepImageObject});
            //  Then destroy it. This will fire a 'destroy' event that the Group will hear
            //  and then it'll automatically remove itself from the Group.
            console.log("stepsImageObject before delete step ", {
              stepImageObject: this.stepsImageObject.getChildren(),
            });
            const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
            console.log({indexStepDestroy})
            let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            stepImageObject.destroy();
            this.stepsCount.changeValue('DECREASE', 1)

            for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
              if(this.stepsImageObject.getChildren()[index])
              {
                console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
                nextStepPositionX = this.stepsImageObject.getChildren()[index].x
                this.stepsImageObject.getChildren()[index].setX(positionX)
                positionX = nextStepPositionX
              }
            }
            console.log("stepsImageObject after delete step ", {
              stepsImageObject: this.stepsImageObject.getChildren(),
            });
          })
          .on("pointerover", () => {
            stepImageObject.setTint(0xfff000);
          }).on("pointerout", () => {
            stepImageObject.setTint();
          })
          .setInteractive();
        }  else {
          alert("Você atingiu o número máximo de movimentos.")
        }

      }
    })

    this.iconArrowLeft = this.add
      .image(
        this.iconArrowDown.x + this.iconArrowDown.displayWidth + 16,
        this.iconArrowDown.y,
        "arrow_left"
      )
      .setScale(scaleButton);
    this.iconArrowLeft.setName(directions.left);
    this.iconArrowLeft.setInteractive();
    this.iconArrowLeft.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  this.iconArrowLeft);
        this.iconArrowLeft.setTint(0xfffff0);
        let x = this.zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + this.iconArrowLeft.displayWidth;
        }
        if(this.stepsImageObject.getChildren().length < this.game.maxSteps) {
  
        let stepImageObject = this.add
          .image(x, this.zone.y, this.iconArrowLeft.texture.key)
          .setScale(scaleButton).setOrigin(0, -0.1)
  
        this.steps.push(this.iconArrowLeft.name);
        // this.stepsImageObject.add(stepImageObject.getChildren())
        this.stepsImageObject.add(stepImageObject);
        this.stepsCount.changeValue('INCREASE', 1)

        console.log("stepsImageObject after add step ", {
          stepsImageObject: this.stepsImageObject.getChildren(),
        });
        stepImageObject.on("pointerdown", (event) => {
          console.log({event, stepImageObject});
          //  Then destroy it. This will fire a 'destroy' event that the Group will hear
          //  and then it'll automatically remove itself from the Group.
          console.log("stepsImageObject before delete step ", {
            stepImageObject: this.stepsImageObject.getChildren(),
          });
          const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
          console.log({indexStepDestroy})
          let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
          let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
          stepImageObject.destroy();
          this.stepsCount.changeValue('DECREASE', 1)

          for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
            if(this.stepsImageObject.getChildren()[index])
            {
              console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
              nextStepPositionX = this.stepsImageObject.getChildren()[index].x
              this.stepsImageObject.getChildren()[index].setX(positionX)
              positionX = nextStepPositionX
            }
          }
          console.log("stepsImageObject after delete step ", {
            stepsImageObject: this.stepsImageObject.getChildren(),
          });
        })
        .on("pointerover", () => {
            stepImageObject.setTint(0xfff000);
          }).on("pointerout", () => {
            stepImageObject.setTint();
          })
        .setInteractive();
        }  else {
          alert("Você atingiu o número máximo de movimentos.")
        }
      }
    })

    this.iconArrowRight = this.add
      .image(
        this.iconArrowLeft.x + this.iconArrowLeft.displayWidth + 16,
        this.iconArrowLeft.y,
        "arrow_right"
      )
      .setScale(scaleButton);
    this.iconArrowRight.setName(directions.right);
    this.iconArrowRight.setInteractive();
    this.iconArrowRight.on("pointerup", (pointer) => {
      if(pointer.downX === pointer.upX && pointer.downY === pointer.upY && !moveIcon)
      {
        console.log("pointer ", pointer)
        console.log("click arrow_up ",  this.iconArrowRight);
        this.iconArrowRight.setTint(0xfffff0);
        let x = this.zoneImage.x;
        if (this.stepsImageObject.getLength() > 0) {
          const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
          x = lastStep.x + this.iconArrowRight.displayWidth;
        }
        if(this.stepsImageObject.getChildren().length < this.game.maxSteps) {
          
          let stepImageObject = this.add
            .image(x, this.zone.y, this.iconArrowRight.texture.key)
            .setScale(scaleButton).setOrigin(0, -0.1)
    
          this.steps.push(this.iconArrowRight.name);
          // this.stepsImageObject.add(stepImageObject.getChildren())
          this.stepsImageObject.add(stepImageObject);
          this.stepsCount.changeValue('INCREASE', 1)

          console.log("stepsImageObject after add step ", {
            stepsImageObject: this.stepsImageObject.getChildren(),
          });
          stepImageObject.on("pointerdown", (event) => {
            console.log({event, stepImageObject});
            //  Then destroy it. This will fire a 'destroy' event that the Group will hear
            //  and then it'll automatically remove itself from the Group.
            console.log("stepsImageObject before delete step ", {
              stepImageObject: this.stepsImageObject.getChildren(),
            });
            const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
            console.log({indexStepDestroy})
            let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            stepImageObject.destroy();
            this.stepsCount.changeValue('DECREASE', 1)

            for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
              if(this.stepsImageObject.getChildren()[index])
              {
                console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
                nextStepPositionX = this.stepsImageObject.getChildren()[index].x
                this.stepsImageObject.getChildren()[index].setX(positionX)
                positionX = nextStepPositionX
              }
            }
            console.log("stepsImageObject after delete step ", {
              stepsImageObject: this.stepsImageObject.getChildren(),
            });
          })
          .on("pointerover", () => {
            stepImageObject.setTint(0xfff000);
          }).on("pointerout", () => {
            stepImageObject.setTint();
          })
          .setInteractive();
        }  else {
          alert("Você atingiu o número máximo de movimentos.")
        }
      }
    })

    this.iconDelete = this.add.image(
        this.iconArrowRight.x + this.iconArrowRight.displayWidth + 64, this.iconArrowRight.y,
        "trash").setOrigin(0.5)
      .setScale(scaleButton);
    console.log("iconDelete ",{ x: this.iconDelete.x + this.iconDelete.displayWidth + 64, y: this.iconDelete.y })
    this.iconDelete.setName("delete");
    this.iconDelete.setInteractive({ pixelPerfect: true });
    this.iconDelete
      .on("pointerover", () => {
        console.log("delete over");
        this.iconDelete.setTint(0xE3B4B2);
      })
      .on("pointerout", () => {
        console.log("delete out");
        this.iconDelete.setTint();
      })
      .on("pointerdown", () => {
        console.log("delete click");
        this.iconDelete.setTint(0x66ff7f);
        this.stepsCount.changeValue('SET_VALUE', 0)
        this.game.events.emit(EventName.executeSteps, "RESTART", { steps: [] });
        // this.scene.start('loading-scene')
      });


    this.iconPlay = this.add.image(this.zone.x + this.zone.displayWidth + 32, this.zone.y + 32, "play").setScale(scaleButton);
    this.iconPlay.setName("play");
    this.iconPlay.setInteractive({ pixelPerfect: true });
    this.iconPlay
      .on("pointerover", () => {
        console.log("play over");
        this.iconPlay.setTint(0xE3B4B2);
      })
      .on("pointerout", () => {
        console.log("play out");
        this.iconPlay.setTint();
      })
      .on("pointerdown", () => {
        this.game.executeCommands = true
        this.iconArrowUp.disableInteractive()
        this.iconArrowDown.disableInteractive()
        this.iconArrowLeft.disableInteractive()
        this.iconArrowRight.disableInteractive()
        this.iconPlay.disableInteractive()
        this.iconDelete.disableInteractive()

        this.zone.disableInteractive()
        this.zoneImage.disableInteractive()
        
        this.stepsImageObject.getChildren().forEach(stepsImage => {
          stepsImage.disableInteractive()
        });
        console.log("play click");
        this.iconPlay.setTint(0x66ff7f);
        this.game.events.emit(EventName.executeSteps, "EXECUTE", {
          steps: this.steps,
        });
        // this.scene.start('loading-scene')
      });

    this.stepsCount = new StepsCount(this, this.iconDelete.x + this.iconDelete.displayWidth + 64, this.iconDelete.y, 0, this.stepsLimit).setOrigin(0.25, 0.65)
      

    this.input.setDraggable([
      this.iconArrowUp,
      this.iconArrowDown,
      this.iconArrowLeft,
      this.iconArrowRight,
    ]);

    const container = this.add.container(stepsContainerImage.displayWidth * 0.25, stepsContainerImage.y + (stepsContainerImage.displayHeight / 2.2)  , [
      this.iconArrowUp,
      this.iconArrowDown,
      this.iconArrowLeft,
      this.iconArrowRight,
      this.iconDelete,
      this.stepsCount
    ]);

    this.input.on("dragstart", (pointer, gameObject) => {
      console.log("button dragstart")
      gameObject.setTint(0xff0000);
    });

    // this.input.on('dragstart', function (pointer, gameObject)
    // {
    //     // coloca o ultimo objeto/image/sprite no topo
    //     this.children.bringToTop(gameObject);

    // }, this);

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragenter", (pointer, gameObject, dropZone) => {
      this.zoneImage.setTint(0xDFA19A)
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.clearTint();
      this.zoneImage.clearTint()
    });

    this.input.on("dragleave", (pointer, gameObject, dropZone) => {
      this.zoneImage.clearTint()
    });

    this.input.on("drop", (pointer, gameObject, dropZone) => {
      let x = dropZone.x;
      console.log({ dropZoneX: dropZone.x });
      if (this.stepsImageObject.getLength() > 0) {
        console.log({ displayWidth: gameObject.displayWidth });
        const lastStep = this.stepsImageObject.getChildren().slice(-1)[0]
        console.log({lastStep})
        console.log("Result ", this.stepsImageObject.getChildren().length * gameObject.displayWidth + 20)
        console.log("Result ", lastStep.x + gameObject.displayWidth)
        console.log("Result ", lastStep.x + lastStep.displayWidth)
        // x = dropZone.x + (this.stepsImageObject.getChildren().length * gameObject.displayWidth + 20);
        x = lastStep.x + gameObject.displayWidth;
      }

      console.log({ steps: this.steps });
      // console.log({gameObject})
      // gameObject.x = x;
      // gameObject.y = dropZone.y;
      gameObject.clearTint();
      gameObject.x = gameObject.input.dragStartX;
      gameObject.y = gameObject.input.dragStartY;

      // gameObject.input.enabled = false;
      // const container = this.add.container(20, 50, [iconArrowUp, iconArrowDown, iconArrowLeft, iconArrowRight]).add
        if(this.stepsImageObject.getChildren().length < this.game.maxSteps) {
          let stepImageObject = this.add
            .image(x, dropZone.y, gameObject.texture.key)
            .setScale(scaleButton).setOrigin(0, -0.1)

          this.steps.push(gameObject.name);
          // this.stepsImageObject.add(stepImageObject.getChildren())
          this.stepsImageObject.add(stepImageObject);
          this.stepsCount.changeValue('INCREASE', 1)

          console.log("stepsImageObject after add step ", {
            stepsImageObject: this.stepsImageObject.getChildren(),
          });
          stepImageObject.on("pointerover", () => {
            stepImageObject.setTint(0xfff000);
          }).on("pointerout", () => {
            stepImageObject.setTint();
          }).on("pointerdown", (event) => {
            console.log({event, stepImageObject});
            //  Then destroy it. This will fire a 'destroy' event that the Group will hear
            //  and then it'll automatically remove itself from the Group.
            console.log("stepsImageObject before delete step ", {
              stepImageObject: this.stepsImageObject.getChildren(),
            });
            const indexStepDestroy = this.stepsImageObject.getChildren().findIndex(step => step.x === stepImageObject.x)
            console.log({indexStepDestroy})
            let positionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            let nextStepPositionX = this.stepsImageObject.getChildren()[indexStepDestroy].x;
            stepImageObject.destroy();
            this.stepsCount.changeValue('DECREASE', 1)

            for (let index = indexStepDestroy; index < this.stepsImageObject.getChildren().length; index++) {
              if(this.stepsImageObject.getChildren()[index])
              {
                console.log({ actualStep: this.stepsImageObject.getChildren()[index], nextStep: this.stepsImageObject.getChildren()[index] })
                nextStepPositionX = this.stepsImageObject.getChildren()[index].x
                this.stepsImageObject.getChildren()[index].setX(positionX)
                positionX = nextStepPositionX
              }
            }
            console.log("stepsImageObject after delete step ", {
              stepsImageObject: this.stepsImageObject.getChildren(),
            });
          })
          .setInteractive();
        }  else {
          alert("Você atingiu o número máximo de movimentos.")
        }
      this.zoneImage.clearTint()
    });

    this.input.on("dragend", (pointer, gameObject, dropped) => {
      console.log(dropped);
      if (!dropped) {
        gameObject.clearTint();
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
      this.zoneImage.clearTint()
    });

    this.initListeners();
  }

  executeStepsHandler(event) {
    console.log("Movement executeSH " + event);
    console.log({ stepsImageObject: this.stepsImageObject });
    if (event === "STOP") {
      console.log("asdasdasdasda")
      this.steps = [];
      this.executeStepsStatus = "STOP";
    }
    
    if (event === "RESTART") {
      this.steps = [];
      this.executeStepsStatus = "RESTART";
    }
  }

  initListeners() {
    this.game.events.on(EventName.executeSteps, this.executeStepsHandler, this);
  }

  update() {
    if (this.executeStepsStatus == "STOP" && this.steps.length === 0) {
      this.stepsImageObject.getChildren().forEach((image) => {
        image.destroy();
        this.game.events.emit(EventName.gameEnd, { status: gameStatus.lose })
      });

      if (this.stepsImageObject.getChildren().length === 0)
        this.executeStepsStatus = "WAIT";
    }

     if (this.executeStepsStatus == "RESTART" && this.steps.length === 0) {
      this.stepsImageObject.getChildren().forEach((image) => {
        image.destroy();
      });

      if (this.stepsImageObject.getChildren().length === 0)
        this.executeStepsStatus = "WAIT";
    }    
  }
}
