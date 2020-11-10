import * as THREE from 'three'

export default class ScreenSupport {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setScreenSupport()
  }
  setScreenSupport() {
    this.screenSupport = this.models.models.screenSupport.scene
    this.screenSupport.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.screenSupport)
  }
}
