import * as THREE from 'three'

export default class LightBed {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createLightBed()
  }
  createLightBed() {
    this.lightBed = this.models.models.lightBed.scene
    this.lightBed.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.lightBed)
  }
}
