import { Object3D } from 'three'

import AmbientLight from './AmbientLight.js'
import PointLight from './PointLight.js'
import Bathroom from './Bathroom/index.js'
import DesktopPlace from './Desktop/index.js'
import Kitchen from './Kitchen/index.js'
import Room from './Room/index.js'
import Floor from './Floor.js'
import Walls from './Walls.js'
import Outside from './Outside.js'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets
    this.objects = options.objects
    this.camera = options.camera
    this.physics = options.physics

    // Set up
    this.container = new Object3D()

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
    // this.setOutside()
    this.setBathroom()
    this.setDesktopPlace()
    this.setKitchen()
    this.setRoom()
  }
  getLoaders() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.progress.style.width = this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
        }%`
      })

      this.assets.on('ressourcesReady', () => {
        this.init()
        setTimeout(() => {
          this.loadDiv.style.opacity = 0
          setTimeout(() => {
            this.loadDiv.remove()
          }, 550)
        }, 1000)
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
      models: this.assets.models,
      physics: this.physics,
    })
    this.container.add(this.floor.container)
  }
  setWalls() {
    this.walls = new Walls({
      models: this.assets.models,
      physics: this.physics,
    })
    this.container.add(this.walls.container)
  }
  setOutside() {
    this.outside = new Outside({
      debug: this.debug,
      time: this.time,
    })
    this.container.add(this.outside.container)
  }
  setBathroom() {
    this.bathroom = new Bathroom({
      models: this.assets.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.bathroom.container)
  }
  setDesktopPlace() {
    this.desktopPlace = new DesktopPlace({
      models: this.assets.models,
      sounds: this.assets.sounds,
      camera: this.camera,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.desktopPlace.container)
  }
  setKitchen() {
    this.kitchen = new Kitchen({
      models: this.assets.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.kitchen.container)
  }
  setRoom() {
    this.room = new Room({
      models: this.assets.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.room.container)
  }
}
