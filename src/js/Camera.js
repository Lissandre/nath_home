import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug
    this.time = options.time
    this.objects = options.objects

    // Set up
    this.container = new THREE.Object3D()

    this.setCamera()
    this.setPerso()
    this.setPosition()
    this.setOrbitControls()
  }
  setCamera() {
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      58,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.1,
      100
    )
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }
  setPerso() {
    this.head = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
      })
    )
    // this.time.on('tick', () => {
      this.head.position.set(
        0,
        1.5,
        1.7
      )
    // })
    // this.objects.push(this.container)
  }
  setPosition() {
    // Set camera position
    this.camera.position.set(
      0,
      1.5,
      1.7
    )
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
