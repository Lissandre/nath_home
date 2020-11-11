import * as THREE from 'three'

import AmbientLight from './AmbientLight.js'
import PointLight from './PointLight.js'
import DesktopPlace from './Desktop/index.js'
import Kitchen from './Kitchen/index.js'
import Room from './Room/index.js'
import Floor from './Floor.js'
import Walls from './Walls.js'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.models = options.models
    this.objects = options.objects
    this.camera = options.camera

    // Set up
    this.container = new THREE.Object3D()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.getLoaders()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setFloor()
    this.setWalls()
    this.setDesktopPlace()
    this.setKitchen()
    this.setRoom()
  }
  getLoaders() {
    if (this.models.modelsList.length != 0) {
      this.loadDiv = document.createElement('div')
      this.loadDiv.classList.add('loadScreen')
      document.body.append(this.loadDiv)

      this.loadTitle = document.createElement('h1')
      this.loadTitle.innerHTML = 'Loading models...'
      this.loadTitle.classList.add('loadModels')
      this.loadDiv.append(this.loadTitle)

      this.models.on('modelsReady', () => {
        this.loadDiv.style.opacity = 0
        this.init()
        setTimeout(() => {
          this.loadDiv.remove()
        }, 320)
      })
    }
  }
  setAmbientLight() {
    this.light = new AmbientLight({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setPointLight() {
    this.light = new PointLight({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setFloor() {
    this.floor = new Floor({
      models: this.models,
      objects: this.objects,
    })
    this.container.add(this.floor.container)
  }
  setWalls() {
    this.walls = new Walls({
      models: this.models,
      objects: this.objects,
    })
    this.container.add(this.walls.container)
  }
  setDesktopPlace() {
    this.desktopPlace = new DesktopPlace({
      models: this.models,
      objects: this.objects,
      camera: this.camera,
      time: this.time,
    })
    this.container.add(this.desktopPlace.container)
  }
  setKitchen() {
    this.kitchen = new Kitchen({
      models: this.models,
      objects: this.objects,
    })
    this.container.add(this.kitchen.container)
  }
  setRoom() {
    this.room = new Room({
      models: this.models,
      objects: this.objects,
    })
    this.container.add(this.room.container)
  }
}
