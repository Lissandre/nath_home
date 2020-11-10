import * as THREE from 'three'

export default class Mouse {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setMouse()
  }
  setMouse() {
    this.mouse = this.models.models.mouse.scene
    this.mouse.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.mouse)
  }
}
