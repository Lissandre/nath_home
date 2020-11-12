import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Computer {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createComputer()
    this.createComputerLight()
    this.setPhysics()
  }
  createComputer() {
    this.computer = this.models.models.computer.scene
    this.computer.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.computer)
  }
  createComputerLight() {
    this.topLight = new THREE.PointLight(0xca8fff, 0.3, 0.2, 2)
    this.topLight.position.set(0.9, 1.34, -0.16)
    this.container.add(this.topLight)

    this.bottomLight = new THREE.PointLight(0xca8fff, 0.3, 0.2, 2)
    this.bottomLight.position.set(0.9, 1.1, 0.12)
    this.container.add(this.bottomLight)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.computer )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.computer.body = new CANNON.Body({
      mass: 0.1,
      position: this.center
    })

    this.computer.body.addShape(this.box)
    this.physics.world.addBody(this.computer.body)

    this.time.on('tick', () => {
      this.computer.quaternion.copy(this.computer.body.quaternion)
      this.computer.position.set(
        this.computer.body.position.x - this.center.x,
        this.computer.body.position.y - this.center.y,
        this.computer.body.position.z - this.center.z,
        )
    })
  }
}
