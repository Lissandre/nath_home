import * as THREE from 'three'

export default class Sink {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createSink()
    this.addLight()
  }
  createSink() {
    this.sink = this.models.models.sink.scene
    this.sink.traverse((child) => {
      if (child.isMesh) {
        console.log(child);
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if(child.material.name === 'Glass') {
          child.material.emissive = new THREE.Color(0xffffff)
          child.material.emissiveIntensity = 1
        }
      }
    })
    this.container.add(this.sink)
  }
  addLight() {
    this.light = new THREE.PointLight(0xffffff, 0.2, 0, 2)
    this.light.castShadow = true
    this.light.shadow.camera.near = 0.1
    this.light.position.set(-2.7, 1.41, 2.2)
    this.container.add(this.light)
  }
}
