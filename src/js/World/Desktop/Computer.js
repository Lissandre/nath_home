import * as THREE from 'three'

export default class Computer {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createComputer()
  }
  createComputer() {
    this.computer = this.models.models.computer.scene
    this.computer.traverse(child => {
      if(child.isMesh){
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.computer)
  }
}
