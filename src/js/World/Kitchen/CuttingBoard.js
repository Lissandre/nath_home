import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class CuttingBoard {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createCuttingBoard()
    this.setPhysics()
  }
  createCuttingBoard() {
    this.cuttingBoard = this.models.models.cuttingBoard.scene
    this.cuttingBoard.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.cuttingBoard)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.cuttingBoard )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.cuttingBoard.body = new CANNON.Body({
      mass: 0.2,
      position: this.center
    })

    this.cuttingBoard.body.addShape(this.box)
    this.physics.world.addBody(this.cuttingBoard.body)

    this.time.on('tick', () => {
      this.cuttingBoard.quaternion.copy(this.cuttingBoard.body.quaternion)
      this.cuttingBoard.position.set(
        this.cuttingBoard.body.position.x - this.center.x,
        this.cuttingBoard.body.position.y - this.center.y,
        this.cuttingBoard.body.position.z - this.center.z,
        )
    })
  }
}
