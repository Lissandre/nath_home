import * as THREE from 'three'

export default class RubiksCube {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setRubiksCube()
  }
  setRubiksCube() {
    this.rubiksCube = this.models.models.rubiksCube.scene
    this.rubiksCube.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.rubiksCube)
  }
}
