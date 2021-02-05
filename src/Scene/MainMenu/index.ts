import * as PIXI from "pixi.js";
import { AbstractGameScene, SceneState } from "../Scene";
import * as Constants from "../../Utils/Constants";
import { createButton } from "../../Utils/CreateButton";

export class MainMenu extends AbstractGameScene {
  header: PIXI.Text;

  setup(sceneContainer: PIXI.Container) {
    this.sceneContainer = sceneContainer;
    this.sceneState = SceneState.LOAD;
    this.addButton(Constants.PAGE_CARDS, 20, 20);
    this.addButton(Constants.PAGE_EMOTICONS, 20, 100);
    this.addButton(Constants.PAGE_FIRE, 20, 180);

    const headerStyle: PIXI.TextStyle = new PIXI.TextStyle({
      align: "center",
      dropShadow: true,
      fill: "0xff0000",
    });

    this.header = new PIXI.Text(
      "Welcome\nPlease enjoy your stay.",
      headerStyle
    );

    sceneContainer.addChild(this.header);

    this.updateDisplay();
  }

  updateDisplay() {
    this.header.x = this.app.renderer.width / 2;
    this.header.y = this.app.renderer.height / 2;
    this.header.anchor.set(0.5, 0.5);
  }

  addButton = (name: string, x: number, y: number): PIXI.Sprite => {
    const button = createButton(name);
    button.addListener("pointerup", () => {
      this.sceneSwitcher(name);
    });
    button.x = x;
    button.y = y;

    this.sceneContainer.addChild(button);

    return button;
  };

  preTransitionUpdate(delta: number) {}

  sceneUpdate(delta: number) {}

  close() {}
}
