import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class NightTable {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createNightTable()
    this.setPhysics()
  }
  createNightTable() {
    this.nightTable = this.models.models.nightTable.scene
    this.nightTable.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.nightTable)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.nightTable )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.nightTable.body = new CANNON.Body({
      mass: 4,
      position: this.center
    })

    this.nightTable.body.addShape(this.box)
    this.physics.world.addBody(this.nightTable.body)

    this.time.on('tick', () => {
      this.nightTable.quaternion.copy(this.nightTable.body.quaternion)
      this.nightTable.position.set(
        this.nightTable.body.position.x - this.center.x,
        this.nightTable.body.position.y - this.center.y,
        this.nightTable.body.position.z - this.center.z,
        )
    })
  }
}
