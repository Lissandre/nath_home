import * as THREE from 'three'

export default class PhoneSupport {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setPhoneSupport()
  }
  setPhoneSupport() {
    this.phoneSupport = this.models.models.phoneSupport.scene
    this.phoneSupport.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.phoneSupport)
  }
}
