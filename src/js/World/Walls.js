import * as THREE from 'three'

export default class Walls {
  constructor(options) {
    // Options
    this.models = options.models
    this.objects = options.objects

    // Set up
    this.container = new THREE.Object3D()

    this.createWalls()
  }
  createWalls() {
    this.walls = this.models.models.walls.scene
    this.walls.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.receiveShadow = true
        if(child.name === 'Cube.002_1'){
          child.material.visible = false
        }
        this.objects.push(child)
      }
    })
    this.container.add(this.walls)
  }
}
