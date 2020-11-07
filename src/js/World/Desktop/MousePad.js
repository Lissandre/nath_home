import * as THREE from 'three'

export default class MousePad {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setMousePad()
  }
  setMousePad() {
    this.mousePad = this.models.models.mousePad.scene
    this.mousePad.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.mousePad)
  }
}
