import * as THREE from 'three'

export default class Microwave {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createMicrowave()
  }
  createMicrowave() {
    this.microwave = this.models.models.microwave.scene
    this.microwave.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.microwave)
  }
}