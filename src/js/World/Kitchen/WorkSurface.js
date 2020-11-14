import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class WorkSurface {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createWorkSurface()
    this.setPhysics()
  }
  createWorkSurface() {
    this.workSurface = this.models.models.workSurface.scene
    this.workSurface.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.workSurface)
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
      mass: 0,
      position: this.center
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)
  }
}
