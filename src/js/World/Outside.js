import { Object3D, Mesh, PlaneBufferGeometry, MeshBasicMaterial } from 'three'

export default class Outside {
  constructor(options) {
    // Set options
    this.textures = options.textures
    // Set up
    this.container = new Object3D()

    this.setOutside()
  }
  setOutside() {
    this.out = new Mesh(
      new PlaneBufferGeometry(38, 20),
      new MeshBasicMaterial({
        map: this.textures.landscape,
      })
    )
    this.out.rotateY(-Math.PI / 2)
    this.out.position.set(5, -3, 0)
    this.container.add(this.out)
  }
}
