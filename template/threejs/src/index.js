import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(10, 0, 0)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#ffff00' })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

const gui = new dat.GUI()
gui.add(cube.position, "x").min(0).max(5)
const params = {
  color: '#ffff00',
  fn() {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
  }
}
gui.addColor(params, 'color').onChange(v => {
  cube.material.color.set(v)
})
gui.add(params, 'fn').name('立方体运动')
const folder = gui.addFolder('设置立方体')
folder.add(cube.material, 'wireframe')

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// renderer.render(scene,camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function render() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

window.addEventListener('resize', _ => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 设置相机的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})

window.addEventListener('dblclick', _ => {
  const fullScreenElement = document.fullscreenElement
  if (!fullScreenElement) {
    renderer.domElement.webkitRequestFullScreen()
  } else {
    document.webkitCancelFullScreen()
  }
})