import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Mouse {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setMouse()
    this.setPhysics()
  }
  setMouse() {
    this.mouse = this.models.models.mouse.scene
    this.mouse.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.mouse)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.mouse )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.mouse.body = new CANNON.Body({
      mass: 0.1,
      position: this.center
    })

    this.mouse.body.addShape(this.box)
    this.physics.world.addBody(this.mouse.body)

    this.time.on('tick', () => {
      this.mouse.quaternion.copy(this.mouse.body.quaternion)
      this.mouse.position.set(
        this.mouse.body.position.x - this.center.x,
        this.mouse.body.position.y - this.center.y,
        this.mouse.body.position.z - this.center.z,
        )
    })
  }
}
