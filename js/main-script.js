//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer, clock, deltaTime, totalTime, camera, camera1, camera2, camera3, camera4, camera5;
var trailer = new THREE.Object3D();
var robot = new THREE.Object3D();
var head = new THREE.Object3D();
var eye1 = new THREE.Object3D();
var eye2 = new THREE.Object3D();
var antena1 = new THREE.Object3D();
var antena2 = new THREE.Object3D();
var shoulder1 = new THREE.Object3D();
var shoulder2 = new THREE.Object3D();
var exhaustPipe1 = new THREE.Object3D();
var exhaustPipe2 = new THREE.Object3D();
var shoulder2 = new THREE.Object3D();
var arm1 = new THREE.Object3D();
var arm2 = new THREE.Object3D();
var forearm1 = new THREE.Object3D();
var forearm2 = new THREE.Object3D();
var thigh1 = new THREE.Object3D();
var thigh2 = new THREE.Object3D();
var leg1 = new THREE.Object3D();
var leg2 = new THREE.Object3D();
var foot1 = new THREE.Object3D();
var foot2 = new THREE.Object3D();
var wheel1 = new THREE.Object3D();
var wheel2 = new THREE.Object3D();
var wheel3 = new THREE.Object3D();
var wheel4 = new THREE.Object3D();
var trailerPosition = new THREE.Vector3(40, 0, 0);
const trailerSpeed = 0.5;
var rotationSpeed = Math.PI / 180; // Rotation speed in radians per frame
var keys = Array(256).fill(0);
var isKeyBeingPressed = false;
var feetModeTruck = false;
var legsModeTruck = false;
var armsModeTruck = false;
var headModeTruck = false;
var trailerMin = new THREE.Vector3(-30, -10, -10);
var trailerMax = new THREE.Vector3(+30, 10, 10);
var robotMin = new THREE.Vector3(-44, -5, -13);
var robotMax = new THREE.Vector3(1, 25, 13);
var trailerAnimation = false;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

}


//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';
    
    // camera1 (frontal view)
    camera1 = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, window.innerHeight / 8, -window.innerHeight / 8, 1, 1000);
    camera1.position.set(-100, 0, 0);
    camera1.lookAt(scene.position);
    scene.add(camera1);

    // camera2 (lateral view)
    camera2 = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, window.innerHeight / 8, -window.innerHeight / 8, 1, 1000);
    camera2.position.set(0, 0, 100);
    camera2.lookAt(scene.position);
    scene.add(camera2);

    // camera3 (top view)
    camera3 = new THREE.OrthographicCamera(-window.innerWidth / 8, window.innerWidth / 8, window.innerHeight / 8, -window.innerHeight / 8, 1, 1000);
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

    let geometry = new THREE.CylinderGeometry(4,4,3,32);
    let material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z)
    mesh.rotation.x = Math.PI / 2; // Rotate the cylinder to lay down
    obj.add(mesh);
}

function addLinkPiece(obj, x, y, z){
    'use strict'

    let geometry = new THREE.CylinderGeometry(1,1,1,32);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2; // Rotate the cylinder to lay down
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

    let geometry = new THREE.CylinderGeometry(1.5, 1.5, 15, 32);
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

    let geometry = new THREE.BoxGeometry(6, 10, 6);
    let material = new THREE.MeshBasicMaterial({ color: 0xedeade, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z); 
    obj.add(mesh);
}

function addLeg(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(6, 20, 6);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addFoot(obj, x, y, z) {
    'use strict';

    let geometry = new THREE.BoxGeometry(8, 6, 6);
    let material = new THREE.MeshBasicMaterial({ color: 0x0047ab, wireframe: false });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTrailer(x, y, z) {
    'use strict';

    addContainer(trailer, 40, 16.5, 0);
    addWheel(trailer, 55, 2.5, -8);
    addWheel(trailer, 55, 2.5, 8);
    addWheel(trailer, 65, 2.5, 8);
    addWheel(trailer, 65, 2.5, -8);
    addLinkPiece(trailer, 15, 6, 0); 

    scene.add(trailer);
    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
}

function createRobot(x, y, z) {
    'use strict';

    let headPivot = new THREE.Object3D();
    headPivot.position.set(2.5, 20, 0);
    scene.add(headPivot);
    let thighPivot = new THREE.Object3D();
    thighPivot.position.set(0, 2.5, 0);
    scene.add(thighPivot);
    let footPivot = new THREE.Object3D();
    footPivot.position.set(3, -32.5, -6);
    thigh1.add(footPivot);

    addHead(head, 0, 2.55, 0); 
    headPivot.add(head);
    addEye(eye1, -2, 2.5, 1);
    head.add(eye1);
    addEye(eye2, -2, 2.5, -1);
    head.add(eye2);
    addAntena(antena1, 0, 5.5, 1);
    head.add(antena1);
    addAntena(antena2, 0, 5.5, -1);
    head.add(antena2);
    addShoulder(shoulder1, 0, 19, 10.5);
    robot.add(shoulder1);
    addShoulder(shoulder2, 0, 19, -10.5);
    robot.add(shoulder2);
    addArm(arm1, 0, 15, 13);
    shoulder1.add(arm1);
    addArm(arm2, 0, 15, -13);
    shoulder2.add(arm2);
    addExhaustPipe(exhaustPipe1, 0, 17, 16.5);
    arm1.add(exhaustPipe1);
    addExhaustPipe(exhaustPipe2, 0, 17, -16.5);
    arm2.add(exhaustPipe2);
    addForearm(forearm1, -5, 8, 13);
    arm1.add(forearm1);
    addForearm(forearm2, -5, 8, -13);
    arm2.add(forearm2);
    addTorso(robot, 0, 15, 0);
    addAbdomen(robot, 0, 7.5, 0);
    addWaist(robot, 0, 2.5, 0);
    addWheel(robot, 0, 2.5, 11.5)
    addWheel(robot, 0, 2.5, -11.5)
    addThigh(thigh1, 0, -7.5, 6);
    thighPivot.add(thigh1);
    addThigh(thigh2, 0, -7.5, -6);
    thighPivot.add(thigh2);
    addLeg(leg1, 0, -22.5, 6);
    thigh1.add(leg1);
    addWheel(wheel1, 0, -18, 10.5);
    leg1.add(wheel1);
    addWheel(wheel2, 0, -27, 10.5);
    leg1.add(wheel2);
    addLeg(leg2, 0, -22.5, -6);
    thigh2.add(leg2);
    addWheel(wheel3, 0, -18, -10.5);
    leg1.add(wheel3);
    addWheel(wheel4, 0, -27, -10.5);
    leg1.add(wheel4);
    addFoot(foot1, -4, 3, 0);
    footPivot.add(foot1);
    addFoot(foot2, -4, 3, 12);
    footPivot.add(foot2);


    scene.add(robot);
    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;
}

function isTruckMode(){
    if(feetModeTruck && legsModeTruck && armsModeTruck && headModeTruck) {return true;}
    return false;
}

///////////////////////
/* CHECKS COLLISIONS */
///////////////////////
function checkCollisionsAux(){
    'use strict';
    if (trailer.position.x + trailerMax.x > robotMin.x &&
        trailer.position.x + trailerMin.x < robotMax.x &&
        trailer.position.y + trailerMax.y > robotMin.y &&
        trailer.position.y + trailerMin.y < robotMax.y &&
        trailer.position.z + trailerMax.z > robotMin.z &&
        trailer.position.z + trailerMin.z < robotMax.z &&
        isTruckMode() == true) {
        return true;
    }
    return false;
}

function checkCollisions(){
    'use strict';
    if (checkCollisionsAux() == true) {
        trailerAnimation = true;
        handleCollisions();
    }
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';
    returnTrailerToBegining();
}

function returnTrailerToBegining(){
    let targetPositionX = 0;
    let targetPositionZ = 0;
    let translationSpeed = 0.1; 

    if (trailer.position.x < 0.1 && trailer.position.x > -0.1) {trailer.position.x = 0;}
    if (trailer.position.x > targetPositionX) {trailer.position.x -= translationSpeed;}
    if (trailer.position.x < targetPositionX) {trailer.position.x += translationSpeed;}
    if (trailer.position.z < 0.1 && trailer.position.z > -0.1) {trailer.position.z = 0;}
    if (trailer.position.z > targetPositionZ) {trailer.position.z -= translationSpeed;}
    if (trailer.position.z < targetPositionZ) {trailer.position.z += translationSpeed;}

    if (trailer.position.x === targetPositionX && trailer.position.z === targetPositionZ) {
        trailerAnimation = false;
    }
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

    if (keys[65] || keys[81]) {
        // Rotate feet
        for (let i = 0; i < 2; i++) {
            let foot = foot1; 
            if (i == 1) {foot = foot2;}
            if (foot.rotation.z <= Math.PI / 2 && foot.rotation.z >= 0) {
                foot.rotation.z += (keys[65] - keys[81]) * rotationSpeed;
            }
            if (foot.rotation.z > Math.PI / 2) {foot.rotation.z = Math.PI / 2; feetModeTruck = true;}
            if (foot.rotation.z < Math.PI / 2) {feetModeTruck = false;}
            if (foot.rotation.z < 0) {foot.rotation.z = 0;}
        }
    }

    if (keys[83] || keys[87]) {
        // Rotate legs
        for (let i = 0; i < 2; i++) {
            let thigh = thigh1; 
            if (i == 1) {thigh = thigh2;}
            if (thigh.rotation.z <= Math.PI / 2 && thigh.rotation.z >= 0) {
                thigh.rotation.z += (keys[83] - keys[87]) * rotationSpeed;
            }
            if (thigh.rotation.z > Math.PI / 2) {thigh.rotation.z = Math.PI / 2; legsModeTruck = true;}
            if (thigh.rotation.z < Math.PI / 2) {legsModeTruck = false;}
            if (thigh.rotation.z < 0) {thigh.rotation.z = 0;}
        }
    }

    if (keys[82] || keys[70]) {
        // Rotate head
        if ((head).rotation.z >= -Math.PI && head.rotation.z <= 0) {
            head.rotation.z += (keys[82] - keys[70]) * rotationSpeed * 2;
        }
        if (head.rotation.z < -Math.PI) {head.rotation.z = -Math.PI; headModeTruck = true;}
        if (head.rotation.z > -Math.PI) {headModeTruck = false;}
        if (head.rotation.z > 0) {head.rotation.z = 0;}
    }

    if (keys[68]) {
        // Translate arms 
        for (let i = 0; i < 2; i++) {
            let shoulder = shoulder1; 
            if (i == 1) {shoulder = shoulder2;}
            if (!shoulder.originalPosition) {
                shoulder.originalPosition = shoulder.position.clone();
            }
            
            let targetPositionX = 6.5; 
            let targetPositionZ = -5.5; 
            if (i == 1) {targetPositionZ = 5.5;}
            
            let translationSpeed = 0.1; 
            
            if (shoulder.position.x < targetPositionX) {
                shoulder.position.x += translationSpeed;
            } else {
                shoulder.position.x = targetPositionX;
            }
            
            if ((i == 0 && shoulder.position.z > targetPositionZ) || (i == 1 && shoulder.position.z < targetPositionZ)) {
                if(i==0) {shoulder.position.z -= translationSpeed;}
                if(i==1) {shoulder.position.z += translationSpeed;}
            } else {
                shoulder.position.z = targetPositionZ; armsModeTruck = true;
            }
        }
    }
    
    if (keys[69]) {
        // Translate arms back to the original position
        for (let i = 0; i < 2; i++) {
            let shoulder = shoulder1; 
            if (i == 1) {shoulder = shoulder2;}
            if (shoulder.originalPosition) {
                let originalPositionX = shoulder.originalPosition.x;
                let originalPositionZ = shoulder.originalPosition.z;
                let translationSpeed = 0.1; 
                
                if (shoulder.position.x > originalPositionX) {
                    shoulder.position.x -= translationSpeed;
                    armsModeTruck = false;
                } else {
                    shoulder.position.x = originalPositionX;
                }
                
                if ((i == 0 && shoulder.position.z < originalPositionZ) || (i == 1 && shoulder.position.z > originalPositionZ)) {
                    if(i==0) {shoulder.position.z += translationSpeed;}
                    if(i==1) {shoulder.position.z -= translationSpeed;}
                } else {
                    shoulder.position.z = originalPositionZ;
                    shoulder.originalPosition = undefined; // Reset the stored original position
                }
            }
        }
    }

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

    window.document.body.appendChild(renderer.domElement);

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

    checkCollisions();
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

function toggleWireframeMode(object) {
    if (object instanceof THREE.Mesh) {
      object.material.wireframe = !object.material.wireframe;
    }
  
    if (object.children.length > 0) {
      for (let i = 0; i < object.children.length; i++) {
        toggleWireframeMode(object.children[i]);
      }
    }
  }
  
///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e){
    'use strict';
    if (checkCollisionsAux() == false && trailerAnimation == true) {trailerAnimation = false;}
    if (trailerAnimation) {return;}

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
            if (!isKeyBeingPressed){
                isKeyBeingPressed = true;
                toggleWireframeMode(scene);
            }
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
    isKeyBeingPressed = false;

}
