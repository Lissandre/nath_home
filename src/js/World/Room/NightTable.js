import * as THREE from 'three'

export default class NightTable {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createNightTable()
  }
  createNightTable() {
    this.nightTable = this.models.models.nightTable.scene
    this.nightTable.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.nightTable)
  }
}
