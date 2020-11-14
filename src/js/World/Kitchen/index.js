import * as THREE from 'three'

import BasicObjects from './BasicObjects.js'
import SoHetic from './SoHetic.js'
import WorkSurface from './WorkSurface.js'

export default class Kitchen {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setBasicObjects()
    this.setSoHetic()
    this.setWorkSurface()
  }
  setBasicObjects() {
    this.basicObjects = new BasicObjects({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.basicObjects.objects.forEach(object => {
      this.container.add(object.container)
    })
  }
  setSoHetic() {
    this.soHetic = new SoHetic({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.soHetic.container)
  }
  setWorkSurface() {
    this.workSurface = new WorkSurface({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.workSurface.container)
  }
}
