import { Object3D } from 'three'

import BasicObjects from './BasicObjects.js'

export default class Bathroom {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics
    this.objects = options.objects

    // Set up
    this.container = new Object3D()

    this.setBasicObjects()
  }
  setBasicObjects() {
    this.basicObjects = new BasicObjects({
      models: this.models,
      time: this.time,
      physics: this.physics,
      objects: this.objects,
    })
    this.basicObjects.objects.forEach((object) => {
      this.container.add(object.container)
    })
  }
}
