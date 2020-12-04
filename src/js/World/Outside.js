import { Object3D, TextureLoader, Mesh, PlaneBufferGeometry, MeshBasicMaterial } from 'three'
import texture from '@textures/landscape.png'

export default class Outside {
  constructor() {
    // Set options
    // Set up
    this.container = new Object3D()

    this.setOutside()
  }
  setOutside() {
    const loader = new TextureLoader()
    this.out = new Mesh(
      new PlaneBufferGeometry(38, 20),
      new MeshBasicMaterial({
        map: loader.load(texture),
      })
    )
    this.out.rotateY(-Math.PI / 2)
    this.out.position.set(5, -3, 0)
    this.container.add(this.out)
  }
}
