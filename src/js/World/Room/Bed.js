import { Object3D, FrontSide } from 'three'

export default class Bed {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new Object3D()

    this.createBed()
  }
  createBed() {
    this.bed = this.models.models.bed.scene
    this.bed.traverse((child) => {
      if (child.isMesh) {
        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.bed)
  }
}
