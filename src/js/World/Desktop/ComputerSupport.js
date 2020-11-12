import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class ComputerSupport {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createComputerSupport()
    this.setPhysics()
  }
  createComputerSupport() {
    this.computerSupport = this.models.models.computerSupport.scene
    this.computerSupport.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.computerSupport.children[0].applyMatrix4(this.computerSupport.matrixWorld)
    this.container.add(this.computerSupport)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.computerSupport )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.computerSupport.body = new CANNON.Body({
      mass: 22,
      position: this.center
    })

    this.computerSupport.body.addShape(this.box)
    this.physics.world.addBody(this.computerSupport.body)

    this.time.on('tick', () => {
      this.computerSupport.quaternion.copy(this.computerSupport.body.quaternion)
      this.computerSupport.position.set(
        this.computerSupport.body.position.x - this.center.x,
        this.computerSupport.body.position.y - this.center.y,
        this.computerSupport.body.position.z - this.center.z,
        )
    })
  }
}
