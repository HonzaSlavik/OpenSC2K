import Phaser from 'phaser';
import * as CONST from '../../constants';

export default class tile {
  constructor (options) {
    this.id         = options.id;
    this.cell       = options.cell;
    this.map        = options.cell.scene.city.map;
    this.type       = options.type;
    this.tile       = this.get(options.id);
    
    this._flip      = false;
    this.sprite     = null;
    this.debug      = {};

    this.x          = options.x || this.cell.position.topLeft.x || 0;
    this.y          = options.y || this.cell.position.topLeft.y || 0;

    this.offsetY    = 0;
    this.offsetX    = 0;

    this.depth      = {
      cell:       options.cell.depth,
      layer:      options.layerDepth || 0,
      tile:       options.tileDepth || 0,
      additional: options.additionalDepth || 0,
    };

    if (!this.check()) return;

    this.draw = true;
  }

  get (id) {
    if (!this.cell.scene.tiles[id]) return false;

    id = this.cell.scene.tiles[id].rotate[this.cell.scene.city.cameraRotation];

    return this.cell.scene.tiles[id];
  }

  check () {
    if (!this.cell) return false;

    return true;
  }

  keyTile () {
    if (this.tile.size == 1 || this.cell.corners.none) return true;

    return this.cell.corners[this.cell.scene.city.corner];
  }

  hide () {
    if (this.sprite) this.sprite.setVisible(false);
  }

  show () {
    if (this.sprite) this.sprite.setVisible(true);
  }

  refresh () {
    this.hide();
    this.show();
  }

  flip (tile = this.tile) {
    if (!tile.flip) return false;
    
    if (this.cell.scene.city.cameraRotation == 1 || this.cell.scene.city.cameraRotation == 3)
      return this.cell.rotate ? false : true;
    else
      return this.cell.rotate;
  }

  position () {
    this.x     = this.cell.position.topLeft.x + this.offsetX;
    this.y     = this.cell.position.topLeft.y + this.offsetY;
  }

  create () {
    if (!this.draw) return;

    this.logic();
    this.position();

    if (this.tile.baseLayer) {
      let tile = this.get(this.tile.baseLayer);
      this.cell.tiles.set(this.tile.subtype, tile.id);
      this.cell.tiles[this.tile.subtype].depthAdjustment = -2;
      this.cell.tiles[this.tile.subtype].create();
    }

    if (this.tile.frames > 1)
      this.sprite = this.cell.scene.add.sprite(this.x, this.y, CONST.TILE_ATLAS).play(this.tile.image);
    else
      this.sprite = this.cell.scene.add.sprite(this.x, this.y, CONST.TILE_ATLAS, this.tile.textures[0]);

    this.sprite.cell = this.cell;
    this.sprite.type = this.type;
    this.sprite.setScale(CONST.SCALE);
    this.sprite.setOrigin(CONST.ORIGIN_X, CONST.ORIGIN_Y);
    this.sprite.setDepth(this.depth.cell + this.depth.layer + this.depth.tile + this.depth.additional);

    this.cell.tiles.addSprite(this.sprite, this.type);
    this.cell.tiles.addTile(this);

    this.events();
    //this.debugBox();
    //this.debugHitbox();
  }

  events () {
    if (!this.sprite) return;

    this.hitbox = this.tile.hitbox;

    this.sprite.setInteractive(this.hitbox, Phaser.Geom.Polygon.Contains);
    this.sprite.on(CONST.E_POINTER_OVER, this.cell.onPointerOver, this.cell);
    this.sprite.on(CONST.E_POINTER_OUT,  this.cell.onPointerOut,  this.cell);
    this.sprite.on(CONST.E_POINTER_MOVE, this.cell.onPointerMove, this.cell);
    this.sprite.on(CONST.E_POINTER_DOWN, this.cell.onPointerDown, this.cell);
    this.sprite.on(CONST.E_POINTER_UP,   this.cell.onPointerUp,   this.cell);
  }

  logic () {
    return;
  }

  simulation () {
    return;
  }

  debugBox () {
    let bounds = this.sprite.getBounds();
    let center = this.sprite.getCenter();

    this.debug.box = this.cell.scene.add.rectangle(bounds.x, bounds.y, bounds.width, bounds.height, 0x00ffff, 0);
    this.debug.box.setOrigin(CONST.ORIGIN_X, CONST.ORIGIN_Y);
    this.debug.box.setDepth(this.depth + 2);
    this.debug.box.setStrokeStyle(1, 0x00ffff, 0.5);

    this.debug.center = this.cell.scene.add.circle(center.x, center.y, 1, 0x00ffff, 0.75);
    this.debug.center.setOrigin(CONST.ORIGIN_X, CONST.ORIGIN_Y);
    this.debug.center.setDepth(this.sprite.depth + 2);
  }

  debugHitbox () {
    this.debug.hitbox = this.cell.scene.add.polygon(this.x, this.y, this.hitbox.points, 0xff00ff, 0);
    this.debug.hitbox.setDepth(this.sprite.depth + 16);
    this.debug.hitbox.setScale(CONST.SCALE);
    this.debug.hitbox.setOrigin(CONST.ORIGIN_X, CONST.ORIGIN_Y);
    this.debug.hitbox.setStrokeStyle(1, 0xff00ff, 0.5);
  }
}