import * as THREE from 'three'

export default class ShelfWall {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfWall()
  }
  createShelfWall() {
    this.shelfWall = this.models.models.shelfWall.scene
    this.shelfWall.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfWall)
  }
}
