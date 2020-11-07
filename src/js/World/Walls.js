import * as THREE from 'three'
import { FrontSide } from 'three'

export default class Walls {
  constructor(options) {
    // Options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createWalls()
  }
  createWalls() {
    this.walls = this.models.models.walls.scene
    this.walls.traverse(child => {
      if(child.isMesh){
        child.castShadow = false
        child.receiveShadow = true
      }
    })
    console.log(this.walls);
    this.container.add(this.walls)
  }
}
