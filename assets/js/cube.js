
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, (400) / (400), 0.1, 1000);
//var camera = new THREE.OrthographicCamera( window.innerWidth / -window.innerHeight, window.innerWidth / window.innerHeight, window.innerHeight / window.innerHeight, window.innerHeight / -window.innerHeight, 1, 1000 );
var renderer = new THREE.WebGLRenderer();
//renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize(400, 400);
var cubeDiv=document.querySelector('#cube'); 
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    var width = 400 //window.innerWidth/4;
    var height = 400//window.innerHeight/3;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

controls = new THREE.OrbitControls(camera, renderer.domElement);


// creae the shape
var geometry = new THREE.BoxGeometry(1, 1, 1);

// sreate a material, clour or image texture
var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


camera.position.z = 3;

// game logic
var update = function () {
    // cube.rotation.x += 0.01;
    //cube.rotation.y += 0.005;
};

//draw scene
var render = function () {
    renderer.render(scene, camera);
};
// run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
};
GameLoop();
