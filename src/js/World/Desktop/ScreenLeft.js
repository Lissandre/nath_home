import { Object3D, FrontSide, MeshLambertMaterial } from 'three'

export default class ScreenLeft {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new Object3D()

    this.setScreenLeft()
  }
  setScreenLeft() {
    this.screenLeft = this.models.screenLeft.scene
    this.screenLeft.traverse((child) => {
      if (child.isMesh) {
        const prevMaterial = child.material
        child.material = new MeshLambertMaterial()
        child.material.copy(prevMaterial)

        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.screenLeft)
  }
}
