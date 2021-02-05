import * as PIXI from "pixi.js";
import { TransitionType, SceneTransition } from "../Transition/Transition";
import { AbstractGameScene } from "../Scene/Scene";

/**
 * Scene wrapper interface.
 */
export interface SceneSettings {
  index: number;
  name?: string;
  gameScene: AbstractGameScene;
  fadeInTransition: SceneTransition;
  fadeOutTransition: SceneTransition;
}

/**
 * Manages game scenes.
 */
export class Engine {
  private sceneSettings: SceneSettings[];
  private app: PIXI.Application;
  private currentScene: SceneSettings;

  constructor(app: PIXI.Application, scenes: SceneSettings[]) {
    this.app = app;
    this.sceneSettings = scenes;
    this.sceneSettings.forEach((sceneSettings: SceneSettings) => {
      sceneSettings.gameScene.init(this.app, this.sceneSwitcher);
    });

    // Finding the scene with the lowest index
    this.currentScene = scenes.reduce((prev, curr) => {
      if (prev === undefined) {
        return curr;
      } else {
        return prev.index > curr.index ? curr : prev;
      }
    }, undefined);

    this.setupScene(this.currentScene);
    window.addEventListener("resize", this.onresize);
  }

  /**
   * Scene switching mechanism. Finalizes the current scene and setups
   * the target scene.
   * @memberof Engine
   */
  sceneSwitcher = (sceneName: string) => {
    this.currentScene.gameScene.setFinalizing(() => {
      const scene = this.sceneSettings.find((sceneSettings) => {
        return sceneSettings.name === sceneName;
      });

      if (scene) {
        this.setupScene(scene);
        this.currentScene = scene;
      } else {
        console.error("SCENE NOT FOUND: " + sceneName);
      }
    });
  };

  /**
   * Adds a scene to the PIXI.APP.STAGE, removing all previous children.
   * @param sceneSettings
   */
  setupScene(sceneSettings: SceneSettings): void {
    this.app.stage.removeChildren();

    // close the current scene if we have one
    if (this.currentScene) {
      this.currentScene.gameScene.close();
    }

    const sceneContainer = new PIXI.Container();
    this.app.stage.addChild(sceneContainer);

    const gameScene: AbstractGameScene = sceneSettings.gameScene;

    gameScene.setup(sceneContainer);

    sceneSettings.fadeInTransition.init(
      this.app,
      TransitionType.FADE_IN,
      sceneContainer
    );
    sceneSettings.fadeOutTransition.init(
      this.app,
      TransitionType.FADE_OUT,
      sceneContainer
    );

    gameScene.fadeInTransition = sceneSettings.fadeOutTransition;
    gameScene.fadeOutTransition = sceneSettings.fadeInTransition;
  }

  // Resize the canvas to the size of the window
  onresize = () => {
    this.app.view.width = window.innerWidth;
    this.app.view.height = window.innerHeight;
    this.app.renderer.resize(this.app.view.width, this.app.view.height);
    this.currentScene.gameScene.updateDisplay();
  };

  /**
   * PIXI.APP update loop.
   * @param delta
   */
  update(delta: number): void {
    this.currentScene.gameScene.update(delta);
  }
}
