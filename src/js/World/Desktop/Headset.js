import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { threeToCannon } from 'three-to-cannon'

export default class Headset {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics
    this.pObjects = options.objects

    // Set up
    this.container = new THREE.Object3D()

    this.createHeadset()
    this.setPhysics()
  }
  createHeadset() {
    this.headset = this.models.models.headset.scene
    this.headset.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.headset)
  }
  setPhysics() {
    this.size = new THREE.Vector3()
    this.center = new THREE.Vector3()
    this.calcBox = new THREE.Box3().setFromObject(this.container)

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.shape = threeToCannon(this.container, {
      type: threeToCannon.Type.CYLINDER,
    })

    // this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.container.body = new CANNON.Body({
      mass: 0.3,
      shape: this.shape,
      position: this.center,
    })
    this.physics.world.addBody(this.container.body)
    this.pObjects.push({
      container: this.container,
      center: this.center,
    })
  }
}
