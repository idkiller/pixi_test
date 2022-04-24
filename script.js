const app = new PIXI.Application({ backgroundColor: 0xffffff });
document.body.appendChild(app.view);

const w = app.screen.width / 2;
const h = app.screen.height / 2;

const width = 400;
const height = 300;
const hw = width / 2;
const hh = height / 2;
const bw = 130;
const bh = 60;

const quad = [
    new PIXI.Point(w - hw, h - hh),
    new PIXI.Point(w + hw, h - hh),
    new PIXI.Point(w + bw, h + bh),
    new PIXI.Point(w - bw, h + bh)
];

// add sprite itself
const containerSprite = new PIXI.projection.Sprite2s(PIXI.Texture.from('clab.jpg'));
containerSprite.anchor.set(0.5);
app.stage.addChild(containerSprite);

// Listen for animate update
app.ticker.add((delta) => {
    containerSprite.proj.mapBilinearSprite(containerSprite, quad);
});

const fps = 1000 / 60;
const dur = 2000;
const wv = (hw - bw) / dur * fps;
const hv = (hh - bh) / dur * fps;

setInterval(() => {
    if (quad[2].x < w + hw) {
        quad[2].set(quad[2].x + wv, quad[2].y)
    }
    if (quad[3].x > w - hw) {
        quad[3].set(quad[3].x - wv, quad[3].y)
    }
    if (quad[2].y < h + hh) {
        quad[2].set(quad[2].x, quad[2].y + hv)
    }
    if (quad[3].y < h + hh) {
        quad[3].set(quad[3].x, quad[3].y + hv)
    }
}, fps)