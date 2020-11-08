import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

export default class Controls{
  constructor(options){
    // Set options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.time = options.time
    this.camera = options.camera
    this.objects = options.objects

    // Set up
    this.controls = new PointerLockControls(this.camera.camera, this.renderer.domElement)
    this.moveForward = false
		this.moveBackward = false
		this.moveLeft = false
		this.moveRight = false
    this.canJump = false

    this.init()
  }
  init(){
    const instructions = document.getElementById( 'instructions' );
    instructions.addEventListener( 'click', () => {
      this.controls.lock()
      this.setListener()
      this.controls.connect()
      this.setMovement()
    }, false )
    this.controls.addEventListener( 'lock', () => {
      instructions.style.display = 'none'
    } )
    this.controls.addEventListener( 'unlock', () => {
      instructions.style.display = ''
    } )
  }
  setListener(){
    document.addEventListener('keydown', (event)=>{
      switch ( event.code ) {
        case 'ArrowUp': // up
        case 'KeyW': // w
          this.moveForward = true
          break
        case 'ArrowLeft': // left
        case 'KeyA': // a
          this.moveLeft = true
          break
        case 'ArrowDown': // down
        case 'KeyS': // s
          this.moveBackward = true
          break
        case 'ArrowRight': // right
        case 'KeyD': // d
          this.moveRight = true
          break
        case 'Space': // space
          if ( this.canJump === true ) this.velocity.y += 350
          this.canJump = false
          break
      }
    }, false)
    document.addEventListener('keyup', (event)=>{
      switch ( event.code ) {
        case 'ArrowUp': // up
        case 'KeyW': // w
          this.moveForward = false
          break;
        case 'ArrowLeft': // left
        case 'KeyA': // a
          this.moveLeft = false
          break
        case 'ArrowDown': // down
        case 'KeyS': // s
          this.moveBackward = false
          break
        case 'ArrowRight': // right
        case 'KeyD': // d
          this.moveRight = false
          break
      }
    }, false)
  }
  setMovement(){
    this.time.on('tick', () => {
      if( this.moveForward){
        this.controls.moveForward(0.05)
      }
      if( this.moveBackward){
        this.controls.moveForward(-0.05)
      }
      if( this.moveLeft){
        this.controls.moveRight(-0.05)
      }
      if( this.moveRight){
        this.controls.moveRight(0.05)
      }
    })
  }
}