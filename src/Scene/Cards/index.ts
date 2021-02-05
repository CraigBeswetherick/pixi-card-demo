import * as PIXI from "pixi.js";
import { gsap, TweenMax } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

import { AbstractGameScene, SceneState } from "../Scene";
import { createBackButton } from "../../Utils/CreateButton";

import * as Constants from "../../Utils/Constants";

export class CardsScene extends AbstractGameScene {
  cardList: PIXI.Sprite[] = [];
  sceneContainer: PIXI.Container;
  staticContainer: PIXI.Container;
  animatedContainer: PIXI.Container;

  setup(sceneContainer: PIXI.Container) {
    this.sceneState = SceneState.LOAD;

    this.sceneContainer = sceneContainer;

    this.staticContainer = new PIXI.Container();
    this.sceneContainer.addChild(this.staticContainer);
    this.animatedContainer = new PIXI.Container();
    this.sceneContainer.addChild(this.animatedContainer);

    this.backButton = createBackButton(this.sceneSwitcher);
    sceneContainer.addChild(this.backButton);

    this.createCards();
  }

  createCards = () => {
    let image: PIXI.Sprite;

    const initialXPos = window.innerWidth * 0.2;
    let xPos: number = initialXPos;
    let yPos: number = 20;

    for (let i = 0; i < 144; i++) {
      image = new PIXI.Sprite(PIXI.Texture.from(Constants.CLOUD_PNG));

      image.x = xPos;
      image.y = yPos;

      this.staticContainer.addChild(image);
      this.cardList.push(image);

      yPos += 10;

      if (yPos >= window.innerHeight * 0.8) {
        xPos += image.width + 10;
        yPos = 20;
      }
    }

    this.beginAnimating();
  };

  beginAnimating = () => {
    const card = this.cardList.shift();
    const cardEnd = this.cardList.pop();

    if (!card || !cardEnd) {
      return;
    }

    this.staticContainer.removeChild(cardEnd);
    this.animatedContainer.addChild(cardEnd);

    // TODO: actually use the pixi-plugin....
    TweenMax.to(cardEnd, 2, {
      x: card.x + window.innerWidth * 0.4,
      y: card.y,
      onComplete: this.beginAnimating,
      // this will be in degrees when using the pixi-plugin
      rotation: 6.28319,
      //pixi: {}
    });
  };

  close() {
    this.cardList = [];
  }

  preTransitionUpdate(delta: number) {}

  sceneUpdate(delta: number) {}

  updateDisplay() {}
}
