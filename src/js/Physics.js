import * as CANNON from 'cannon-es'
import * as THREE from 'three'

export default class Physics{
  constructor(options){
    // Set options
    this.time = options.time
    this.objects = options.objects
    this.camera = options.camera.camera
    this.controls = options.controls.controls

    console.log(this.objects);
    // Set up
    this.raycaster = new THREE.Raycaster()
    this.direction = new THREE.Vector3()

    this.setWorld()
    this.setTime()
    this.mouseMove()
  }
  setWorld() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.broadphase = new CANNON.SAPBroadphase(this.world)
		this.world.solver.iterations = 10
    this.world.allowSleep = true
    this.world.quatNormalizeFast = true
    this.world.bodies.forEach(body => {body.sleepSpeedLimit = .1})
  }
  setTime() {
    this.time.on('tick', () => {
      this.objects.forEach(object => {
        object.container.quaternion.copy(object.container.body.quaternion)
        object.container.position.set(
          object.container.body.position.x - object.center.x,
          object.container.body.position.y - object.center.y,
          object.container.body.position.z - object.center.z,
        )
      })
      this.world.step(1 / 60, this.time.delta, 3)
    })
  }
  mouseMove(){
    document.addEventListener('mousemove', ()=>{
      this.direction = this.controls.getDirection( this.direction )
      this.raycaster.set(this.camera.position, this.direction)

      this.objectList = []
      this.objects.forEach(object => {
        object.container.traverse( child => {
          if(child.isMesh){
            this.objectList.push(child)
            if(child.material.emissiveIntensity === 0.01){
              child.material.emissiveIntensity = 0
            }
          }
        })
      })

      this.intersects = this.raycaster.intersectObjects(this.objectList)

      for ( let i = 0; i < this.intersects.length; i++ ) {
        this.intersects[0].object.parent.traverse( child => {
          if(child.isMesh){
            child.material.emissiveIntensity = 0.01
            child.material.emissive = new THREE.Color(0xff0000)
          }
        })
      }
    })
  }
}