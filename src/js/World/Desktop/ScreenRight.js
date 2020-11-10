import * as THREE from 'three'

export default class ScreenRight {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setScreenRight()
  }
  setScreenRight() {
    this.screenRight = this.models.models.screenRight.scene
    this.screenRight.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.screenRight)
  }
}
