import * as THREE from 'three'

import Computer from './Computer.js'
import ComputerSupport from './ComputerSupport.js'
import Desktop from './Desktop.js'
import Headset from './Headset.js'
import Keyboard from './Keyboard.js'
import Mouse from './Mouse.js'
import MousePad from './MousePad.js'
import Phone from './Phone.js'
import PhoneSupport from './PhoneSupport.js'
import RubiksCube from './RubiksCube.js'
import Seat from './Seat.js'
import ScreenLeft from './ScreenLeft.js'
import ScreenRight from './ScreenRight.js'
import ScreenSupport from './ScreenSupport.js'
import ShelfDesktop from './ShelfDesktop.js'
import ShelfWall from './ShelfWall.js'
import Speakers from './Speakers.js'
import SubwooferSpeaker from './SubwooferSpeaker.js'

export default class DesktopPlace {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setComputer()
    this.setComputerSupport()
    this.setDesktop()
    this.setHeadset()
    this.setKeyboard()
    this.setMouse()
    this.setMousePad()
    this.setPhone()
    this.setPhoneSupport()
    this.setRubiksCube()
    this.setSeat()
    this.setScreenLeft()
    this.setScreenRight()
    this.setScreenSupport()
    this.setShelfDesktop()
    this.setShelfWall()
    this.setSpeakers()
    this.setSubwooferSpeaker()
  }
  setComputer() {
    this.computer = new Computer({
      models: this.models,
    })
    this.container.add(this.computer.container)
  }
  setComputerSupport() {
    this.computerSupport = new ComputerSupport({
      models: this.models,
    })
    this.container.add(this.computerSupport.container)
  }
  setDesktop() {
    this.desktop = new Desktop({
      models: this.models,
    })
    this.container.add(this.desktop.container)
  }
  setHeadset() {
    this.headset = new Headset({
      models: this.models,
    })
    this.container.add(this.headset.container)
  }
  setKeyboard() {
    this.keyboard = new Keyboard({
      models: this.models,
    })
    this.container.add(this.keyboard.container)
  }
  setMouse() {
    this.mouse = new Mouse({
      models: this.models,
    })
    this.container.add(this.mouse.container)
  }
  setMousePad() {
    this.mousePad = new MousePad({
      models: this.models,
    })
    this.container.add(this.mousePad.container)
  }
  setPhone() {
    this.phone = new Phone({
      models: this.models,
    })
    this.container.add(this.phone.container)
  }
  setPhoneSupport() {
    this.phoneSupport = new PhoneSupport({
      models: this.models,
    })
    this.container.add(this.phoneSupport.container)
  }
  setRubiksCube() {
    this.rubiksCube = new RubiksCube({
      models: this.models,
    })
    this.container.add(this.rubiksCube.container)
  }
  setSeat() {
    this.seat = new Seat({
      models: this.models,
    })
    this.container.add(this.seat.container)
  }
  setScreenLeft() {
    this.screenLeft = new ScreenLeft({
      models: this.models,
    })
    this.container.add(this.screenLeft.container)
  }
  setScreenRight() {
    this.screenRight = new ScreenRight({
      models: this.models,
    })
    this.container.add(this.screenRight.container)
  }
  setScreenSupport() {
    this.screenSupport = new ScreenSupport({
      models: this.models,
    })
    this.container.add(this.screenSupport.container)
  }
  setShelfDesktop() {
    this.shelfDesktop = new ShelfDesktop({
      models: this.models,
    })
    this.container.add(this.shelfDesktop.container)
  }
  setShelfWall() {
    this.shelfWall = new ShelfWall({
      models: this.models,
    })
    this.container.add(this.shelfWall.container)
  }
  setSpeakers() {
    this.speakers = new Speakers({
      models: this.models,
    })
    this.container.add(this.speakers.container)
  }
  setSubwooferSpeaker() {
    this.subwooferSpeaker = new SubwooferSpeaker({
      models: this.models,
    })
    this.container.add(this.subwooferSpeaker.container)
  }
}
