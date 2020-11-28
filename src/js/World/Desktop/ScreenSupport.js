import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class ScreenSupport {
  constructor(options) {
    // Set options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics
    this.pObjects = options.objects

    // Set up
    this.container = new THREE.Object3D()

    this.setScreenSupport()
    // this.setPhysics()
  }
  setScreenSupport() {
    this.screenSupport = this.models.models.screenSupport.scene
    this.screenSupport.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.screenSupport)
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

    this.box = new CANNON.Box(new CANNON.Vec3().copy(this.size))
    this.container.body = new CANNON.Body({
      mass: 3,
      position: this.center,
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)

    // this.desktop = this.pObjects.find(element => element.name === 'Desktop')

    // this.deskSize = new THREE.Vector3()
    // this.deskCenter = new THREE.Vector3()

    // this.deskBox = new THREE.Box3().setFromObject( this.desktop.container )

    // this.deskBox.getSize(this.deskSize)
    // this.deskSize.x *= 0.5
    // this.deskSize.y *= 0.5
    // this.deskSize.z *= 0.5
    // this.deskBox.getCenter(this.deskCenter)

    // this.deskConstraint = new CANNON.PointToPointConstraint(
    //   this.container.body,
    //   new CANNON.Vec3(this.center.x, 0, this.size.z),
    //   this.desktop.container.body,
    //   new CANNON.Vec3(this.deskCenter.x, this.deskCenter.y, this.deskSize.z *2),
    // )
    // this.physics.world.addConstraint(this.deskConstraint)

    this.pObjects.push({
      name: this.screenSupport.children[0].name,
      container: this.container,
      center: this.center,
    })
  }
}
