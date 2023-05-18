//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer, clock, deltaTime, totalTime, camera, camera1, camera2, camera3, camera4, camera5;



/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';
    
    //camera1 (frontal view)
    camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera1.position.set(0, 0, 100);
    camera1.lookAt(scene.position);
    scene.add(camera1);

    //camera2 (lateral view)
    camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera2.position.set(100, 0, 0);
    camera2.lookAt(scene.position);
    scene.add(camera2);

    //camera3 (top view)
    camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera3.position.set(0, 100, 0);
    camera3.lookAt(scene.position);
    scene.add(camera3);

    //camera4 (isometric perspective - orthogonal projection)
    camera4 = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
    camera4.position.set(100, 100, 100);
    camera4.lookAt(scene.position);
    scene.add(camera4);

    //camera5 (isometric perspective - perspective projection)
    camera5 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera5.position.set(100, 100, 100);
    camera5.lookAt(scene.position);
    scene.add(camera5);

    camera = camera1;
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera1);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

    createScene();
    createCamera();


    /*createLights();
    createObjects();*/

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

      // Check if the canvas container element exists
    var canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.appendChild(renderer.domElement);
    } else {
        console.error("The 'canvas-container' element was not found.");
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    render();
    animate();

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    requestAnimationFrame(animate);
    update();
    render();

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////

function onKeyDown(e){
    'use strict';

        switch(e.keyCode){
            case 49:
                camera = camera1;
                break;
            case 50:
                camera = camera2;
                break;
            case 51:
                camera = camera3;
                break;
            case 52:
                camera = camera4;
                break;
            case 53:
                camera = camera5;
                break;
        }
}
///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

