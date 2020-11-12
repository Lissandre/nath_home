import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class DesktopRight {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createDesktopRight()
    this.setPhysics()
  }
  createDesktopRight() {
    this.desktopRight = this.models.models.desktopRight.scene
    this.desktopRight.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.desktopRight)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject( this.desktopRight )

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.desktopRight.body = new CANNON.Body({
      mass: 10,
      position: this.center
    })

    this.desktopRight.body.addShape(this.box)
    this.physics.world.addBody(this.desktopRight.body)

    this.time.on('tick', () => {
      this.desktopRight.quaternion.copy(this.desktopRight.body.quaternion)
      this.desktopRight.position.set(
        this.desktopRight.body.position.x - this.center.x,
        this.desktopRight.body.position.y - this.center.y,
        this.desktopRight.body.position.z - this.center.z,
        )
    })
  }
}
