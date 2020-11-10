import * as THREE from 'three'

export default class Table {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createTable()
  }
  createTable() {
    this.table = this.models.models.table.scene
    this.table.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.table)
  }
}
