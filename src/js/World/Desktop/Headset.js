import * as THREE from 'three'

export default class Headset {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createHeadset()
  }
  createHeadset() {
    this.headset = this.models.models.headset.scene
    this.headset.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.headset)
  }
}
