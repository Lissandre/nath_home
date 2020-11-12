import * as THREE from 'three'
import * as dat from 'dat.gui'
import cannonDebugger from 'cannon-es-debugger'


import Sizes from '@tools/Sizes.js'
import Time from '@tools/Time.js'
import Models from '@tools/ModelLoader.js'

import Camera from './Camera.js'
import Physics from './Physics.js'
import Controls from './Controls.js'
import World from '@world/index.js'
import { doc } from 'prettier'

export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.models = new Models()
    this.objects = []

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setPhysics()
    this.setWorld()
    this.setControls()
    this.setCDebug()
  }
  setRenderer() {
    // Set scene
    this.scene = new THREE.Scene()
    // Set renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    // Set background color
    this.renderer.setClearColor(0x000000, 1)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // Set shadow
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    // Set RequestAnimationFrame with 60ips
    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.camera)
    })
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      time: this.time,
      objects: this.objects
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      models: this.models,
      objects: this.objects,
      camera: this.camera,
      physics: this.physics,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setControls() {
    this.fpscontrols = new Controls({
      sizes: this.sizes,
      renderer: this.renderer,
      time: this.time,
      camera: this.camera,
      objects: this.objects,
      debug: this.debug,
      world: this.world,
    })
  }
  setPhysics() {
    this.physics = new Physics({
      time: this.time,
      objects: this.objects,
    })
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
  }
  setCDebug(){
    document.addEventListener('click', ()=>{
      cannonDebugger(this.scene, this.world.physics.world.bodies)
    })
  }
}
