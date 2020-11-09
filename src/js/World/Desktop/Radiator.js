import * as THREE from 'three'

export default class Radiator {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createRadiator()
  }
  createRadiator() {
    this.radiator = this.models.models.radiator.scene
    this.radiator.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.radiator)
  }
}
