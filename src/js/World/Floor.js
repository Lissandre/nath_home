import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Floor {
  constructor(options) {
    // Set options
    this.models = options.models
    this.objects = options.objects
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setFloor()
    this.setPhysics()
  }
  setFloor() {
    this.floor = this.models.models.floor.scene
    this.floor.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.BackSide
        child.receiveShadow = true
      }
    })
    this.container.add(this.floor)
  }
  setPhysics(){
    this.ground = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      position: new CANNON.Vec3(0, 0, 0),
      material: this.physics.groundMaterial
    })
    this.ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2)

    this.physics.world.addBody(this.ground);
  }
}
