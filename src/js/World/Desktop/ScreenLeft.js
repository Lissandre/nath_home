import * as THREE from 'three'

export default class ScreenLeft {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setScreenLeft()
  }
  setScreenLeft() {
    this.screenLeft = this.models.models.screenLeft.scene
    this.screenLeft.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.screenLeft)
  }
}
