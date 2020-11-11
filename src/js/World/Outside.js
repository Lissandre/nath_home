import * as THREE from 'three'
import texture from '@textures/landscape.png'

export default class Outside{
  constructor(options){
    // Set options
    // Set up
    this.container = new THREE.Object3D()

    this.setOutside()
  }
  setOutside(){
    const loader = new THREE.TextureLoader();
    this.out = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(38, 20),
      new THREE.MeshBasicMaterial({
        map: loader.load(texture),
      })
    )
    this.out.rotateY(-Math.PI/2)
    this.out.position.set(5, -3, 0)
    this.container.add(this.out)
  }
}