import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Walls {
  constructor(options) {
    // Options
    this.models = options.models
    this.objects = options.objects
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.createWalls()
    this.setPhysics()
  }
  createWalls() {
    this.walls = this.models.models.walls.scene
    this.walls.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.receiveShadow = true
        child.castShadow = true
        if (child.name === 'Cube.002_1') {
          child.material.visible = false
        }
      }
    })
    this.container.add(this.walls)
  }
  setPhysics() {
    this.walls.children.forEach( (wall) => {
      this.size = new THREE.Vector3()
      this.center = new THREE.Vector3()
      this.calcBox = new THREE.Box3().setFromObject( wall )

      this.calcBox.getSize(this.size)
      this.size.x *= 0.5
      this.size.y *= 0.5
      this.size.z *= 0.5
      this.calcBox.getCenter(this.center)

      this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
      wall.body = new CANNON.Body({
        mass: 0,
        // position: this.center
      })

      wall.body.addShape(this.box, new CANNON.Vec3(this.center.x, this.center.y, this.center.z))
      this.physics.world.addBody(wall.body)
    })
  }
}
