/**
 * @file Gamepad
 * @description How to manage gamepad input.
 * @difficulty 0
 * @tags basics, input
 * @minver 3001.0
 * @category concepts
 */

kaplay({
    background: [0, 0, 0],
});
loadSprite("bean", "/sprites/bean.png");

setGravity(2400);

scene("nogamepad", () => {
    add([
        text("Gamepad not found.\nConnect a gamepad and press a button!", {
            width: width() - 80,
            align: "center",
        }),
        pos(center()),
        anchor("center"),
    ]);
    onGamepadConnect(() => {
        go("game");
    });
});

scene("game", () => {
    const player = add([
        pos(center()),
        anchor("center"),
        sprite("bean"),
        area(),
        body(),
    ]);

    // platform
    add([
        pos(0, height()),
        anchor("botleft"),
        rect(width(), 140),
        area(),
        body({ isStatic: true }),
    ]);

    onGamepadButtonPress((b) => {
        debug.log(b);
    });

    onGamepadButtonPress(["south", "west"], () => {
        player.jump();
    });

    onGamepadStick("left", (v) => {
        player.move(v.x * 400, 0);
    });

    onGamepadDisconnect(() => {
        go("nogamepad");
    });
});

if (getGamepads().length > 0) {
    go("game");
}
else {
    go("nogamepad");
}
