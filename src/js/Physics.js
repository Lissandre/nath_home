import {
  World,
  SAPBroadphase,
  Body,
  Material,
  ContactMaterial,
} from 'cannon-es'
import { Vector3, Box3 } from 'three'
import { threeToCannon } from 'three-to-cannon'

export default class Physics {
  constructor(options) {
    // Set options
    this.time = options.time
    this.objects = options.objects
    this.camera = options.camera
    this.assets = options.assets

    // Set up
    this.setWorld()
    this.setPersoPhysics()
    this.setTime()
  }
  setWorld() {
    this.world = new World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.broadphase = new SAPBroadphase(this.world)
    this.world.solver.iterations = 20
    this.world.allowSleep = true
    this.world.quatNormalizeFast = true
    this.world.bodies.forEach((body) => {
      body.sleepSpeedLimit = 0.01
    })

    this.groundMaterial = new Material('groundMaterial')
    // Adjust constraint equation parameters for ground/ground contact
    this.ground_ground_cm = new ContactMaterial(
      this.groundMaterial,
      this.groundMaterial,
      {
        friction: 1,
        restitution: 0,
        contactEquationStiffness: 1000,
      }
    )
    // Add contact material to the world
    this.world.addContactMaterial(this.ground_ground_cm)
  }
  setPersoPhysics() {
    this.assets.on('ressourcesReady', () => {
      this.size = new Vector3()
      this.center = new Vector3()
      this.calcBox = new Box3().setFromObject(this.camera.head)

      this.calcBox.getSize(this.size)
      this.size.x *= 0.5
      this.size.y *= 0.5
      this.size.z *= 0.5
      this.calcBox.getCenter(this.center)

      this.shape = threeToCannon(this.camera.head, {
        type: threeToCannon.Type.CYLINDER,
      })
      this.camera.head.body = new Body({
        mass: 1,
        shape: this.shape,
        position: this.center,
        material: this.groundMaterial,
      })

      this.camera.head.body.angularDamping = 1
      this.camera.head.body.allowSleep = false

      this.world.addBody(this.camera.head.body)
    })
  }
  setTime() {
    this.time.on('tick', () => {
      this.objects.forEach((object) => {
        object.container.position.set(
          object.container.body.position.x - object.center.x,
          object.container.body.position.y - object.center.y,
          object.container.body.position.z - object.center.z
        )
        object.container.children[0].children[0].quaternion.set(
          object.container.body.quaternion.x,
          object.container.body.quaternion.y,
          object.container.body.quaternion.z,
          object.container.body.quaternion.w
        )
      })
      this.camera.head.quaternion.y = this.camera.camera.quaternion.y
      this.camera.head.quaternion.w = this.camera.camera.quaternion.w

      this.world.step(1 / 60, this.time.delta, 3)
    })
  }
}
