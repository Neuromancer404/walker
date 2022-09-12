import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.144.0/three.module.min.js'
import objects from "./objects.js"
import {PointerLockControls} from "./plc.js"
import lostControl from "./control.js"

let scene, camera, renderer, light, controls;
let position = {x: 100, y: 10, z: 0}

start3d();

function start3d(){
    createScene();
    createCamera();
    createLight();
    fillScene();
    rendering();
    control();
    animate();
}

function control(){
    const menuPanel = document.getElementById('menuPanel')
    const startButton = document.getElementById('startButton')
    startButton.addEventListener(
        'click',
        function () {
            controls.lock()
        },
        false
    )
    
    controls = new PointerLockControls(camera, renderer.domElement)
    controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
    controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))
    lostControl(controls)
}

function fillScene(){
    const sceneObjects = new objects(THREE);
    const floor = sceneObjects.floor();
    scene.add(floor)
}

function createLight(){
    light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set(100, 100, 200);
    scene.add(light);
}

function rendering(){
    try{
        renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild(renderer.domElement)

    }
    catch(e){
        console.log(e)
    }
}

function createCamera(){
    try{
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(position.x, position.y, position.z);

        camera.lookAt(0, 10, 0);
    }
    catch(e){
        console.log(e)
    }
}

function createScene(){
    try{
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xfffff0 );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    }catch(e){
        console.log(e)
    }
}
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

window.onresize = function(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    animate()
}


const onKeyDown = function ( event ) {
    switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            controls.moveForward(1)
            break;

        case 'ArrowLeft':
        case 'KeyA':
            controls.moveRight(-1)
            break;

        case 'ArrowDown':
        case 'KeyS':
            controls.moveForward(-1)
            break;

        case 'ArrowRight':
        case 'KeyD':
            controls.moveRight(1)
            break;

        case 'Space':
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;

    }
};

const onKeyUp = function ( event ) {
    switch ( event.code ) {
        case 'ArrowUp':
        case 'KeyW':
            controls.moveForward(0)
            break;

        case 'ArrowLeft':
        case 'KeyA':
            controls.moveRight(-1)
            break;

        case 'ArrowDown':
        case 'KeyS':
            controls.moveForward(-1)
            break;

        case 'ArrowRight':
        case 'KeyD':
            controls.moveRight(1)
            break;
    }
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp );