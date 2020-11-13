import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class ShelfKitchen {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createShelfKitchen()
    this.setPhysics()
  }
  createShelfKitchen() {
    this.shelfKitchen = this.models.models.shelfKitchen.scene
    this.shelfKitchen.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.shelfKitchen)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.shelfKitchen )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.shelfKitchen.body = new CANNON.Body({
      mass: 0,
      position: this.center
    })

    this.shelfKitchen.body.addShape(this.box)
    this.physics.world.addBody(this.shelfKitchen.body)

    this.time.on('tick', () => {
      this.shelfKitchen.quaternion.copy(this.shelfKitchen.body.quaternion)
      this.shelfKitchen.position.set(
        this.shelfKitchen.body.position.x - this.center.x,
        this.shelfKitchen.body.position.y - this.center.y,
        this.shelfKitchen.body.position.z - this.center.z,
        )
    })
  }
}
