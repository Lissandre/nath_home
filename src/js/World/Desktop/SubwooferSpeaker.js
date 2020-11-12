import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class SubwooferSpeaker {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setSubwooferSpeaker()
    this.setPhysics()
  }
  setSubwooferSpeaker() {
    this.subwooferSpeaker = this.models.models.subwooferSpeaker.scene
    this.subwooferSpeaker.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.subwooferSpeaker)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.container )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.container.body = new CANNON.Body({
      mass: 3,
      position: this.center
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)

    this.time.on('tick', () => {
      this.container.quaternion.copy(this.container.body.quaternion)
      this.container.position.set(
        this.container.body.position.x - this.center.x,
        this.container.body.position.y - this.center.y,
        this.container.body.position.z - this.center.z,
        )
    })
  }
}
