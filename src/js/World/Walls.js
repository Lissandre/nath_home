import { Object3D, Vector3, Box3, DoubleSide, FrontSide } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class Walls {
  constructor(options) {
    // Options
    this.models = options.models
    this.objects = options.objects
    this.physics = options.physics

    // Set up
    this.container = new Object3D()

    this.createWalls()
    this.setPhysics()
  }
  createWalls() {
    this.walls = this.models.walls.scene
    this.walls.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true
        child.castShadow = true
        if (child.name === 'Cube.002_3' || child.name === 'Cube.002_2') {
          child.material = child.material.clone()
          child.material.name = `copy_${child.material.name}`
          child.material.side = DoubleSide
          child.receiveShadow = false
        } else if (child.name === 'Cube.002_1') {
          child.visible = false
        } else {
          child.material.side = FrontSide
        }
      }
    })
    this.container.add(this.walls)
  }
  setPhysics() {
    this.walls.children.forEach((wall) => {
      this.size = new Vector3()
      this.center = new Vector3()
      this.calcBox = new Box3().setFromObject(wall)

      this.calcBox.getSize(this.size)
      this.size.x *= 0.5
      this.size.y *= 0.5
      this.size.z *= 0.5
      this.calcBox.getCenter(this.center)

      if (wall.name === 'Wall_Left_Bathroom') {
        console.log('bathroom wall : to do')
        this.box = new Box(new Vec3().copy(this.size))
        wall.body = new Body({
          mass: 0,
          // position: this.center
        })
        wall.body.addShape(
          this.box,
          new Vec3(this.center.x, this.center.y, this.center.z)
        )
      } else {
        this.box = new Box(new Vec3().copy(this.size))
        wall.body = new Body({
          mass: 0,
          // position: this.center
        })
        wall.body.addShape(
          this.box,
          new Vec3(this.center.x, this.center.y, this.center.z)
        )
      }

      this.physics.world.addBody(wall.body)
    })
  }
}
