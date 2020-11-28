import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class SpeakerLeft {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics
    this.pObjects = options.objects

    // Set up
    this.container = new THREE.Object3D()
    this.colorSpeaker = null

    this.setSpeakerLeft()
    this.setLightSpeakerLeft()
    this.setPhysics()
  }
  setSpeakerLeft() {
    this.speakerLeft = this.models.models.speakerLeft.scene
    this.speakerLeft.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if (child.name === 'Cylinder.002_1') {
          this.colorSpeaker = child.material
          this.colorSpeaker.emissive = this.colorSpeaker.color
          this.colorSpeaker.emissiveIntensity = 0.2
        }
      }
    })
    this.container.add(this.speakerLeft)
  }
  setLightSpeakerLeft() {
    this.leftLight = new THREE.SpotLight(0x8b58ff, 0.3, 2000, 0.8, 0.25, 2)
    this.leftLight.position.set(-0.6, 0.89, -0.26)
    this.leftLight.castShadow = true
    this.leftLightTarget = new THREE.Object3D()
    this.leftLightTarget.position.set(-0.62, 0.89, -0.29)
    this.container.add(this.leftLightTarget)
    this.leftLight.shadow.camera.near = 0.01
    this.container.add(this.leftLight)
    this.leftLight.target = this.leftLightTarget
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
