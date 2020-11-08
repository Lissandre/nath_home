import * as THREE from 'three'

export default class Computer {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createComputer()
    this.createComputerLight()
  }
  createComputer() {
    this.computer = this.models.models.computer.scene
    this.computer.traverse((child) => {
      if (child.isMesh) {
        if(child.name === 'Cube.012_2'){
          child.castShadow = true
        }
        child.receiveShadow = true
      }
    })
    this.container.add(this.computer)
  }
  createComputerLight() {
    this.topLight = new THREE.PointLight(0xca8fff, 10, 0.2, 2)
    this.topLight.shadow.camera.near = 0.01
    this.topLight.position.set(0.9, 1.34, -0.16)
    this.container.add(this.topLight)

    this.bottomLight = new THREE.PointLight(0xca8fff, 10, 0.2, 2)
    this.bottomLight.shadow.camera.near = 0.01
    this.bottomLight.position.set(0.9, 1.1, 0.12)
    this.container.add(this.bottomLight)
  }
}
