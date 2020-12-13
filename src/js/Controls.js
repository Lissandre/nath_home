import {
  Raycaster,
  Vector3,
  Color,
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
} from 'three'
import { Body, Sphere, Vec3, PointToPointConstraint } from 'cannon-es'
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
    this.raycaster = new Raycaster()
    this.direction = new Vector3()
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
    this.constraintDown = false
    this.gplane = false

    this.shape = new Sphere(0.01)
    this.jointBody = new Body({ mass: 0 })
    this.jointBody.addShape(this.shape)
    this.jointBody.collisionFilterGroup = 0
    this.jointBody.collisionFilterMask = 0
    this.physics.world.addBody(this.jointBody)

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
    this.commands.innerHTML = 'Shift : Run<br/>C : Crouch<br/>L : Toggle lights'
    this.instructions.append(this.commands)

    this.instructions.addEventListener(
      'click',
      () => {
        this.controls.lock()
        // this.mouseDown()
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
      this.world.desktopPlace.music.copysound.pause()
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
          case 'KeyC':
            this.shift = true
            break
          case 'ShiftLeft':
            this.run = true
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
          case 'KeyC':
            this.shift = false
            break
          case 'ShiftLeft':
            this.run = false
            break
        }
      },
      false
    )
  }
  setMovement() {
    let vec = new Vector3()
    this.time.on('tick', () => {
      if (this.canMove === true) {
        if (this.moveForward) {
          vec.setFromMatrixColumn(this.camera.camera.matrix, 0)
          vec.crossVectors(this.camera.camera.up, vec)
          let oldp = new Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector(vec, this.frontSpeed)
          this.camera.head.body.position.copy(oldp)
        }
        if (this.moveBackward) {
          vec.setFromMatrixColumn(this.camera.camera.matrix, 0)
          vec.crossVectors(this.camera.camera.up, vec)
          let oldp = new Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector(vec, -this.frontSpeed)
          this.camera.head.body.position.copy(oldp)
        }
        if (this.moveLeft) {
          vec.setFromMatrixColumn(this.camera.camera.matrix, 0)
          let oldp = new Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector(vec, -this.sideSpeed)
          this.camera.head.body.position.copy(oldp)
        }
        if (this.moveRight) {
          vec.setFromMatrixColumn(this.camera.camera.matrix, 0)
          let oldp = new Vector3().copy(this.camera.head.body.position)
          oldp.addScaledVector(vec, this.sideSpeed)
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
        if (this.run) {
          this.frontSpeed = 0.1
        } else {
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
        if (this.intersects[0].distance <= 1.5) {
          this.intersects[0].object.parent.traverse((child) => {
            if (child.isMesh) {
              child.material.emissiveIntensity = 0.01
              child.material.emissive = new Color(0xff0000)
            }
          })
        }
      }

      if (this.gplane && this.mouseConstraint) {
        if (this.intersects[0]) {
          this.moveJointToPoint(
            this.intersects[0].point.x,
            this.intersects[0].point.y,
            this.intersects[0].point.z
          )
        }
      }
    })
  }
  mouseDown() {
    document.addEventListener('mousedown', () => {
      if (this.intersects[0]) {
        this.crossPosition = this.intersects[0].point
        var idx = this.objectList.indexOf(this.intersects[0].object)
        this.constraintDown = true
        this.setScreenPerpCenter(this.crossPosition, this.camera.camera)
        this.addMouseConstraint(
          this.crossPosition.x,
          this.crossPosition.y,
          this.crossPosition.z,
          this.objectList[idx].parent.parent.parent.body
        )
      }
    })
  }
  setScreenPerpCenter(point, camera) {
    if (!this.gplane) {
      var planeGeo = new PlaneGeometry(100, 100)
      var plane = (this.gplane = new Mesh(planeGeo, new MeshStandardMaterial()))
      plane.visible = false
      this.world.container.add(this.gplane)
    }
    this.gplane.position.copy(point)
    this.gplane.quaternion.copy(camera.quaternion)
  }
  addMouseConstraint(x, y, z, body) {
    this.constrainedBody = body
    var v1 = new Vec3(x, y, z).vsub(this.constrainedBody.position)
    var antiRot = this.constrainedBody.quaternion.inverse()
    this.pivot = antiRot.vmult(v1)

    this.jointBody.position.set(x, y, z)

    this.mouseConstraint = new PointToPointConstraint(
      this.constrainedBody,
      v1,
      this.jointBody,
      new Vec3(0, 0, 0)
    )
    this.physics.world.addConstraint(this.mouseConstraint)
  }
  moveJointToPoint(x, y, z) {
    this.jointBody.position.set(x, y, z)
    this.mouseConstraint.update()
  }
}
