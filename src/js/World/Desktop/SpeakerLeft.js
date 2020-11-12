import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { TweenMax } from 'gsap'

import music from '@sounds/music.mp3'

export default class SpeakerLeft {
  constructor(options) {
    // Set options
    this.models = options.models
    this.time = options.time
    this.physics = options.physics
    this.camera = options.camera

    // Set up
    this.container = new THREE.Object3D()
    this.colors = ['#8B58FF', '#FE3ACC', '#FF5392', '#FF8E63', '#FFC751', '#F9F871']

    this.setSpeakerLeft()
    this.setLightSpeakerLeft()
    this.setMusic()
    this.setPhysics()
  }
  setSpeakerLeft() {
    this.speakerLeft = this.models.models.speakerLeft.scene
    this.speakerLeft.traverse((child) => {
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
    this.playing = false
    document.addEventListener('click', () => {
      if(this.playing === false){
        this.sound.play()
        this.playing = true
      }
    })
    this.listener = new THREE.AudioListener()
    this.camera.camera.add( this.listener )

    this.sound = new THREE.PositionalAudio( this.listener )
    this.audioLoader = new THREE.AudioLoader()
    this.audioLoader.load( music, (buffer) => {
      this.sound.setBuffer( buffer )
      this.sound.setRefDistance( 0.25 )
    })
    this.analyser = new THREE.AudioAnalyser(this.sound, 128)
    this.canChange = true
    this.time.on('tick', () => {
      this.freq = this.analyser.getAverageFrequency()

      if ( this.freq === 0 ) {
        this.leftLight.intensity = 0.3
        this.rightLight.intensity = 0.3
      }
      else {
        this.leftLight.intensity = this.freq / 180
        this.rightLight.intensity = this.freq / 180
      }

      if ( this.freq > 50 && this.canChange === true) {
        this.canChange = false
        this.hexToRGB(this.colors[Math.floor(Math.random()*(this.colors.length-1))])

        TweenMax.to(this.leftLight.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.rightLight.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.colorSpeaker.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.colorSpeaker.emissive, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        setTimeout(() => {
          this.canChange = true
        }, 200)
      }
    })

    this.speakers.traverse((child) => {
      if (child.isMesh) {
        child.add(this.sound)
      }
    })
  }
  hexToRGB(h) {
    this.r = 0
    this.g = 0
    this.b = 0
    // 3 digits
    if (h.length === 4) {
      this.r = '0x' + h[1] + h[1]
      this.g = '0x' + h[2] + h[2]
      this.b = '0x' + h[3] + h[3]
      // 6 digits
    } else if (h.length === 7) {
      this.r = '0x' + h[1] + h[2]
      this.g = '0x' + h[3] + h[4]
      this.b = '0x' + h[5] + h[6]
    }
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
