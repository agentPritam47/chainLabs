import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';



let scene, camera, renderer, width, height;

//geometry

let geometry;

//meshes

let mesh;

//materials
let material;

width = window.innerWidth;
height = window.innerHeight;

// init

camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

scene = new THREE.Scene();

geometry = new THREE.PlaneGeometry(0.2, 0.2,10,10);
material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    time: { value: 0 }
  }
})

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', () => { 
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
)

function animate(time) {

  material.uniforms.time.value = time / 1000;

  renderer.render(scene, camera);

}