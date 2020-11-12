import * as THREE from 'three'
import { TweenMax } from 'gsap'

import music from '@sounds/music.mp3'

export default class Music{
  constructor(options){
    // Set options
    this.time = options.time
    this.camera = options.camera
    this.speakerRight = options.speakerRight
    this.speakerLeft = options.speakerLeft

    // Set up
    this.colors = ['#8B58FF', '#FE3ACC', '#FF5392', '#FF8E63', '#FFC751', '#F9F871']

    this.setMusic()
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
        this.speakerLeft.leftLight.intensity = 0.3
        this.speakerRight.rightLight.intensity = 0.3
      }
      else {
        this.speakerLeft.leftLight.intensity = this.freq / 180
        this.speakerRight.rightLight.intensity = this.freq / 180
      }

      if ( this.freq > 50 && this.canChange === true) {
        this.canChange = false
        this.hexToRGB(this.colors[Math.floor(Math.random()*(this.colors.length-1))])

        TweenMax.to(this.speakerLeft.leftLight.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.speakerRight.rightLight.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.speakerRight.colorSpeaker.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.speakerRight.colorSpeaker.emissive, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.speakerLeft.colorSpeaker.color, {
          duration: 0.2,
          r: this.r / 255,
          g: this.g / 255,
          b: this.b / 255,
        })

        TweenMax.to(this.speakerLeft.colorSpeaker.emissive, {
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
    this.speakerLeft.container.traverse((child) => {
      if (child.isMesh) {
        child.add(this.sound)
      }
    })
    this.speakerRight.container.traverse((child) => {
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
}