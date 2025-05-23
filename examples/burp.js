/**
 * @file Burp
 * @description How to use burp, the engine core
 * @difficulty 0
 * @tags basics, audio
 * @minver 3001.0
 * @category basics
 */

// Core KAPLAY features.

// Start the game in burp mode
kaplay({
    burp: true,
    background: "cc425e",
});

// "b" triggers a burp in burp mode
add([
    text("Press B to burp"),
    anchor("center"),
    pos(width() / 2, height() / 2),
]);

// burp() on click / tap for our friends on mobile
onClick(() => burp());
