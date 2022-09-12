import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.144.0/three.module.min.js'
import objects from "./objects.js"

let scene, camera, renderer, light;
let position = {x: 100, y: 10, z: 0}

start3d();

function start3d(){
    createScene();
    createCamera();
    createLight();
    fillScene();
    rendering();
    animate();
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
        renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
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
        scene.background = new THREE.Color( 0x00000 );
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    }catch(e){
        console.log(e)
    }
}
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}