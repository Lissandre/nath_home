import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class PhoneSupport {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setPhoneSupport()
    this.setPhysics()
  }
  setPhoneSupport() {
    this.phoneSupport = this.models.models.phoneSupport.scene
    this.phoneSupport.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.phoneSupport)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.phoneSupport )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.phoneSupport.body = new CANNON.Body({
      mass: 0.1,
      position: this.center
    })

    this.phoneSupport.body.addShape(this.box)
    this.physics.world.addBody(this.phoneSupport.body)

    this.time.on('tick', () => {
      this.phoneSupport.quaternion.copy(this.phoneSupport.body.quaternion)
      this.phoneSupport.position.set(
        this.phoneSupport.body.position.x - this.center.x,
        this.phoneSupport.body.position.y - this.center.y,
        this.phoneSupport.body.position.z - this.center.z,
        )
    })
  }
}
