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
      mass: 13,
      // position: this.center
    })

    this.computer.body.addShape(this.box, new CANNON.Vec3(this.center.x, this.center.y, this.center.z))
    this.physics.world.addBody(this.computer.body)

    this.time.on('tick', () => {
      this.computer.quaternion.set(
        this.computer.body.quaternion.x,
        this.computer.body.quaternion.y,
        this.computer.body.quaternion.z,
        this.computer.body.quaternion.w
      )
      this.computer.position.set(
        this.computer.body.position.x,
        this.computer.body.position.y,
        this.computer.body.position.z,
        )
    })
  }
}
