import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class BasicObjects {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models.models
    this.physics = options.physics

    // Set up
    this.objects = [
      {src: this.models.radiatorBathroom.scene, mass: 0, container: new THREE.Object3D()},
    ]

    this.createObjects()
    this.setPhysics()
  }
  createObjects() {
    this.objects.forEach((object) => {
      const obj = object.src
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material.side = THREE.FrontSide
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      object.container.add(obj)
    })
  }
  setPhysics() {
    this.objects.forEach((object) => {
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      const calcBox = new THREE.Box3().setFromObject( object.container )

      calcBox.getSize(size)
      size.x *= 0.5
      size.y *= 0.5
      size.z *= 0.5
      calcBox.getCenter(center)

      const box = new CANNON.Box(new CANNON.Vec3().copy(size))
      object.container.body = new CANNON.Body({
        mass: object.mass,
        position: center
      })

      object.container.body.addShape(box)
      this.physics.world.addBody(object.container.body)

      this.time.on('tick', () => {
        object.container.quaternion.copy(object.container.body.quaternion)
        object.container.position.set(
          object.container.body.position.x - center.x,
          object.container.body.position.y - center.y,
          object.container.body.position.z - center.z,
          )
      })
    })
  }
}
