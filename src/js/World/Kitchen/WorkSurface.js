import * as THREE from 'three'

export default class WorkSurface {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createWorkSurface()
  }
  createWorkSurface() {
    this.workSurface = this.models.models.workSurface.scene
    this.workSurface.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.workSurface)
  }
}
