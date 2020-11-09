import * as THREE from 'three'

export default class Sink {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createSink()
  }
  createSink() {
    this.sink = this.models.models.sink.scene
    this.sink.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.sink)
  }
}
