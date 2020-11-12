import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class DesktopLeft {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createDesktopLeft()
    this.setPhysics()
  }
  createDesktopLeft() {
    this.desktopLeft = this.models.models.desktopLeft.scene
    this.desktopLeft.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.desktopLeft)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.desktopLeft )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.desktopLeft.body = new CANNON.Body({
      mass: 10,
      position: this.center
    })

    this.desktopLeft.body.addShape(this.box)
    this.physics.world.addBody(this.desktopLeft.body)

    this.time.on('tick', () => {
      this.desktopLeft.quaternion.copy(this.desktopLeft.body.quaternion)
      this.desktopLeft.position.set(
        this.desktopLeft.body.position.x - this.center.x,
        this.desktopLeft.body.position.y - this.center.y,
        this.desktopLeft.body.position.z - this.center.z,
        )
    })
  }
}
