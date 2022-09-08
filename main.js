"use strict"
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.144.0/three.module.min.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, light;
let position = {x: 100, y: 10, z: 0}
let lookAt = {x: 0, y: 10, z: 0}
start3d();

function start3d(){
    createScene();
    createCamera();
    createLight();
    rendering();
    floorGeometry();
    animate();
}

function floorGeometry(){
    const helper = new THREE.GridHelper( 1000, 100 );
	helper.position.x = 0;
    helper.position.y = 0;
    helper.position.z = 0;

	scene.add( helper );
}

function createLight(){
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}

function rendering(){
    try{
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild( renderer.domElement );
    }
    catch(e){
        console.log(e)
    }
}

function createCamera(){
    try{
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);
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
        scene.background = new THREE.Color( 0x00000 );
    }catch(e){
        console.log(e)
    }
 }

function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

function goFort(){
    position.x -= 1;
    camera.position.set(position.x, position.y, position.z);
}
function goBack(){
    position.x += 1;
    camera.position.set(position.x, position.y, position.z);
}
function left(){
    lookAt.z += 5;
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
}
function right(){
    lookAt.z -= 5;
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
}
document.onkeydown = function(event){
    switch (event.keyCode){
        case 87:
            goFort();
            break;
        case 83:
            goBack();
            break;
        case 68:
            right();
            break;
        case 65:
            left();
            break;
    }
    
}