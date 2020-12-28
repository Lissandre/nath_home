import {
  Scene,
  WebGLRenderer,
  sRGBEncoding,
  ACESFilmicToneMapping,
} from 'three'

import { VRButton } from 'three/examples/jsm/webxr/VRButton'
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
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    })
    // this.renderer.setClearColor(0x000000, 1)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.toneMapping = ACESFilmicToneMapping
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // Set shadow
    this.renderer.shadowMap.enabled = false
    // this.renderer.shadowMapSoft = true
    // this.renderer.shadowMap.type = PCFSoftShadowMap
    this.renderer.gammaFactor = 2.2
    this.renderer.gammaOutPut = true
    this.renderer.toneMappingExposure = 0.1
    // this.renderer.autoClear = true

    if (this.isStereoEffect) {
      document.body.appendChild(VRButton.createButton(this.renderer))
      this.renderer.xr.enabled = true
      // this.renderer.xr.setReferenceSpaceType('local')
      this.renderer.setAnimationLoop(() => {
        this.renderer.render(this.scene, this.camera.camera)
      })
    } else {
      this.time.on('tick', () => {
        this.renderer.render(this.scene, this.camera.camera)
      })
    }

    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      time: this.time,
      vr: this.isStereoEffect,
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
      vr: this.isStereoEffect,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setControls() {
    if (!this.isStereoEffect) {
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
    }
    // this.scene.add(this.fpscontrols.controls.getObject())
  }
  setPhysics() {
    this.physics = new Physics({
      time: this.time,
      objects: this.objects,
      controls: this.fpscontrols,
      camera: this.camera,
      assets: this.assets,
      vr: this.isStereoEffect,
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
