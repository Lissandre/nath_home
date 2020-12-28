import {
  Object3D,
  FrontSide,
  SpotLight,
  Vector3,
  Box3,
  MeshLambertMaterial,
} from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class SpeakerLeft {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics
    this.pObjects = options.objects

    // Set up
    this.container = new Object3D()
    this.colorSpeaker = null

    this.setSpeakerLeft()
    this.setLightSpeakerLeft()
    this.setPhysics()
  }
  setSpeakerLeft() {
    this.speakerLeft = this.models.speakerLeft.scene
    this.speakerLeft.traverse((child) => {
      if (child.isMesh) {
        const prevMaterial = child.material
        child.material = new MeshLambertMaterial()
        child.material.copy(prevMaterial)

        child.material.side = FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if (child.name === 'Cylinder002_1') {
          this.colorSpeaker = child.material
          this.colorSpeaker.emissive = this.colorSpeaker.color
          this.colorSpeaker.emissiveIntensity = 0.2
        }
      }
    })
    this.container.add(this.speakerLeft)
  }
  setLightSpeakerLeft() {
    this.leftLight = new SpotLight(0x8b58ff, 0.3, 2000, 0.8, 0.25, 2)
    this.leftLight.position.set(-0.6, 0.89, -0.26)
    this.leftLight.castShadow = true
    this.leftLightTarget = new Object3D()
    this.leftLightTarget.position.set(-0.62, 0.89, -0.29)
    this.container.add(this.leftLightTarget)
    this.leftLight.shadow.camera.near = 0.01
    this.container.add(this.leftLight)
    this.leftLight.target = this.leftLightTarget
  }
  setPhysics() {
    this.size = new Vector3()
    this.center = new Vector3()
    this.calcBox = new Box3().setFromObject(this.container)

    this.calcBox.getSize(this.size)
    this.size.x *= 0.5
    this.size.y *= 0.5
    this.size.z *= 0.5
    this.calcBox.getCenter(this.center)

    this.box = new Box(new Vec3().copy(this.size))
    this.container.body = new Body({
      mass: 2,
      position: this.center,
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)
    this.pObjects.push({
      container: this.container,
      center: this.center,
    })
  }
}
