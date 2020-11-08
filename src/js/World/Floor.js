import * as THREE from 'three'

export default class Floor {
  constructor(options) {
    // Set options
    this.models = options.models
    this.objects = options.objects

    // Set up
    this.container = new THREE.Object3D()

    this.setFloor()
  }
  setFloor() {
    this.floor = this.models.models.floor.scene
    this.floor.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true
        this.objects.push(child)
      }
    })
    this.container.add(this.floor)
  }
}
