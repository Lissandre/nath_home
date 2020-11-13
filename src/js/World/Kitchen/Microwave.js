import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Microwave {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createMicrowave()
    this.setPhysics()
  }
  createMicrowave() {
    this.microwave = this.models.models.microwave.scene
    this.microwave.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.microwave)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.microwave )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.microwave.body = new CANNON.Body({
      mass: 6.5,
      position: this.center
    })

    this.microwave.body.addShape(this.box)
    this.physics.world.addBody(this.microwave.body)

    this.time.on('tick', () => {
      this.microwave.quaternion.copy(this.microwave.body.quaternion)
      this.microwave.position.set(
        this.microwave.body.position.x - this.center.x,
        this.microwave.body.position.y - this.center.y,
        this.microwave.body.position.z - this.center.z,
        )
    })
  }
}
