import * as THREE from 'three'

import RadiatorBathroom from './RadiatorBathroom.js'

export default class Bathroom {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setRadiatorBathroom()
  }
  setRadiatorBathroom() {
    this.radiatorBathroom = new RadiatorBathroom({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.radiatorBathroom.container)
  }
}
