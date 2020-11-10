import * as THREE from 'three'

import CuttingBoard from './CuttingBoard.js'
import Microwave from './Microwave.js'
import ShelfKitchen from './ShelfKitchen.js'
import Sink from './Sink.js'
import SoHetic from './SoHetic.js'
import WorkSurface from './WorkSurface.js'

export default class Kitchen {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setCuttingBoard()
    this.setMicrowave()
    this.setShelfKitchen()
    this.setSink()
    this.setSoHetic()
    this.setWorkSurface()
  }
  setCuttingBoard() {
    this.cuttingBoard = new CuttingBoard({
      models: this.models,
    })
    this.container.add(this.cuttingBoard.container)
  }
  setMicrowave() {
    this.microwave = new Microwave({
      models: this.models,
    })
    this.container.add(this.microwave.container)
  }
  setShelfKitchen() {
    this.shelfKitchen = new ShelfKitchen({
      models: this.models,
    })
    this.container.add(this.shelfKitchen.container)
  }
  setSink() {
    this.sink = new Sink({
      models: this.models,
    })
    this.container.add(this.sink.container)
  }
  setSoHetic() {
    this.soHetic = new SoHetic({
      models: this.models,
    })
    this.container.add(this.soHetic.container)
  }
  setWorkSurface() {
    this.workSurface = new WorkSurface({
      models: this.models,
    })
    this.container.add(this.workSurface.container)
  }
}
