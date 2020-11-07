import * as THREE from 'three'

export default class SubwooferSpeaker {
  constructor(options) {
    // Set options
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.setSubwooferSpeaker()
  }
  setSubwooferSpeaker() {
    this.subwooferSpeaker = this.models.models.subwooferSpeaker.scene
    this.subwooferSpeaker.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    this.container.add(this.subwooferSpeaker)
  }
}
