import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Desktop {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createDesktop()
    this.setPhysics()
  }
  createDesktop() {
    this.desktop = this.models.models.desktop.scene
    this.desktop.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.desktop)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.desktop )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.desktop.body = new CANNON.Body({
      mass: 0.1,
      position: this.center
    })

    this.desktop.body.addShape(this.box)
    this.physics.world.addBody(this.desktop.body)

    this.time.on('tick', () => {
      this.desktop.quaternion.copy(this.desktop.body.quaternion)
      this.desktop.position.set(
        this.desktop.body.position.x - this.center.x,
        this.desktop.body.position.y - this.center.y,
        this.desktop.body.position.z - this.center.z,
        )
    })
  }
}
