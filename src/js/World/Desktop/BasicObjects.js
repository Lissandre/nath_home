import { Object3D, FrontSide, Vector3, Box3 } from 'three'
import { Body, Box, Vec3 } from 'cannon-es'

export default class BasicObjects {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models.models
    this.physics = options.physics
    this.pObjects = options.objects

    // Set up
    this.objects = [
      {
        src: this.models.computerSupport.scene,
        mass: 22,
        container: new Object3D(),
      },
      {
        src: this.models.desktop.scene,
        mass: 10,
        container: new Object3D(),
      },
      {
        src: this.models.desktopLeft.scene,
        mass: 10,
        container: new Object3D(),
      },
      {
        src: this.models.desktopRight.scene,
        mass: 10,
        container: new Object3D(),
      },
      {
        src: this.models.keyboard.scene,
        mass: 0.1,
        container: new Object3D(),
      },
      {
        src: this.models.mouse.scene,
        mass: 0.1,
        container: new Object3D(),
      },
      {
        src: this.models.mousePad.scene,
        mass: 0.15,
        container: new Object3D(),
      },
      {
        src: this.models.phoneSupport.scene,
        mass: 0.1,
        container: new Object3D(),
      },
      {
        src: this.models.rubiksCube.scene,
        mass: 0.1,
        container: new Object3D(),
      },
      {
        src: this.models.shelfDesktop.scene,
        mass: 0,
        container: new Object3D(),
      },
      {
        src: this.models.shelfWall.scene,
        mass: 0,
        container: new Object3D(),
      },
      {
        src: this.models.subwooferSpeaker.scene,
        mass: 3,
        container: new Object3D(),
      },
    ]

    this.createObjects()
    this.setPhysics()
  }
  createObjects() {
    this.objects.forEach((object) => {
      const obj = object.src
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material.side = FrontSide
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      object.container.add(obj)
    })
  }
  setPhysics() {
    this.objects.forEach((object) => {
      const size = new Vector3()
      const center = new Vector3()
      const calcBox = new Box3().setFromObject(object.container)

      calcBox.getSize(size)
      size.x *= 0.5
      size.y *= 0.5
      size.z *= 0.5
      calcBox.getCenter(center)

      const box = new Box(new Vec3().copy(size))
      object.container.body = new Body({
        mass: object.mass,
        position: center,
      })

      object.container.body.addShape(box)
      this.physics.world.addBody(object.container.body)
      this.pObjects.push({
        name: object.src.children[0].name,
        container: object.container,
        center: center,
      })
    })
  }
}
