import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class ShelfWall {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfWall()
    this.setPhysics()
  }
  createShelfWall() {
    this.shelfWall = this.models.models.shelfWall.scene
    this.shelfWall.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfWall)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.shelfWall )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.shelfWall.body = new CANNON.Body({
      mass: 0,
      position: this.center
    })

    this.shelfWall.body.addShape(this.box)
    this.physics.world.addBody(this.shelfWall.body)

    this.time.on('tick', () => {
      this.shelfWall.quaternion.copy(this.shelfWall.body.quaternion)
      this.shelfWall.position.set(
        this.shelfWall.body.position.x - this.center.x,
        this.shelfWall.body.position.y - this.center.y,
        this.shelfWall.body.position.z - this.center.z,
        )
    })
  }
}
