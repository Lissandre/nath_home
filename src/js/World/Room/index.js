import * as THREE from 'three'

import BasicObjects from './BasicObjects.js'
import Bed from './Bed.js'
import LightBed from './LightBed.js'
import Paper from './Paper.js'

export default class Room {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics
    this.objects = options.objects

    // Set up
    this.container = new THREE.Object3D()

    this.setBasicObjects()
    this.setBed()
    this.setLightBed()
    this.setPaper()
  }
  setBasicObjects() {
    this.basicObjects = new BasicObjects({
      models: this.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.basicObjects.objects.forEach(object => {
      this.container.add(object.container)
    })
  }
  setBed() {
    this.bed = new Bed({
      models: this.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.bed.container)
  }
  setLightBed() {
    this.lightBed = new LightBed({
      models: this.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.lightBed.container)
  }
  setPaper() {
    this.paper = new Paper({
      models: this.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.container.add(this.paper.container)
  }
}
