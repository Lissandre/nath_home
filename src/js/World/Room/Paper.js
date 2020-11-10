import * as THREE from 'three'

export default class Paper {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createPaper()
  }
  createPaper() {
    this.paper = this.models.models.paper.scene
    this.paper.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide
        child.castShadow = true
        child.receiveShadow = true
        if(child.name === 'Cylinder.004_4'){
          child.material.visible = false
        }
      }
    })
    this.container.add(this.paper)
  }
}
