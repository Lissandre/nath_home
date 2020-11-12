import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class RubiksCube {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setRubiksCube()
    this.setPhysics()
  }
  setRubiksCube() {
    this.rubiksCube = this.models.models.rubiksCube.scene
    this.rubiksCube.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.rubiksCube)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.rubiksCube )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.rubiksCube.body = new CANNON.Body({
      mass: 0.1,
      position: this.center
    })

    this.rubiksCube.body.addShape(this.box)
    this.physics.world.addBody(this.rubiksCube.body)

    this.time.on('tick', () => {
      this.rubiksCube.quaternion.copy(this.rubiksCube.body.quaternion)
      this.rubiksCube.position.set(
        this.rubiksCube.body.position.x - this.center.x,
        this.rubiksCube.body.position.y - this.center.y,
        this.rubiksCube.body.position.z - this.center.z,
        )
    })
  }
}
