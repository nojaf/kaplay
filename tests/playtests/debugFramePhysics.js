/**
 * @file Step Frame
 * @description Test different physics using debug.stepFrame().
 * @difficulty 3
 * @tags basics
 * @minver 3001.0
 */

// Build levels with addLevel()

// Start game
kaplay();

// Load assets
loadSprite("coin", "/sprites/coin.png");
loadSprite("grass", "/sprites/grass.png");

setGravity(2400);

addLevel([
    // Design the level layout with symbols
    "       ",
    "       ",
    "       ",
    "       ",
    "=======",
], {
    // The size of each grid
    tileWidth: 64,
    tileHeight: 64,
    // The position of the top left block
    pos: vec2(100),
    // Define what each symbol means (in components)
    tiles: {
        "=": () => [
            sprite("grass"),
            area(),
            body({ isStatic: true }),
        ],
    },
});

loop(0.2, () => {
    const coin = add([
        pos(rand(100, 400), 0),
        sprite("coin"),
        area(),
        body(),
        "coin",
    ]);
    wait(3, () => coin.destroy());
});

debug.paused = true;

onKeyPressRepeat("space", () => {
    debug.stepFrame();
});
