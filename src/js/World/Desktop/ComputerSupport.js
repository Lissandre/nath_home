import * as THREE from 'three'

export default class ComputerSupport {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createComputerSupport()
  }
  createComputerSupport() {
    this.computerSupport = this.models.models.computerSupport.scene
    this.computerSupport.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.computerSupport)
  }
}
