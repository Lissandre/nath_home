import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

export default class Controls {
  constructor(options) {
    // Set options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.time = options.time
    this.camera = options.camera
    this.debug = options.debug
    this.world = options.world

    // Set up
    this.controls = new PointerLockControls(
      this.camera.camera,
      this.renderer.domElement
    )
    this.moveForward = false
    this.moveBackward = false
    this.moveLeft = false
    this.moveRight = false
    this.canJump = false
    this.canMove = false
    this.raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    )

    if (!this.debug) {
      this.init()
      this.setListener()
      this.setMovement()
    }
  }
  init() {
    this.instructions = document.createElement('div')
    this.instructions.classList.add('instructions')
    document.body.append(this.instructions)

    this.title = document.createElement('h1')
    this.title.innerHTML = 'Click to control'
    this.instructions.append(this.title)

    this.commands = document.createElement('p')
    this.commands.innerHTML = 'L: Toggle lights'
    this.instructions.append(this.commands)

    this.instructions.addEventListener(
      'click',
      () => {
        this.controls.lock()
      },
      false
    )
    this.controls.addEventListener('lock', () => {
      this.instructions.style.display = 'none'
      this.canMove = true
    })
    this.controls.addEventListener('unlock', () => {
      this.instructions.style.display = ''
      this.canMove = false
      this.world.desktopPlace.music.sound.pause()
      this.world.desktopPlace.music.playing = false
    })
  }
  setListener() {
    document.addEventListener(
      'keydown',
      (event) => {
        switch (event.code) {
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
          // case 'Space': // space
          //   if ( this.canJump === true ) this.velocity.y += 2
          //   this.canJump = false
          //   break
        }
      },
      false
    )
    document.addEventListener(
      'keyup',
      (event) => {
        switch (event.code) {
          case 'ArrowUp': // up
          case 'KeyW': // w
            this.moveForward = false
            break
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
      },
      false
    )
  }
  setMovement() {
    this.time.on('tick', () => {
      if (this.canMove) {
        // this.raycaster.ray.origin.copy( this.camera.mesh.position )
        // this.intersections = this.raycaster.intersectObjects( this.objects )
        // if(this.intersections.length > 0){
        //   this.canJump = true
        // }
        if (this.moveForward) {
          this.controls.moveForward(0.06)
        }
        if (this.moveBackward) {
          this.controls.moveForward(-0.06)
        }
        if (this.moveLeft) {
          this.controls.moveRight(-0.04)
        }
        if (this.moveRight) {
          this.controls.moveRight(0.04)
        }
      }
    })
  }
}
