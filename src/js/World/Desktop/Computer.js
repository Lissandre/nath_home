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
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.computer)
  }
  createComputerLight() {
    this.light = new THREE.PointLight(0xff0000, 0.1, 0, 2)
    // this.light = new THREE.Mesh(
    //   new THREE.SphereBufferGeometry(0.01, 30, 30, 0, Math.PI*2),
    //   new THREE.MeshBasicMaterial({
    //     color: 0xff0000,
    //   })
    // )
    this.light.castShadow = true
    this.light.shadow.camera.near = 0.01
    this.light.position.set(0.9, 1.37, -0.15)
    this.container.add(this.light)
  }
}
