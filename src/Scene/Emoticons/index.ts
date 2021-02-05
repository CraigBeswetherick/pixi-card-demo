import * as PIXI from "pixi.js";
import { AbstractGameScene, SceneState } from "../Scene";
import { createBackButton } from "../../Utils/CreateButton";
import data from "../../Resources/JSON/Data.json";
import { getRandomInt } from "../../Utils/Math";
import { destroySprites } from "../../Utils/index";
import * as Constants from "../../Utils/Constants";

const SPRITES = [
  Constants.SEPHIROTH_PNG,
  Constants.CLOUD_PNG,
  Constants.VINCENT_PNG,
];

export class EmoticonsScene extends AbstractGameScene {
  private time: number = 0;
  private displayedTypes: PIXI.Sprite[] = [];

  sceneContainer: PIXI.Container;
  timer;

  setup(sceneContainer: PIXI.Container) {
    this.sceneState = SceneState.LOAD;
    this.sceneContainer = sceneContainer;

    this.backButton = createBackButton(this.sceneSwitcher);
    sceneContainer.addChild(this.backButton);

    this.createNewDisplay();
  }

  createNewDisplay = () => {
    this.displayedTypes.forEach((sprite) => {
      sprite.destroy();
    });

    this.displayedTypes = [];

    // destroy any remaining types
    this.displayedTypes = destroySprites(this.displayedTypes);
    // choose 3 new types
    let currentTypes: Array<string> = this.chooseDisplayTypes();
    // create each type
    this.createDisplayTypes(currentTypes);

    this.timer = setTimeout(this.createNewDisplay, 2000);
  };

  updateDisplay() {}

  /**  Choose 3 display types, these will define what we display. Text or Image
   * @return Array of 3 indexes specifying display type.
   **/
  chooseDisplayTypes = (): Array<string> => {
    let types: Array<string> = [];

    let i: number = 0;
    while (i <= 2) {
      types.push(Math.random() >= 0.5 ? "image" : "text");
      i++;
    }

    return types;
  };

  close() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  /** Create all display types based on type **/
  createDisplayTypes = (types: Array<string>) => {
    types.forEach((type: string, index: number) => {
      // choose a random image or text config
      const displayResult = this.chooseDisplayResult(type);
      // create the chosen result
      const result = this.createDisplayType(displayResult);
      result.x = window.innerWidth * 0.2 + 100 * index;
      result.y = window.innerHeight * 0.2;

      this.sceneContainer.addChild(result);
      this.displayedTypes.push(result);
    });
  };

  /** Choose a specific image or text result
   * @param type The type of result required, either image or text
   * @return index of the chosen text or image result from Data.json
   * **/
  chooseDisplayResult = (type: string): Object => {
    const result = {
      type,
      index: 0,
    };

    result.type = type;

    // find random result from the collection
    if (type === "image") {
      result.index = getRandomInt(0, SPRITES.length - 1);
    } else {
      result.index = getRandomInt(0, data.text.length - 1);
    }

    return result;
  };

  /* Create a display type based on type */
  createDisplayType = (displayData: any): PIXI.Sprite => {
    let sprite = new PIXI.Sprite();

    const style: PIXI.TextStyle = new PIXI.TextStyle({
      align: "center",
      dropShadow: true,
      fill: "0xff0000",
    });

    switch (displayData.type) {
      case "image":
        const image = this.createDisplayImage(displayData.index, 0, 0);
        sprite.addChild(image);
        break;

      case "text":
        const text: string = data.text[displayData.index].value;
        const textField: PIXI.Text = new PIXI.Text(text, style);
        sprite.addChild(textField);
        break;

      default:
        throw new Error("Unknown display type defined " + displayData.type);
    }

    sprite.x = window.innerWidth / 2;
    sprite.y = window.innerHeight / 2;

    return sprite;
  };

  /**
   * Create a display image
   * @param index index of the SPRITES array we want to render
   * @return new PIXI.Sprite of the chosen image
   **/

  createDisplayImage = (index: number, x: number, y: number) => {
    const image = new PIXI.Sprite(PIXI.Texture.from(SPRITES[index]));
    return image;
  };

  preTransitionUpdate(delta: number) {}

  sceneUpdate(delta: number) {}
}
