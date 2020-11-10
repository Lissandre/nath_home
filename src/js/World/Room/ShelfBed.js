import * as THREE from 'three'

export default class ShelfBed {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfBed()
  }
  createShelfBed() {
    this.shelfBed = this.models.models.shelfBed.scene
    this.shelfBed.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfBed)
  }
}
