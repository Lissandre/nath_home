import { Object3D, FrontSide, MeshLambertMaterial } from 'three'

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
    this.bed = this.models.bed.scene
    this.bed.traverse((child) => {
      if (child.isMesh) {
        const prevMaterial = child.material
        child.material = new MeshLambertMaterial()
        child.material.copy(prevMaterial)

        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.bed)
  }
}
