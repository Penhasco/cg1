//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer, clock, deltaTime, totalTime, camera, camera1, camera2, camera3, camera4, camera5;
var trailer = new THREE.Object3D();
var robot = new THREE.Object3D();
var trailerPosition = new THREE.Vector3(40, 0, 0);
const trailerSpeed = 0.5;
var rotationSpeed = Math.PI / 180; // Rotation speed in radians per frame
var keys = Array(256).fill(0);

var footNodes = [];
var legNodes = [];

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    scene.add(new THREE.AxisHelper(100));

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

}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function addContainer(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(60, 20, 20);
    let material = new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWheel(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.CylinderGeometry(3,3,2,32);
    let material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z)
    mesh.rotation.x = Math.PI / 2; // Rotate the cylinder to lay down
    obj.add(mesh);
}

function addLinkPiece(obj, x, y, z){
    'use strict'

    let geometry = new THREE.BoxGeometry(20,5,10);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addHead(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addEye(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0xf0e68c, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addAntena(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(1, 3, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addShoulder(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2; // Rotate the cylinder to lay down
    obj.add(mesh);
}

function addArm(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(4, 10, 4);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addExhaustPipe(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.CylinderGeometry(2, 2, 10, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addForearm(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(13, 4, 4);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTorso(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(10, 10, 20);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addAbdomen(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(10, 5, 10);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWaist(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(10, 5, 20);
    let material = new THREE.MeshBasicMaterial({ color: 0xedeade, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addThigh(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(6, 16, 6);
    let material = new THREE.MeshBasicMaterial({ color: 0xedeade, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    legNodes.push(mesh);
}

function addLeg(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(8, 14, 8);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addFoot(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(10, 4, 8);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    footNodes.push(mesh);
}

function createTrailer(x, y, z) {
    'use strict';

    addContainer(trailer, 40, 16, 0);
    addWheel(trailer, 55, 3, -8);
    addWheel(trailer, 55, 3, 8);
    addWheel(trailer, 65, 3, 8);
    addWheel(trailer, 65, 3, -8);
    addLinkPiece(trailer, 56, 3.5, 0); // Missing link piece object in trailer 

    scene.add(trailer);
    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
}

function createRobot(x, y, z) {
    'use strict';

    addHead(robot, 0, 22.5, 0);
    addEye(robot, -2, 22.5, 1);
    addEye(robot, -2, 22.5, -1);
    addAntena(robot, 0, 25.5, 1);
    addAntena(robot, 0, 25.5, -1);
    addShoulder(robot, 0, 19, 11);
    addShoulder(robot, 0, 19, -11);
    addArm(robot, 0, 15, 13.5);
    addArm(robot, 0, 15, -13.5);
    // addExhaustPipe(robot, 0, 32, 10);
    // addExhaustPipe(robot, 0, 32, -10);
    addForearm(robot, -5, 8, 13.5);
    addForearm(robot, -5, 8, -13.5);
    addTorso(robot, 0, 15, 0);
    addAbdomen(robot, 0, 7.5, 0);
    addWaist(robot, 0, 2.5, 0);
    addWheel(robot, 0, 2.5, 11.5)
    addWheel(robot, 0, 2.5, -11.5)
    addThigh(robot, 0, -8, 6);
    addThigh(robot, 0, -8, -6);
    addLeg(robot, 0, -23, 6);
    addWheel(robot, 0, -20, 11.5);
    addWheel(robot, 0, -28, 11,5);
    addLeg(robot, 0, -23, -6);
    addWheel(robot, 0, -20, -11.5);
    addWheel(robot, 0, -28, -11,5);
    addFoot(robot, -1, -31, 6);
    addFoot(robot, -1, -31, -6);


    scene.add(robot);
    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;
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

    if (keys[65] || keys[81]) {
        for (let i = 0; i < footNodes.length; i++) {
            let footNode = footNodes[i];
            if (footNode.rotation.z <= Math.PI / 2 && footNode.rotation.z >= 0) {
                footNode.rotation.z += (keys[65] - keys[81]) * rotationSpeed;
            }
            else if (footNode.rotation.z > Math.PI / 2) {footNode.rotation.z = Math.PI / 2;}
            else if (footNode.rotation.z < 0) {footNode.rotation.z = 0;}
        }
    }

    if (keys[83] || keys[87]) {
        for (let i = 0; i < legNodes.length; i++) {
            let legNode = legNodes[i];
            if (legNode.rotation.z <= Math.PI / 2 && legNode.rotation.z >= 0) {
                legNode.rotation.z += (keys[83] - keys[87]) * rotationSpeed;
            }
            else if (legNode.rotation.z > Math.PI / 2) {legNode.rotation.z = Math.PI / 2;}
            else if (legNode.rotation.z < 0) {legNode.rotation.z = 0;}
        }
    }

    // if (keys[65] === 0 && keys[81] === 0) {
    //     for (let i = 0; i < footNodes.length; i++) {
    //         let footNode = footNodes[i];
    //         if (footNode.rotation.z > 0) {
    //             footNode.rotation.z -= rotationSpeed;
    //         }
    //     }
    // }

    if(keys[39] || keys[38] || keys[37] || keys[40])
        trailer.position.add(
            new THREE.Vector3(keys[40] - keys[38], 0, keys[37] - keys[39]).
            normalize().
            multiplyScalar(trailerSpeed)
        )
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);

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
    camera = camera1;

    createTrailer(40,0,0);
    createRobot(0,0,0);


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
            case 54: 
                scene.traverse(function (node) {
                    if (node instanceof THREE.Mesh) {
                        node.material.wireframe = !node.material.wireframe;
                    }
                });
                break;
        }
    keys[e.keyCode] = 1;
}
///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    keys[e.keyCode] = 0;

}

