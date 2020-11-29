import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { TweenMax } from 'gsap'

export default class Controls {
  constructor(options) {
    // Set options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.time = options.time
    this.camera = options.camera
    this.debug = options.debug
    this.world = options.world
    this.physics = options.physics
    this.objects = options.objects

    // Set up
    this.raycaster = new THREE.Raycaster()
    this.direction = new THREE.Vector3()
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
    this.frontSpeed = 0.06
    this.sideSpeed = 0.04

    if (!this.debug) {
      this.init()
      this.setListener()
      this.setMovement()
      this.mouseMove()
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
    this.commands.innerHTML = 'Shift : Crouch<br/>L : Toggle lights'
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
          case 'ShiftLeft':
            this.shift = true
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
          case 'ShiftLeft':
            this.shift = false
            break
        }
      },
      false
    )
  }
  setMovement() {
    let vec = new THREE.Vector3()
    this.time.on('tick', () => {
      if (this.canMove === true) {
        if (this.moveForward) {
          vec.setFromMatrixColumn(this.camera.camera.matrix, 0)
          vec.crossVectors(this.camera.camera.up, vec)
          let oldp = new THREE.Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector(vec, this.frontSpeed)
          this.camera.head.body.position.copy(oldp)
        }
        if (this.moveBackward) {
          vec.setFromMatrixColumn(this.camera.camera.matrix, 0)
          vec.crossVectors(this.camera.camera.up, vec)
          let oldp = new THREE.Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector(vec, -this.frontSpeed)
          this.camera.head.body.position.copy(oldp)
        }
        if (this.moveLeft) {
          vec.setFromMatrixColumn( this.camera.camera.matrix, 0 )
          let oldp = new THREE.Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector( vec, -this.sideSpeed )
          this.camera.head.body.position.copy(oldp)
        }
        if (this.moveRight) {
          vec.setFromMatrixColumn( this.camera.camera.matrix, 0 )
          let oldp = new THREE.Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector( vec, this.sideSpeed )
          this.camera.head.body.position.copy(oldp)
        }
        if (this.shift) {
          TweenMax.to(this.camera.camera.position, {
            duration: 0.3,
            y: 1.35,
          })
          this.sideSpeed = 0.02
          this.frontSpeed = 0.03
        } else {
          TweenMax.to(this.camera.camera.position, {
            duration: 0.3,
            y: 1.55,
          })
          this.sideSpeed = 0.04
          this.frontSpeed = 0.06
        }
        this.camera.camera.position.set(
          this.camera.head.body.position.x,
          this.camera.camera.position.y,
          this.camera.head.body.position.z
        )
        this.camera.head.position.copy(this.camera.head.body.position)
      }
    })
  }
  mouseMove() {
    document.addEventListener('mousemove', () => {
      this.direction = this.controls.getDirection(this.direction)
      this.raycaster.set(this.camera.camera.position, this.direction)

      this.objectList = []
      this.objects.forEach((object) => {
        if (object.container.body.mass != 0) {
          object.container.traverse((child) => {
            if (child.isMesh) {
              this.objectList.push(child)
              if (child.material.emissiveIntensity === 0.01) {
                child.material.emissiveIntensity = 0
              }
            }
          })
        }
      })

      this.intersects = this.raycaster.intersectObjects(this.objectList)

      if (this.intersects.length > 0) {
        if (this.intersects[0].distance <= 1.35) {
          this.intersects[0].object.parent.traverse((child) => {
            if (child.isMesh) {
              child.material.emissiveIntensity = 0.01
              child.material.emissive = new THREE.Color(0xff0000)
            }
          })
        }
      }
    })
  }
}
