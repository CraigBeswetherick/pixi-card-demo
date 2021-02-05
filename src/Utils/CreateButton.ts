import * as PIXI from "pixi.js";
import * as Constants from "./Constants";
import { gsap, TweenMax } from "gsap";

export const createButton = (text: string): PIXI.Sprite => {
  let button: PIXI.Sprite = new PIXI.Sprite();

  let buttonBackground: PIXI.Graphics = new PIXI.Graphics();
  buttonBackground.beginFill(0xffff00, 1);
  buttonBackground.drawRect(0, 0, 1, 1);
  buttonBackground.endFill();

  button.addChild(buttonBackground);

  let textfield: PIXI.Text = new PIXI.Text(text);
  button.addChild(textfield);

  buttonBackground.width = textfield.width + 20;
  buttonBackground.height = textfield.height + 20;
  textfield.x = 10;
  textfield.y = 10;

  button.interactive = true;
  button.buttonMode = true;

  return button;
};

/**
 * Create and return a back button leading to the main menu
 * @export
 * @return [PIXI.Sprite] new back button
 */

export const createBackButton = (sceneSwitcher): PIXI.Sprite => {
  let button: PIXI.Sprite = createButton("back");
  button.x = 20;
  button.y = 20;

  button.addListener("pointerup", () => {
    sceneSwitcher(Constants.PAGE_MAIN_MENU);
  });

  return button;
};
