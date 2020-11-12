import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { TweenMax } from 'gsap'

import music from '@sounds/music.mp3'

export default class SpeakerRight {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics
    this.camera = options.camera

    // Set up
    this.container = new THREE.Object3D()
    this.colors = ['#8B58FF', '#FE3ACC', '#FF5392', '#FF8E63', '#FFC751', '#F9F871']

    this.setSpeakerRight()
    this.setLightSpeakerRight()
    this.setMusic()
    this.setPhysics()
  }
  setSpeakerRight() {
    this.speakerRight = this.models.models.speakerRight.scene
    this.speakerRight.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
        if(child.name === 'Cylinder.002_1'){
          this.colorSpeaker = child.material
          this.colorSpeaker.emissive = this.colorSpeaker.color
          this.colorSpeaker.emissiveIntensity = 0.2
        }
      }
    })
    this.container.add(this.speakerRight)
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
      mass: 2,
      position: this.center
    })

    this.container.body.addShape(this.box)
    this.physics.world.addBody(this.container.body)

    this.time.on('tick', () => {
      this.container.quaternion.copy(this.container.body.quaternion)
      this.container.position.set(
        this.container.body.position.x - this.center.x,
        this.container.body.position.y - this.center.y,
        this.container.body.position.z - this.center.z,
        )
    })
  }
}
