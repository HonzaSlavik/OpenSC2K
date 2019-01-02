import dat from 'dat.gui';

export default class debug {
  constructor (options) {
    this.scene = options.scene;
    this.globals = this.scene.globals;
    this.toggleLayer = this.toggleLayerInit();
    this.gui = new dat.GUI();
    this.gui.closed = false;

    let f1 = this.gui.addFolder('Performance');
    f1.add(this.scene.sys.game.loop, 'actualFps', 'FPS').listen();
    f1.open();

    let g1 = this.gui.addFolder('Cursor');
    g1.add(this.scene.input, 'x', 'X').listen();
    g1.add(this.scene.input, 'y', 'Y').listen();
    g1.add(this.scene.viewport.worldPoint, 'x', 'WorldPoint X').listen();
    g1.add(this.scene.viewport.worldPoint, 'y', 'WorldPoint Y').listen();
    g1.add(this.scene.city.map.selectedCell, 'x', 'Cell X').listen();
    g1.add(this.scene.city.map.selectedCell, 'y', 'Cell Y').listen();
    //g1.open();
    
    let g2 = this.gui.addFolder('Camera');
    g2.add(this.scene.cameras.main, 'scrollX', 'X').listen();
    g2.add(this.scene.cameras.main, 'scrollY', 'Y').listen();
    g2.add(this.scene.cameras.main, 'zoom', 'Zoom', 0.1, 2).step(0.1).listen();
    g2.open();

    let g3 = this.gui.addFolder('World');
    g3.add(this, 'sleepWakeWorld', 'Sleep / Wake');
    //g3.add(this.scene.city.load, 'open', 'Open City');
    //g3.add(this.city.save, 'saveCity', 'Save City');
    g3.add(this.toggleLayer, 'terrain', 'Toggle Terrain');
    g3.add(this.toggleLayer, 'heightmap', 'Toggle Height Map');
    g3.add(this.toggleLayer, 'water', 'Toggle Water');
    //g3.add(this.toggleLayer, 'road', 'Toggle Road');
    //g3.add(this.toggleLayer, 'power', 'Toggle Power');
    //g3.add(this.toggleLayer, 'building', 'Toggle Building');
    //g3.add(this.toggleLayer, 'zone', 'Toggle Zone');
    //g3.add(this.toggleLayer, 'rail', 'Toggle Rail');
    //g3.add(this.toggleLayer, 'highway', 'Toggle Highway');
    //g3.add(this.toggleLayer, 'subway', 'Toggle Subway');
    //g3.add(this.toggleLayer, 'pipes', 'Toggle Pipes');
    //g3.open();
  }

  toggleLayerInit () {
    return {
      terrain: () => {
        this.globals.world.city.map.toggleLayerVisibility('terrain');
      },
      heightmap: () => {
        this.globals.world.city.map.toggleLayerVisibility('heightmap');
      },
      water: () => {
        this.globals.world.city.map.toggleLayerVisibility('water');
      },
      road: () => {
        this.globals.world.city.map.toggleLayerVisibility('road');
      },
      power: () => {
        this.globals.world.city.map.toggleLayerVisibility('power');
      },
      building: () => {
        this.globals.world.city.map.toggleLayerVisibility('building');
      },
      zone: () => {
        this.globals.world.city.map.toggleLayerVisibility('zone');
      },
      rail: () => {
        this.globals.world.city.map.toggleLayerVisibility('rail');
      },
      highway: () => {
        this.globals.world.city.map.toggleLayerVisibility('highway');
      },
      subway: () => {
        this.globals.world.city.map.toggleLayerVisibility('subway');
      },
      pipes: () => {
        this.globals.world.city.map.toggleLayerVisibility('pipes');
      },
    };
  }

  shutdown () {
    if (this.gui)
      this.gui.destroy();
  }

  loadCity () {
    this.scene.city.globals.loadCity();
  }

  saveCity () {
    this.scene.city.globals.saveCity();
  }

  sleepWakeWorld () {
    if (this.scene.isSleeping)
      this.scene.wake();
    else
      this.scene.sleep();
  }
}