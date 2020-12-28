import { Object3D, FrontSide, Vector3, Box3, MeshLambertMaterial } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class Phone {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new Object3D()

    this.setPhone()
    this.setPhysics()
  }
  setPhone() {
    this.phone = this.models.phone.scene
    this.phone.traverse((child) => {
      if (child.isMesh) {
        const prevMaterial = child.material
        child.material = new MeshLambertMaterial()
        child.material.copy(prevMaterial)

        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.phone)
  }
  setPhysics() {
    this.size = new Vector3()
    this.center = new Vector3()
    this.calcBox = new Box3().setFromObject(this.phone)

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new Box(new Vec3().copy(this.size))
    this.phone.body = new Body({
      mass: 0.1,
      position: this.center,
    })

    this.phone.body.addShape(this.box)
    this.physics.world.addBody(this.phone.body)

    // this.time.on('tick', () => {
    //   this.phone.quaternion.copy(this.phone.body.quaternion)
    //   this.phone.position.set(
    //     this.phone.body.position.x - this.center.x,
    //     this.phone.body.position.y - this.center.y,
    //     this.phone.body.position.z - this.center.z
    //   )
    // })
  }
}
