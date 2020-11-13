import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class ShelfBed {
  constructor(options) {
    // Options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfBed()
    this.setPhysics()
  }
  createShelfBed() {
    this.shelfBed = this.models.models.shelfBed.scene
    this.shelfBed.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfBed)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.shelfBed )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.shelfBed.body = new CANNON.Body({
      mass: 0,
      position: this.center
    })

    this.shelfBed.body.addShape(this.box)
    this.physics.world.addBody(this.shelfBed.body)

    this.time.on('tick', () => {
      this.shelfBed.quaternion.copy(this.shelfBed.body.quaternion)
      this.shelfBed.position.set(
        this.shelfBed.body.position.x - this.center.x,
        this.shelfBed.body.position.y - this.center.y,
        this.shelfBed.body.position.z - this.center.z,
        )
    })
  }
}
