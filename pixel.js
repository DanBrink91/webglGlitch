var scene = new THREE.Scene();
var camera = new THREE.Camera();
var loader = new THREE.TextureLoader();
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var uniforms = {
	time: {type: 'f', value: 1.0},
	img: {type: 't', value: 1.0}
};
loader.load('lain.jpg', 
	function(tex) {
		uniforms.img.value = tex;
		var shaded = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2, 0),
			new THREE.ShaderMaterial({
				uniforms: uniforms,
				vertexShader: document.getElementById("vertexShader").text,
				fragmentShader: document.getElementById("fragmentShader").text
			})
		);
		scene.add(camera);
		scene.add(shaded);
		render();
	}
);

function render() {
	var delta = 5 *  clock.getDelta();
	uniforms.time.value += 0.2 * delta;
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

// handle resizes
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize( event ) {
	renderer.setSize( window.innerWidth, window.innerHeight );
}