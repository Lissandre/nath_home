import * as THREE from 'three'

import Bed from './Bed.js'
import LightBed from './LightBed.js'
import Radiator from './Radiator.js'
import Table from './Table.js'

export default class DesktopPlace {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setBed()
    this.setLightBed()
    this.setRadiator()
    this.setTable()
  }
  setBed() {
    this.bed = new Bed({
      models: this.models,
    })
    this.container.add(this.bed.container)
  }
  setLightBed() {
    this.lightBed = new LightBed({
      models: this.models,
    })
    this.container.add(this.lightBed.container)
  }
  setRadiator() {
    this.radiator = new Radiator({
      models: this.models,
    })
    this.container.add(this.radiator.container)
  }
  setTable() {
    this.table = new Table({
      models: this.models,
    })
    this.container.add(this.table.container)
  }
}
