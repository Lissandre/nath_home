import * as THREE from 'three'

export default class Phone {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setPhone()
  }
  setPhone() {
    this.phone = this.models.models.phone.scene
    this.phone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.phone)
  }
}
