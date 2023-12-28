// We, want to make a solar system and have a camera that can move around it
// the planets should have random generated textures
// also little rocks in orbit


import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { make_many_suns, make_moon, make_planets, make_sun } from './services';
import { TextureLoader } from 'three';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --------------------------------------------------------------------
// objects
// --------------------------------------------------------------------

// many cube
const data = make_planets(scene, 10, 0x0077be, -10, 10);
const { planets, planetData } = data;

// many suns
make_many_suns(scene, 1000, 0xffffff, -500, 500);

// sun
make_sun(scene);


// -------------------------------------------------------------------- 
// light and cmamera
// --------------------------------------------------------------------


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 42;

// Setup OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Optional, but this gives a smoother control feeling
controls.dampingFactor = 0.05;

// --------------------------------------------------------------------
// animate
// --------------------------------------------------------------------


function animate() {
    requestAnimationFrame(animate);

    // Update the controls on each frame
    controls.update();

    // Orbit effect
    planets.forEach((planet, index) => {
        const data = planetData[index];
        const moon = data.moon;
        
        const speed = data.speed;
        const time = Date.now() * speed;
        // Update theta for each planet to rotate it
        const theta = data.theta + time * 0.1;
        planet.position.x = data.radius * Math.sin(data.phi) * Math.cos(theta);
        planet.position.y = data.radius * Math.sin(data.phi) * Math.sin(theta);
        planet.position.z = data.radius * Math.cos(data.phi);

        moon.position.x = planet.position.x + 1;
        moon.position.y = planet.position.y + 1;
        moon.position.z = planet.position.z + 1;

        planet.rotation.y += 0.005;
    });

    renderer.render(scene, camera);
}
if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}




