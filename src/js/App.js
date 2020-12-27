import {
  Scene,
  WebGLRenderer,
  sRGBEncoding,
  PCFSoftShadowMap,
  ACESFilmicToneMapping,
} from 'three'

import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'
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
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = sRGBEncoding
    // this.renderer.toneMapping = ACESFilmicToneMapping
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(2)
    // Set shadow
    this.renderer.shadowMap.enabled = false
    // this.renderer.shadowMapSoft = true
    // this.renderer.shadowMap.type = PCFSoftShadowMap
    this.renderer.gamma = 2.2
    this.renderer.gammaOutPut = true
    this.renderer.autoClear = true
    if (this.isStereoEffect) {
      document.body.appendChild(VRButton.createButton(this.renderer))
      this.renderer.xr.setReferenceSpaceType('local')
      this.renderer.setAnimationLoop(() => {
        this.renderer.render(this.scene, this.camera.camera)
      })
    } else {
      // Set RequestAnimationFrame with 60ips
      this.time.on('tick', () => {
        this.renderer.render(this.scene, this.camera.camera)
      })
    }
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
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      time: this.time,
    })
    if(this.isStereoEffect){
      this.controllerModelFactory = new XRControllerModelFactory()
      this.handModelFactory = new XRHandModelFactory().setPath('./fbx/')
      this.renderer.xr.enabled = true
      this.controller = this.renderer.xr.getController(0)
      this.camera.container.add(this.controller)

      this.controllerGrip0 = this.renderer.xr.getControllerGrip(0)
      this.model0 = this.controllerModelFactory.createControllerModel(this.controllerGrip0)
      this.controllerGrip0.add(this.model0)
      this.camera.container.add(this.controllerGrip0)

      this.controllerGrip1 = this.renderer.xr.getControllerGrip(1)
      this.model1 = this.controllerModelFactory.createControllerModel(this.controllerGrip1)
      this.controllerGrip1.add(this.model1)
      this.camera.container.add(this.controllerGrip1)

      this.hand0 = this.renderer.xr.getHand(0)
      this.hand0.add(this.handModelFactory.createHandModel(this.hand0))
      this.camera.container.add(this.hand0)

      this.hand1 = this.renderer.xr.getHand(1)
      this.hand1.add(this.handModelFactory.createHandModel(this.hand1))
      this.camera.container.add(this.hand1)
      this.camera.container.position.z = 1.7
    }
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
    if(!this.isStereoEffect){
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
