import { Scene, WebGLRenderer, sRGBEncoding, PCFSoftShadowMap } from 'three'
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect'
import * as dat from 'dat.gui'
import cannonDebugger from 'cannon-es-debugger'

import Sizes from '@tools/Sizes.js'
import Time from '@tools/Time.js'
import Assets from '@tools/Loader'

import Camera from './Camera.js'
import Physics from './Physics.js'
import Controls from './Controls.js'
import World from '@world/index.js'

export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.assets = new Assets()
    this.objects = []
    this.isStereoEffect = false

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setPhysics()
    this.setWorld()
    this.setControls()
  }
  setRenderer() {
    // Set scene
    this.scene = new Scene()
    // Set renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    // Set background color
    this.renderer.setClearColor(0x000000, 1)
    // Set renderer pixel ratio & sizes
    // this.renderer.setPixelRatio(window.devicePixelRatio)
    // Set shadow
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMapSoft = true
    this.renderer.shadowMap.type = PCFSoftShadowMap

    if (this.isStereoEffect) {
      this.stereoEffect = new StereoEffect(this.renderer)
      this.stereoEffect.eyeSeparation = 1
      this.stereoEffect.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
      this.time.on('tick', () => {
        this.stereoEffect.render(this.scene, this.camera.camera)
      })
    } else {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )

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
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      time: this.time,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      assets: this.assets,
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
      debug: this.debug,
      world: this.world,
      physics: this.physics,
      objects: this.objects,
    })
    // this.scene.add(this.fpscontrols.controls.getObject())
  }
  setPhysics() {
    this.physics = new Physics({
      time: this.time,
      objects: this.objects,
      controls: this.fpscontrols,
      camera: this.camera,
    })
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
    if (window.location.hash === '#physic') {
      this.setCDebug()
    }
    if (window.location.hash === '#VR') {
      this.isStereoEffect = true
    }
  }
  setCDebug() {
    document.addEventListener('click', () => {
      cannonDebugger(this.scene, this.world.physics.world.bodies)
    })
  }
}
