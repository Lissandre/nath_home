import * as THREE from 'three'

import RadiatorBathroom from './RadiatorBathroom.js'

export default class Bathroom {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setRadiatorBathroom()
  }
  setRadiatorBathroom() {
    this.radiatorBathroom = new RadiatorBathroom({
      models: this.models,
    })
    this.container.add(this.radiatorBathroom.container)
  }
}
