import {
  Object3D,
  PerspectiveCamera,
  Mesh,
  CylinderGeometry,
  MeshBasicMaterial,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory'

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug
    this.time = options.time
    this.vr = options.vr

    // Set up
    this.container = new Object3D()

    this.setCamera()
    this.setPerso()
    this.setControllers()
    this.setPosition()
    this.setOrbitControls()
  }
  setControllers() {
    if (this.vr) {
      this.controllerModelFactory = new XRControllerModelFactory()
      this.handModelFactory = new XRHandModelFactory().setPath('./fbx/')

      this.controller = this.renderer.xr.getController(0)
      this.container.add(this.controller)

      this.controllerGrip0 = this.renderer.xr.getControllerGrip(0)
      this.model0 = this.controllerModelFactory.createControllerModel(
        this.controllerGrip0
      )
      this.controllerGrip0.add(this.model0)
      this.container.add(this.controllerGrip0)

      this.controllerGrip1 = this.renderer.xr.getControllerGrip(1)
      this.model1 = this.controllerModelFactory.createControllerModel(
        this.controllerGrip1
      )
      this.controllerGrip1.add(this.model1)
      this.container.add(this.controllerGrip1)

      this.hand0 = this.renderer.xr.getHand(0)
      this.hand0.add(this.handModelFactory.createHandModel(this.hand0))
      this.container.add(this.hand0)

      this.hand1 = this.renderer.xr.getHand(1)
      this.hand1.add(this.handModelFactory.createHandModel(this.hand1))
      this.container.add(this.hand1)
      this.container.position.z = 1.7
    }
  }
  setCamera() {
    // Create camera
    this.camera = new PerspectiveCamera(
      58,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.01,
      15
    )
    this.container.add(this.camera)
    this.camera.matrixAutoUpdate = false
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }
  setPerso() {
    this.head = new Mesh(
      new CylinderGeometry(0.25, 0.1, 1.5, 10, 10, false),
      new MeshBasicMaterial({
        color: 0xffffff,
      })
    )
    this.head.visible = false
    this.head.position.set(0, 0.75, 1.7)
    this.container.add(this.head)
  }
  setPosition() {
    // Set camera position
    this.camera.position.set(0, 1.55, 1.7)
  }
  setOrbitControls() {
    if (this.debug) {
      // Set orbit control
      this.orbitControls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      )
      this.orbitControls.enabled = false
      this.orbitControls.enableKeys = true
      this.orbitControls.zoomSpeed = 1

      this.debugFolder = this.debug.addFolder('Camera')
      this.debugFolder.open()
      this.debugFolder
        .add(this.orbitControls, 'enabled')
        .name('Enable Orbit Control')
    }
  }
}
