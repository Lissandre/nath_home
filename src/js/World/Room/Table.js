import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Table {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createTable()
    this.setPhysics()
  }
  createTable() {
    this.table = this.models.models.table.scene
    this.table.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.table)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.table )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.table.body = new CANNON.Body({
      mass: 2,
      position: this.center
    })

    this.table.body.addShape(this.box)
    this.physics.world.addBody(this.table.body)

    this.time.on('tick', () => {
      this.table.quaternion.copy(this.table.body.quaternion)
      this.table.position.set(
        this.table.body.position.x - this.center.x,
        this.table.body.position.y - this.center.y,
        this.table.body.position.z - this.center.z,
        )
    })
  }
}
