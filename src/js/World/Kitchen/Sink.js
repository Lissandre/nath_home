import { Object3D, FrontSide, Color, PointLight, Vector3, Box3 } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class Sink {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new Object3D()

    this.createSink()
    this.addLight()
    this.setPhysics()
  }
  createSink() {
    this.sink = this.models.models.sink.scene
    this.sink.traverse((child) => {
      if (child.isMesh) {
        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if (child.material.name === 'Glass') {
          child.material.emissive = new Color(0xffffff)
          child.material.emissiveIntensity = 1
        }
      }
    })
    this.container.add(this.sink)
  }
  addLight() {
    this.light = new PointLight(0xffffff, 0.2, 0, 2)
    this.light.castShadow = true
    this.light.shadow.camera.near = 0.1
    this.light.position.set(-2.7, 1.41, 2.2)
    this.container.add(this.light)
  }
  setPhysics() {
    this.size = new Vector3()
    this.center = new Vector3()
    this.calcBox = new Box3().setFromObject(this.sink)

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new Box(new Vec3().copy(this.size))
    this.sink.body = new Body({
      mass: 0,
      position: this.center,
    })

    this.sink.body.addShape(this.box)
    this.physics.world.addBody(this.sink.body)

    this.time.on('tick', () => {
      this.sink.quaternion.copy(this.sink.body.quaternion)
      this.sink.position.set(
        this.sink.body.position.x - this.center.x,
        this.sink.body.position.y - this.center.y,
        this.sink.body.position.z - this.center.z
      )
    })
  }
}
