// We, want to make a solar system and have a camera that can move around it
// the planets should have random generated textures
// also little rocks in orbit


import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { make_many_suns, make_planets, make_sun, make_basic_planet } from './services';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --------------------------------------------------------------------
// objects
// --------------------------------------------------------------------

// earth 
const data = make_planets(scene, 1, 0x0077be, -10, 10);
const { planets, planetData } = data;

// jupiter
const jupiter = make_basic_planet(scene, '8k_jupiter.jpg', -10, 10);

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

        // Update moon position
        const moonSpeed = data.moonSpeed;
        const moonTime = Date.now() * moonSpeed;
        const moonTheta = data.moonTheta + moonTime * 0.1;
        const moonOrbitRadius = data.moonOrbitRadius; // Define the orbit radius of the moon

        moon.position.x = planet.position.x + moonOrbitRadius * Math.cos(moonTheta);
        moon.position.y = planet.position.y + moonOrbitRadius * Math.sin(moonTheta);

        planet.rotation.y += 0.005;
    });

    // orbit jupiter
    const jupiterSpeed = jupiter.planetData[0].speed;
    const jupiterTime = Date.now() * jupiterSpeed;
    const jupiterTheta = jupiter.planetData[0].theta + jupiterTime * 0.1;
    jupiter.planet.position.x = jupiter.planetData[0].radius * Math.sin(jupiter.planetData[0].phi) * Math.cos(jupiterTheta);
    jupiter.planet.position.y = jupiter.planetData[0].radius * Math.sin(jupiter.planetData[0].phi) * Math.sin(jupiterTheta);
    jupiter.planet.position.z = jupiter.planetData[0].radius * Math.cos(jupiter.planetData[0].phi);


    renderer.render(scene, camera);
}
if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}




