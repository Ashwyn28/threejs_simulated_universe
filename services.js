import * as THREE from 'three';
import { TextureLoader } from 'three';


export const make_sun = (scene) => {
    const loader = new TextureLoader();
    const texture = loader.load('8k_sun.jpg')
    const geometry = new THREE.SphereGeometry(100, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    scene.add(sphere);

    _lightup(scene, sphere);

    return sphere;
}

export const make_many_suns = (scene, suns, color, min, max) => {
    for (let i = 0; i < suns; i++) {
        const geometry = new THREE.SphereGeometry(Math.random());
        const material = new THREE.MeshBasicMaterial({ color: color });
        let sun = new THREE.Mesh(geometry, material);
        sun = _randomiser(sun, min, max);
        scene.add(sun);

    }
}


export const make_planets = (scene, nums, color, min, max) => {
    // Texture loader
    const loader = new TextureLoader();
    const planetTexture = loader.load('8k_earth_daymap.jpg')

    const planets = [];
    const planetData = [];

    for (let i = 0; i < nums; i++) {
        const geometry = new THREE.SphereGeometry(Math.random());
        const material = new THREE.MeshPhysicalMaterial({
            // map: planetTexture,
            // You can add more material properties like roughness, metalness, etc.
            map: planetTexture,
        });
        let planet = new THREE.Mesh(geometry, material);
        planet = _randomiser(planet, min, max);
        scene.add(planet);

        planets.push(planet);

        const moon = make_moon(scene, planet);

        // Calculate radius and initial angle for the orbit
        const radius = planet.position.length();
        const theta = Math.atan2(planet.position.y, planet.position.x);
        const phi = Math.acos(planet.position.z / radius);
        const speed = (1 / radius) * 0.001;

        const moonSpeed = (1 / radius) * 0.001;
        const moonTheta = Math.atan2(moon.position.y, moon.position.x);
        const moonOrbitRadius = 1;

        planetData.push({ radius, theta, phi, speed, moon, moonSpeed, moonTheta, moonOrbitRadius });
    }

    return { planets, planetData };
}

export const make_basic_planet = (scene, map, min, max) => {
    const planetData = [];
    const loader = new TextureLoader();
    const planetTexture = loader.load('8k_jupiter.jpg')

    const geometry = new THREE.SphereGeometry(Math.random());
    const material = new THREE.MeshPhysicalMaterial({
        // map: planetTexture,
        // You can add more material properties like roughness, metalness, etc.
        map: planetTexture,
    });
    let planet = new THREE.Mesh(geometry, material);
    planet = _randomiser(planet, min, max);
    scene.add(planet);

    // Calculate radius and initial angle for the orbit
    const radius = planet.position.length();
    const theta = Math.atan2(planet.position.y, planet.position.x);
    const phi = Math.acos(planet.position.z / radius);
    const speed = (1 / radius) * 0.001;

    planetData.push({ radius, theta, phi, speed });
    return { planet, planetData };
}

export const make_moon = (scene, planet) => {
    const loader = new TextureLoader();
    const planetTexture = loader.load('2k_moon.jpg')

    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshPhysicalMaterial({ map: planetTexture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = planet.position.x + 0.1;
    sphere.position.y = planet.position.y + 0.1;
    sphere.position.z = planet.position.z + 0.1;
    scene.add(sphere);

    return sphere;

}

const _randomiser = (object, min, max) => {
    object.position.x = Math.random() * (max - min) + min;
    object.position.y = Math.random() * (max - min) + min;
    object.position.z = Math.random() * (max - min) + min;

    return object;
}

const _lightup = (scene, object) => {
    // Point Light
    const pointLight = new THREE.PointLight(0xffffff, 100, 100);
    pointLight.position.set(object.position.x, object.position.y, object.position.z); // Position the light at the center of the sphere
    scene.add(pointLight);
}