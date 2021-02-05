export const destroySprites = (arr) => {
  arr.forEach((sprite: PIXI.Sprite) => {
    // destroy sprite
    sprite.destroy();
  });

  arr = [];

  return arr;
};
