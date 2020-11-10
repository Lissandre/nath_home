import * as THREE from 'three'

export default class RadiatorBathroom {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createRadiatorBathroom()
  }
  createRadiatorBathroom() {
    this.radiatorBathroom = this.models.models.radiatorBathroom.scene
    this.radiatorBathroom.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.radiatorBathroom)
  }
}
