import * as THREE from 'three'

export default class ShelfDesktop {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfDesktop()
  }
  createShelfDesktop() {
    this.shelfDesktop = this.models.models.shelfDesktop.scene
    this.shelfDesktop.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfDesktop)
  }
}
