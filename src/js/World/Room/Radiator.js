import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Radiator {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createRadiator()
    this.setPhysics()
  }
  createRadiator() {
    this.radiator = this.models.models.radiator.scene
    this.radiator.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.radiator)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.radiator )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.radiator.body = new CANNON.Body({
      mass: 0,
      position: this.center
    })

    this.radiator.body.addShape(this.box)
    this.physics.world.addBody(this.radiator.body)

    this.time.on('tick', () => {
      this.radiator.quaternion.copy(this.radiator.body.quaternion)
      this.radiator.position.set(
        this.radiator.body.position.x - this.center.x,
        this.radiator.body.position.y - this.center.y,
        this.radiator.body.position.z - this.center.z,
        )
    })
  }
}
