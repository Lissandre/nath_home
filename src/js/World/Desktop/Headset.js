import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Headset {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createHeadset()
    this.setPhysics()
  }
  createHeadset() {
    this.headset = this.models.models.headset.scene
    this.headset.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.headset)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.headset )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.headset.body = new CANNON.Body({
      mass: 0.1,
      position: this.center
    })

    this.headset.body.addShape(this.box)
    this.physics.world.addBody(this.headset.body)

    this.time.on('tick', () => {
      this.headset.quaternion.copy(this.headset.body.quaternion)
      this.headset.position.set(
        this.headset.body.position.x - this.center.x,
        this.headset.body.position.y - this.center.y,
        this.headset.body.position.z - this.center.z,
        )
    })
  }
}
