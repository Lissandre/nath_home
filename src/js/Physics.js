import * as CANNON from 'cannon-es'

export default class Physics{
  constructor(options){
    // Set options
    this.time = options.time

    // Set up
    this.setWorld()
    this.setTime()
  }
  setWorld() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.broadphase = new CANNON.NaiveBroadphase()
		this.world.solver.iterations = 10
    this.world.allowSleep = true
    this.world.quatNormalizeFast = true
  }
  setTime() {
    this.time.on('tick', () => {
      this.world.step(1 / 60, this.time.delta, 3)
    })
  }
}