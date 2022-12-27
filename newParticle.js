// Init
// Render

init();
animate();

function init()
{
    clock=new THREE.Clock(true);
    // scene
    scene=new THREE.Scene();
    // light
    // light=new THREE.DirectionalLight("white",1);
    light = new THREE.DirectionalLight( 'white' ); // soft white light
    // scene.add( light );
    light.position.set(1,1,10).normalize();
    scene.add(light);
    // camera
    camera=new THREE.PerspectiveCamera(100,innerWidth/innerHeight,1,1000);
    camera.position.z=10;
    // mesh
    // geometry=new THREE.SphereGeometry(15,32,16);
    geometry = new THREE.CubeGeometry( 10, 10, 10 );
    material = new THREE.MeshPhongMaterial( {color: 'blue',specular:"white",shininess:10} );
    // // material=new THREE.MeshPhongMaterial({color:'blue'})
    // cubeMesh=new THREE.Mesh(geometry,material);
    
 
    // // render
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(innerWidth,innerHeight);
    setTimeout(() => {
        
        document.body.appendChild(renderer.domElement);
    }, 2000);
    particleSystem = createParticleSystem();
    scene.add(particleSystem);
    window.addEventListener("resize",onWindowResize);
    render();
}

function animate()
{

    deltaTime=clock.getDelta();
    // cubeMesh.rotation.x+=1*deltaTime;
    // cubeMesh.rotation.z+=1*deltaTime;
    animateParticles();
    render();
    requestAnimationFrame(animate);
}

function render()
{
    renderer.render(scene,camera);
}

function createParticleSystem()
{
    let particleCount=2000;

    let particles=new THREE.Geometry;

    for(let p=0;p<particleCount;p++)
    {
        var x = Math.random() * 400 - 200;
        var y = Math.random() * 400 - 200;
        var z = Math.random() * 400 - 200;
        
        var particle = new THREE.Vector3(x, y, z);

        particles.vertices.push(particle);

    }

    var particleMaterial = new THREE.PointsMaterial(
        {color: 'white', 
        size: 1,
        map: THREE.ImageUtils.loadTexture("./goldparticle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true,
        });

        particleSystem = new THREE.Points(particles, particleMaterial);
        return particleSystem; 
}

function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
    var vert = verts[i];
    if (vert.y < -200) {
    vert.y = Math.random() * 400 - 200;
    }
    vert.y = vert.y - (10 * deltaTime);
   
}
    particleSystem.geometry.verticesNeedUpdate = true;
    
    particleSystem.rotation.x += .1 * deltaTime ;

}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}