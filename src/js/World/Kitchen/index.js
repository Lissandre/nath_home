import * as THREE from 'three'

import Microwave from './Microwave.js'
import Sink from './Sink.js'
import WorkSurface from './WorkSurface.js'

export default class DesktopPlace {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setMicrowave()
    this.setSink()
    this.setWorkSurface()
  }
  setMicrowave() {
    this.microwave = new Microwave({
      models: this.models,
    })
    this.container.add(this.microwave.container)
  }
  setSink() {
    this.sink = new Sink({
      models: this.models,
    })
    this.container.add(this.sink.container)
  }
  setWorkSurface() {
    this.workSurface = new WorkSurface({
      models: this.models,
    })
    this.container.add(this.workSurface.container)
  }
}
