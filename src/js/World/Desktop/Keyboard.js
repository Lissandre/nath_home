import * as THREE from 'three'

export default class Keyboard {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createKeyboard()
  }
  createKeyboard() {
    this.keyboard = this.models.models.keyboard.scene
    this.keyboard.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.keyboard)
  }
}
