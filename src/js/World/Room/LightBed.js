import * as THREE from 'three'

export default class LightBed {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createLightBed()
    this.setLight()
  }
  createLightBed() {
    this.lightBed = this.models.models.lightBed.scene
    this.lightBed.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if (child.name === 'Cylinder_1') {
          child.material.emissive = new THREE.Color(0xeaeaea)
        }
      }
    })
    this.container.add(this.lightBed)
  }
  setLight() {
    this.light = new THREE.PointLight(0xffaf88, 0.1, 0, 2)
    this.light.shadow.camera.near = 0.2
    this.light.castShadow = true
    this.light.position.set(1.01, 1.72, 2.8)
    this.container.add(this.light)
  }
}
