import tile from './tile';

export default class zone extends tile {
  constructor (options) {
    options.type = 'zone';
    super(options);
    this.depth = -10;
  }

  checkTile () {
    if (!super.checkTile())
      return false;

    return true;
  }

  create () {
    if (this.cell.tiles.has('building'))
      return false;
      
    super.create();
  }
}