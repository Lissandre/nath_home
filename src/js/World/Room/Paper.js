import { Object3D, DoubleSide, Vector3, Box3 } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class Paper {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics
    this.pObjects = options.objects

    // Set up
    this.container = new Object3D()

    this.createPaper()
    this.setPhysics()
  }
  createPaper() {
    this.paper = this.models.paper.scene
    this.paper.traverse((child) => {
      if (child.isMesh) {
        child.material.side = DoubleSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.paper)
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
      mass: 4,
      position: this.center,
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)
    this.pObjects.push({
      container: this.container,
      center: this.center,
    })
  }
}
