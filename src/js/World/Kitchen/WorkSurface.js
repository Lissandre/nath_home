import { Object3D, FrontSide, Vector3, Box3 } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class WorkSurface {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new Object3D()

    this.createWorkSurface()
    this.setPhysics()
  }
  createWorkSurface() {
    this.workSurface = this.models.workSurface.scene
    this.workSurface.traverse((child) => {
      if (child.isMesh) {
        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.workSurface)
  }
  setPhysics() {
    this.size = new Vector3()
    this.center = new Vector3()
    this.calcBox = new Box3().setFromObject(this.container)

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new Box(new Vec3().copy(this.size))
    this.container.body = new Body({
      mass: 0,
      position: this.center,
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)
  }
}
