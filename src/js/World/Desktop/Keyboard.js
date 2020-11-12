import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Keyboard {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createKeyboard()
    this.setPhysics()
  }
  createKeyboard() {
    this.keyboard = this.models.models.keyboard.scene
    this.keyboard.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.keyboard)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.keyboard )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.keyboard.body = new CANNON.Body({
      mass: 0.1,
      quaternion: this.keyboard.quaternion,
      position: this.center,
    })

    this.keyboard.body.addShape(this.box)
    this.physics.world.addBody(this.keyboard.body)

    this.time.on('tick', () => {
      this.keyboard.quaternion.copy(this.keyboard.body.quaternion)
      this.keyboard.position.set(
        this.keyboard.body.position.x - this.center.x,
        this.keyboard.body.position.y - this.center.y,
        this.keyboard.body.position.z - this.center.z,
        )
    })
  }
}
