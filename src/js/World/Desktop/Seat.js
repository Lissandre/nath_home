import * as THREE from 'three'

export default class Seat {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setSeat()
  }
  setSeat() {
    this.seat = this.models.models.seat.scene
    this.seat.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.seat)
  }
}
