import * as PIXI from "pixi.js";
import "./resources/css/styles.css";
import { MainMenu } from "./Scene/MainMenu";
import { CardsScene } from "./Scene/Cards";
import { EmoticonsScene } from "./Scene/Emoticons";
import { FireScene } from "./Scene/Fire";

import { Engine } from "./Engine/Engine";
import { SimpleFadeTransition } from "./Transition/Transition";
import * as Constants from "./Utils/Constants";

const app = new PIXI.Application({
  antialias: true,
  width: window.innerWidth,
  height: window.innerHeight,
});

app.stage.interactive = true;

document.body.appendChild(app.view);

const setup = () => {
  const engine: Engine = new Engine(app, [
    {
      index: 0,
      name: Constants.PAGE_MAIN_MENU,
      gameScene: new MainMenu(),
      fadeInTransition: new SimpleFadeTransition(0.1),
      fadeOutTransition: new SimpleFadeTransition(),
    },
    {
      index: 1,
      name: Constants.PAGE_CARDS,
      gameScene: new CardsScene(),
      fadeInTransition: new SimpleFadeTransition(0.1),
      fadeOutTransition: new SimpleFadeTransition(),
    },
    {
      index: 2,
      name: Constants.PAGE_EMOTICONS,
      gameScene: new EmoticonsScene(),
      fadeInTransition: new SimpleFadeTransition(0.1),
      fadeOutTransition: new SimpleFadeTransition(),
    },
    {
      index: 3,
      name: Constants.PAGE_FIRE,
      gameScene: new FireScene(),
      fadeInTransition: new SimpleFadeTransition(0.1),
      fadeOutTransition: new SimpleFadeTransition(),
    },
  ]);

  app.ticker.add((delta) => {
    engine.update(delta);
  });
};

const loader = PIXI.Loader.shared;

// TODO: make this an array.
loader.add(Constants.FIRE_PNG);
loader.add(Constants.PARTICLE_PNG);
loader.add(Constants.CLOUD_PNG);
loader.add(Constants.SEPHIROTH_PNG);
loader.add(Constants.VINCENT_PNG);

loader.load(() => {
  setup();
});
