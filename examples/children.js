/**
 * @file Children
 * @description How to create children on game objects.
 * @difficulty 1
 * @tags basics, gobj
 * @minver 3001.0
 * @category basics
 */

kaplay();

loadSprite("bean", "/sprites/bean.png");
loadSprite("ghosty", "/sprites/ghosty.png");

// Adds the nucleus for the other children to get added to, it just means this is their parent
const nucleus = add([
    sprite("ghosty"),
    pos(center()),
    anchor("center"),
]);

// Add children
for (let i = 12; i < 24; i++) {
    nucleus.add([
        sprite("bean"),
        rotate(0),
        anchor(vec2(i).scale(0.25)),
        {
            speed: i * 8,
        },
    ]);
}

// Runs every frame
nucleus.onUpdate(() => {
    nucleus.pos = mousePos();

    // update children
    nucleus.children.forEach((child) => {
        child.angle += child.speed * dt();
    });
});
