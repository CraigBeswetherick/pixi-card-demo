import * as PIXI from "pixi.js";
import * as Particles from "pixi-particles";

import * as Constants from "../../Utils/Constants";
import { AbstractGameScene, SceneState } from "../Scene";
import { createBackButton } from "../../Utils/CreateButton";
import { config } from "./config";

export class FireScene extends AbstractGameScene {
  emitterContainer: PIXI.Container;
  emitter: Particles.Emitter;
  sceneContainer: PIXI.Container;
  header: PIXI.Text;

  setup(sceneContainer: PIXI.Container) {
    this.sceneState = SceneState.LOAD;
    this.sceneContainer = sceneContainer;

    let art = [];
    art.push(PIXI.Texture.from(Constants.FIRE_PNG));
    art.push(PIXI.Texture.from(Constants.PARTICLE_PNG));

    this.emitterContainer = new PIXI.Container();
    this.sceneContainer.addChild(this.emitterContainer);

    this.emitter = new Particles.Emitter(this.emitterContainer, art, config);

    this.emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);

    window.addEventListener("mouseup", (e) => {
      this.emitter.emit = true;
      this.emitter.resetPositionTracking();
      this.emitter.updateOwnerPos(e.offsetX, e.offsetY);
    });

    this.setupGraphics();
  }

  loadAssets() {}

  setupGraphics() {
    this.backButton = createBackButton(this.sceneSwitcher);
    this.sceneContainer.addChild(this.backButton);

    const headerStyle: PIXI.TextStyle = new PIXI.TextStyle({
      align: "center",
      dropShadow: true,
      fill: "0xff0000",
    });

    this.header = new PIXI.Text(
      "Click the screen to create a fire effect.",
      headerStyle
    );

    this.sceneContainer.addChild(this.header);

    this.updateDisplay();
  }

  preTransitionUpdate(delta: number) {}

  sceneUpdate(delta: number) {
    this.emitter.update(delta);
  }

  updateDisplay() {
    this.header.x = this.app.renderer.width / 2;
    this.header.y = this.app.renderer.height / 2;
    this.header.anchor.set(0.5, 0.5);

    // we do not want this to update when the assets are loading still.
    if (this.emitter) {
      this.emitter.updateOwnerPos(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
    }
  }

  close() {}
}
