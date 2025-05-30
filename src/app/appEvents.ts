import { burp } from "../audio/burp";
import { FrameBuffer } from "../gfx/FrameBuffer";
import { updateViewport } from "../gfx/viewport";
import { clamp } from "../math/clamp";
import { _k } from "../shared";
import { toFixed } from "../utils/numbers";

// Events used at the start of a game

export function initAppEvents() {
    _k.app.onHide(() => {
        if (!_k.globalOpt.backgroundAudio) {
            _k.audio.ctx.suspend();
        }
    });

    _k.app.onShow(() => {
        if (!_k.globalOpt.backgroundAudio && !_k.debug.paused) {
            _k.audio.ctx.resume();
        }
    });

    _k.app.onResize(() => {
        if (_k.app.isFullscreen()) return;
        const fixedSize = _k.globalOpt.width && _k.globalOpt.height;
        if (fixedSize && !_k.globalOpt.letterbox) {
            return;
        }

        _k.canvas.width = _k.canvas.offsetWidth * _k.gfx.pixelDensity;
        _k.canvas.height = _k.canvas.offsetHeight * _k.gfx.pixelDensity;

        updateViewport();

        if (!fixedSize) {
            _k.gfx.frameBuffer.free();
            _k.gfx.frameBuffer = new FrameBuffer(
                _k.gfx.ggl,
                _k.gfx.ggl.gl.drawingBufferWidth,
                _k.gfx.ggl.gl.drawingBufferHeight,
            );
            _k.gfx.width = _k.gfx.ggl.gl.drawingBufferWidth
                / _k.gfx.pixelDensity
                / _k.globalOpt.scale;
            _k.gfx.height = _k.gfx.ggl.gl.drawingBufferHeight
                / _k.gfx.pixelDensity
                / _k.globalOpt.scale;
        }
    });

    if (_k.globalOpt.debug !== false) {
        _k.app.onKeyPress(
            _k.globalOpt.debugKey ?? "f1",
            () => _k.debug.inspect = !_k.debug.inspect,
        );
        _k.app.onKeyPress("f2", () => _k.debug.clearLog());
        _k.app.onKeyPress("f8", () => _k.debug.paused = !_k.debug.paused);
        _k.app.onKeyPress("f7", () => {
            _k.debug.timeScale = toFixed(
                clamp(_k.debug.timeScale - 0.2, 0, 2),
                1,
            );
        });
        _k.app.onKeyPress("f9", () => {
            _k.debug.timeScale = toFixed(
                clamp(_k.debug.timeScale + 0.2, 0, 2),
                1,
            );
        });
        _k.app.onKeyPress("f10", () => _k.debug.stepFrame());
    }

    // burp mode initialization
    if (_k.globalOpt.burp) {
        _k.app.onKeyPress("b", () => burp());
    }
}
