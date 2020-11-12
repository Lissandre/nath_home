import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class MousePad {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setMousePad()
    this.setPhysics()
  }
  setMousePad() {
    this.mousePad = this.models.models.mousePad.scene
    this.mousePad.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.mousePad)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.mousePad )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.mousePad.body = new CANNON.Body({
      mass: 0.15,
      position: this.center
    })

    this.mousePad.body.addShape(this.box)
    this.physics.world.addBody(this.mousePad.body)

    this.time.on('tick', () => {
      this.mousePad.quaternion.copy(this.mousePad.body.quaternion)
      this.mousePad.position.set(
        this.mousePad.body.position.x - this.center.x,
        this.mousePad.body.position.y - this.center.y,
        this.mousePad.body.position.z - this.center.z,
        )
    })
  }
}
