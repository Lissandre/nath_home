import * as THREE from 'three'

import Computer from './Computer.js'
import BasicObjects from './BasicObjects.js'
import Headset from './Headset.js'
import Music from './SetMusic.js'
// import Phone from './Phone.js'
import ScreenLeft from './ScreenLeft.js'
import ScreenRight from './ScreenRight.js'
import ScreenSupport from './ScreenSupport.js'
import SpeakerLeft from './SpeakerLeft.js'
import SpeakerRight from './SpeakerRight.js'

export default class DesktopPlace {
  constructor(options) {
    // Set options
    this.models = options.models
    this.camera = options.camera
    this.time = options.time
    this.physics = options.physics

    // Set up
    this.container = new THREE.Object3D()

    this.setComputer()
    this.setBasicObjects()
    this.setHeadset()
    // this.setPhone()
    this.setScreenLeft()
    this.setScreenRight()
    this.setScreenSupport()
    this.setSpeakerLeft()
    this.setSpeakerRight()
    this.setMusic()
  }
  setComputer() {
    this.computer = new Computer({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.computer.container)
  }
  setBasicObjects() {
    this.basicObjects = new BasicObjects({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.basicObjects.objects.forEach(object => {
      this.container.add(object.container)
    })
  }
  setHeadset() {
    this.headset = new Headset({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.headset.container)
  }
  setPhone() {
    this.phone = new Phone({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.phone.container)
  }
  setScreenLeft() {
    this.screenLeft = new ScreenLeft({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.screenLeft.container)
  }
  setScreenRight() {
    this.screenRight = new ScreenRight({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.screenRight.container)
  }
  setScreenSupport() {
    this.screenSupport = new ScreenSupport({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.screenSupport.container)
  }
  setSpeakerLeft() {
    this.speakerLeft = new SpeakerLeft({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.speakerLeft.container)
  }
  setSpeakerRight() {
    this.speakerRight = new SpeakerRight({
      models: this.models,
      time: this.time,
      physics: this.physics,
    })
    this.container.add(this.speakerRight.container)
  }
  setMusic() {
    this.music = new Music({
      time: this.time,
      camera: this.camera,
      speakerRight: this.speakerRight,
      speakerLeft: this.speakerLeft
    })
  }
}
