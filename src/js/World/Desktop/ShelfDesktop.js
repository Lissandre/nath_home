import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class ShelfDesktop {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfDesktop()
    this.setPhysics()
  }
  createShelfDesktop() {
    this.shelfDesktop = this.models.models.shelfDesktop.scene
    this.shelfDesktop.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfDesktop)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.shelfDesktop )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.shelfDesktop.body = new CANNON.Body({
      mass: 0,
      position: this.center
    })

    this.shelfDesktop.body.addShape(this.box)
    this.physics.world.addBody(this.shelfDesktop.body)

    this.time.on('tick', () => {
      this.shelfDesktop.quaternion.copy(this.shelfDesktop.body.quaternion)
      this.shelfDesktop.position.set(
        this.shelfDesktop.body.position.x - this.center.x,
        this.shelfDesktop.body.position.y - this.center.y,
        this.shelfDesktop.body.position.z - this.center.z,
        )
    })
  }
}
