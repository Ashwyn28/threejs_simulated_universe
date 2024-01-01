# Interactive Solar System Simulation in Three.js

## Overview
This project is an interactive solar system simulation developed using Three.js. It features a dynamic 3D environment where users can explore various celestial objects, including planets and a spaceship, with the ability to focus the camera on different objects in the solar system.

## Features
- **Solar System Visualization**: A 3D representation of a solar system with planets, moons, and suns.
- **Dynamic Planets**: Planets with randomly generated textures, orbiting the sun.
- **Interactive Camera Controls**: Camera movement around the solar system using `OrbitControls`.
- **Clickable Celestial Objects**: Clicking on any celestial object, including planets and a spaceship, will refocus the camera to that object.
- **Realistic Lighting**: The scene includes ambient light to enhance the visual appearance of the objects.
- **Spaceship Model**: A basic 3D model of a spaceship that adds to the realism of the simulation.

## Setup and Installation
1. **Prerequisites**: Ensure you have a modern web browser that supports WebGL.
2. **Include Three.js**: Use either a local copy of Three.js or include it via CDN in your HTML file.
3. **Include OrbitControls**: Ensure `OrbitControls.js` is included from the Three.js examples.
4. **Service Functions**: Implement the `make_planets`, `make_sun`, `make_many_suns`, `make_basic_planet`, and `make_spaceship` functions in a separate file named `services.js`.
5. **HTML Structure**: Add a basic HTML structure to host the canvas. Include a container element for WebGL error messages.

## Usage
- **Viewing the Solar System**: Open the HTML file in a web browser to view the solar system.
- **Interacting with Objects**: Click on any planet or the spaceship to focus the camera on that object.
- **Exploring the Scene**: Use mouse controls to zoom in/out and orbit around the focused object.

## Code Structure
- **Scene Initialization**: Setup of the Three.js scene, camera, and renderer.
- **Object Creation**: Planets and the spaceship are created and added to the scene.
- **Animation Loop**: A continuous loop that updates the positions of the celestial objects and renders the scene.
- **Event Handling**: Click events are captured, and the camera focus is shifted to the clicked object.

## Customization
- **Textures and Models**: Modify the `services.js` to use different textures or models for planets and the spaceship.
- **Camera Settings**: Adjust the camera settings for different perspectives and behaviors.
- **Lighting**: Experiment with different lighting setups to change the scene's mood and realism.

## Notes
- The project uses modern JavaScript features and may require transpilation for compatibility with older browsers.
- Performance may vary based on the complexity of the scene and the capabilities of the user's hardware.

## Images


<img width="759" alt="Screenshot 2023-12-28 at 2 35 35 am" src="https://github.com/Ashwyn28/threejs_simulated_universe/assets/15099579/22d13280-840e-46f2-9a20-ccdef8781310">
<img width="1042" alt="Screenshot 2023-12-30 at 3 21 38 pm" src="https://github.com/Ashwyn28/threejs_simulated_universe/assets/15099579/65bac0d9-ead7-4590-a2b8-0c7452eb5e9e">
