import * as THREE from 'three'
import music from '@sounds/music.mp3'

export default class Speakers {
  constructor(options) {
    // Set options
    this.models = options.models
    this.camera = options.camera

    // Set up
    this.container = new THREE.Object3D()

    this.setSpeakers()
    this.setLightSpeakers()
    this.setMusic()
  }
  setSpeakers() {
    this.speakers = this.models.models.speakers.scene
    this.speakers.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.FrontSide
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.speakers)
  }
  setLightSpeakers() {
    this.leftLight = new THREE.SpotLight(0x8b58ff, 0.3, 2000, 0.8, 0.25, 2)
    this.leftLight.position.set(-0.6, 0.89, -0.26)
    this.leftLight.castShadow = true
    this.leftLightTarget = new THREE.Object3D()
    this.leftLightTarget.position.set(-0.62, 0.89, -0.29)
    this.container.add(this.leftLightTarget)
    this.leftLight.shadow.camera.near = 0.01
    this.container.add(this.leftLight)
    this.leftLight.target = this.leftLightTarget

    this.rightLight = new THREE.SpotLight(0x8b58ff, 0.3, 2000, 0.8, 0.25, 2)
    this.rightLight.position.set(0.6, 0.89, -0.27)
    this.rightLight.castShadow = true
    this.rightLightTarget = new THREE.Object3D()
    this.rightLightTarget.position.set(0.62, 0.89, -0.3)
    this.container.add(this.rightLightTarget)
    this.rightLight.shadow.camera.near = 0.01
    this.container.add(this.rightLight)
    this.rightLight.target = this.rightLightTarget
  }
  setMusic() {
    this.listener = new THREE.AudioListener()
    this.camera.camera.add( this.listener )
    this.sound = new THREE.PositionalAudio( this.listener )
    // load a sound and set it as the PositionalAudio object's buffer
    this.audioLoader = new THREE.AudioLoader()
    this.audioLoader.load( music, (buffer) => {
      this.sound.setBuffer( buffer )
      this.sound.setRefDistance( 0.25 )
      this.sound.play()
    })
    this.speakers.traverse((child) => {
      if (child.isMesh) {
        child.add(this.sound)
      }
    })
  }
}
