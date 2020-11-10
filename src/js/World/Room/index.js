import * as THREE from 'three'

import Bed from './Bed.js'
import LightBed from './LightBed.js'
import NightTable from './NightTable.js'
import Paper from './Paper.js'
import Radiator from './Radiator.js'
import ShelfBed from './ShelfBed.js'
import Table from './Table.js'

export default class Room {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setBed()
    this.setLightBed()
    this.setNightTable()
    this.setPaper()
    this.setRadiator()
    this.setShelfBed()
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
  setNightTable() {
    this.nightTable = new NightTable({
      models: this.models,
    })
    this.container.add(this.nightTable.container)
  }
  setPaper() {
    this.paper = new Paper({
      models: this.models,
    })
    this.container.add(this.paper.container)
  }
  setRadiator() {
    this.radiator = new Radiator({
      models: this.models,
    })
    this.container.add(this.radiator.container)
  }
  setShelfBed() {
    this.shelfBed = new ShelfBed({
      models: this.models,
    })
    this.container.add(this.shelfBed.container)
  }
  setTable() {
    this.table = new Table({
      models: this.models,
    })
    this.container.add(this.table.container)
  }
}
