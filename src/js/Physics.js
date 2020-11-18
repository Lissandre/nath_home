import * as CANNON from 'cannon-es'
import * as THREE from 'three'

export default class Physics{
  constructor(options){
    // Set options
    this.time = options.time
    this.objects = options.objects
    this.camera = options.camera

    // Set up
    this.setWorld()
    this.setPersoPhysics()
    this.setTime()
  }
  setWorld() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.broadphase = new CANNON.SAPBroadphase(this.world)
		this.world.solver.iterations = 10
    this.world.allowSleep = true
    this.world.quatNormalizeFast = true
    this.world.bodies.forEach(body => {body.sleepSpeedLimit = .1})
  }
  setPersoPhysics(){
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.camera.head )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.camera.head.body = new CANNON.Body({
      mass: 0.0000001,
      position: this.center
    })

    this.camera.head.body.addShape(this.box)
    this.world.addBody(this.camera.head.body)
  }
  setTime() {
    this.time.on('tick', () => {
      this.objects.forEach(object => {
        object.container.quaternion.copy(object.container.body.quaternion)
        object.container.position.set(
          object.container.body.position.x - object.center.x,
          object.container.body.position.y - object.center.y,
          object.container.body.position.z - object.center.z,
        )
      })
      // this.camera.camera.quaternion.copy(this.camera.head.body.quaternion)
      // this.camera.camera.position.set(
      //   this.camera.head.body.position.x - this.center.x,
      //   this.camera.head.body.position.y - this.center.y,
      //   this.camera.head.body.position.z - this.center.z,
      // )
      this.world.step(1 / 60, this.time.delta, 3)
    })
  }
}