import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class RadiatorBathroom {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createRadiatorBathroom()
    this.setPhysics()
  }
  createRadiatorBathroom() {
    this.radiatorBathroom = this.models.models.radiatorBathroom.scene
    this.radiatorBathroom.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.radiatorBathroom)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.radiatorBathroom )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.radiatorBathroom.body = new CANNON.Body({
      mass: 0,
      position: this.center
    })

    this.radiatorBathroom.body.addShape(this.box)
    this.physics.world.addBody(this.radiatorBathroom.body)

    this.time.on('tick', () => {
      this.radiatorBathroom.quaternion.copy(this.radiatorBathroom.body.quaternion)
      this.radiatorBathroom.position.set(
        this.radiatorBathroom.body.position.x - this.center.x,
        this.radiatorBathroom.body.position.y - this.center.y,
        this.radiatorBathroom.body.position.z - this.center.z,
        )
    })
  }
}
