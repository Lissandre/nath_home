import * as THREE from 'three'

export default class Desktop {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createDesktop()
  }
  createDesktop() {
    this.desktop = this.models.models.desktop.scene
    this.desktop.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.desktop)
  }
}
