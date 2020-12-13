import { Object3D, FrontSide, Color, PointLight, Vector3, Box3 } from 'three'
import { Body } from 'cannon-es'
import { threeToCannon } from 'three-to-cannon'

export default class LightBed {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models
    this.physics = options.physics

    // Set up
    this.container = new Object3D()

    this.createLightBed()
    this.setLight()
    // this.setPhysics()
  }
  createLightBed() {
    this.lightBed = this.models.lightBed.scene
    this.lightBed.traverse((child) => {
      if (child.isMesh) {
        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if (child.name === 'Cylinder_1') {
          child.material.emissive = new Color(0xeaeaea)
        }
      }
    })
    this.container.add(this.lightBed)
  }
  setLight() {
    this.light = new PointLight(0xffaf88, 0.1, 0, 2)
    this.light.shadow.camera.near = 0.2
    this.light.castShadow = true
    this.light.position.set(1.01, 1.72, 2.8)
    this.container.add(this.light)
  }
  setPhysics() {
    this.size = new Vector3()
    this.center = new Vector3()
    this.calcBox = new Box3().setFromObject(this.lightBed)

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.shape = threeToCannon(this.lightBed, { type: threeToCannon.Type.HULL })

    this.lightBed.body = new Body({
      mass: 3,
      shape: this.shape,
      position: this.center,
    })

    this.physics.world.addBody(this.lightBed.body)
  }
}
