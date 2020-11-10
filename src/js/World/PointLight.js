import * as THREE from 'three'

export default class PointLight {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new THREE.Object3D()
    this.params = {
      color: 0xffe6cb,
      // color: 0x000000,
      positionX: -0.7,
      positionY: 2.5,
      positionZ: 1.2,
    }

    this.createPointLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createPointLight() {
    this.light = new THREE.PointLight(this.params.color, 5, 0, 2)
    this.light.castShadow = true
    this.light.position.set(
      this.params.positionX,
      this.params.positionY,
      this.params.positionZ
    )
    this.light.shadow.bias = - 0.001
    this.light.shadow.mapSize.width = 2048
    this.light.shadow.mapSize.height = 2048

    this.container.add(this.light)
  }
  setDebug() {
    // Color debug
    this.debugFolder = this.debug.addFolder('Point Light')
    // this.debugFolder.open()
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.light.color = new THREE.Color(this.params.color)
      })
    // Intensity debug
    this.debugFolder
      .add(this.light, 'intensity')
      .step(0.1)
      .min(0)
      .max(5)
      .name('Intensity')
    // Distance debug
    this.debugFolder
      .add(this.light, 'distance')
      .step(0.1)
      .min(0)
      .max(10)
      .name('Distance')
    // Decay debug
    this.debugFolder
      .add(this.light, 'decay')
      .step(0.1)
      .min(0)
      .max(5)
      .name('Decay')
    //Position debug
    this.debugFolder
      .add(this.light.position, 'x')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position X')
    this.debugFolder
      .add(this.light.position, 'y')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position Y')
    this.debugFolder
      .add(this.light.position, 'z')
      .step(0.1)
      .min(-5)
      .max(5)
      .name('Position Z')
  }
}
