import * as THREE from 'three'

export default class ShelfKitchen {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfKitchen()
  }
  createShelfKitchen() {
    this.shelfKitchen = this.models.models.shelfKitchen.scene
    this.shelfKitchen.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfKitchen)
  }
}
