/*
* grrd's Dice
* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
* Licensed under the MPL License
*/

var container;
var mesh = [];
var camera, cameraTarget, scene, renderer, material;

var targetRotationX = [0,0,0,0,0];
var targetRotationXOnMouseDown = [0,0,0,0,0];
var randX = [1,0,0,0,0];

var targetRotationY = [0,0,0,0,0];
var targetRotationYOnMouseDown = [0,0,0,0,0];
var randY = [1,0,0,0,0];

var targetRotationZ = [0,0,0,0,0];
var targetRotationZOnMouseDown = [0,0,0,0,0];
var randZ = [1,0,0,0,0];

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var rotX;
var rotY;
var rotZ;
var rolling=false;
var wert;
var in_dice=false;
var anz_dices=1;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var g_windowsheight;
var g_windowswidth;

var myShakeEvent = new Shake({
	threshold: 10, // 15 - optional shake strength threshold
	timeout: 1000 // optional, determines the frequency of event generation
});

$(document).on("pageshow","#dice",function(){
	$("#popupSwipe").popup("open");
});

if ( ! Detector.webgl ) {
	setTimeout(function() {$("#popupWebGL").popup("open");},500);
} else {
	init();
}

window.addEventListener('shake', shakeEventDidOccur, false);
//function to call when shake occurs
function shakeEventDidOccur () {
	$('#popupSwipe').popup('close');
	for (var i = 0; i < anz_dices; ++i) {
		targetRotationX[i]=Math.round((targetRotationX[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
		targetRotationY[i]=Math.round((targetRotationY[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
		targetRotationZ[i]=Math.round((targetRotationZ[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
	}

	rolling = true;	
}

content_formatting();
setTimeout(function() {content_formatting();},500);

function init() {

	container = document.createElement( 'div' );
	document.getElementById("dice").appendChild( container );

	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera.position.set( 0, 0, 2.2);
	//camera.position.z = 2.2;

	cameraTarget = new THREE.Vector3( 0, -1, 0 );

	scene = new THREE.Scene();

	var loader = new THREE.STLLoader();
	loader.load( './models/dice.stl', function ( geometry ) {

		material = new THREE.MeshPhongMaterial( { ambient: 0xFF0066, color: 0xFF0066, specular: 0x111111, shininess: 200 } );

		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -30 ) );

		mesh[0] = new THREE.Mesh( geometry, material );

		mesh[0].position.set( 0, 0, 0 );
		mesh[0].rotation.y = - Math.PI / 2;
		targetRotationX[0] =  - Math.PI / 2;

		mesh[0].scale.set( 0.01, 0.01, 0.01 );

		scene.add( mesh[0] );

		rotX = ((Math.round((mesh[0].rotation.x % (Math.PI*2))/Math.PI*2))+4) % 4;
		rotY = ((Math.round((mesh[0].rotation.y % (Math.PI*2))/Math.PI*2))+4) % 4;
		rotZ = ((Math.round((mesh[0].rotation.z % (Math.PI*2))/Math.PI*2))+4) % 4;

	} );

	// Lights

	scene.add( new THREE.AmbientLight( 0x777777 ) );
	addShadowedLight( -1, 1, 1, 0xffffff, 1.35 );
	addShadowedLight( 0.5, 1, -1, 0xffffff, 1 );

	// renderer

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	container.appendChild( renderer.domElement );

	container.addEventListener( 'mousedown', onDocumentMouseDown, false );
	container.addEventListener( 'touchstart', onDocumentTouchStart, false );
	container.addEventListener( 'touchmove', onDocumentTouchMove, false );
	container.addEventListener( 'touchend', onDocumentTouchEnd, false );
	container.addEventListener( 'touchleave', onDocumentTouchLeave, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function addShadowedLight( x, y, z, color, intensity ) {

	var directionalLight = new THREE.DirectionalLight( color, intensity );
	directionalLight.position.set( x, y, z )
	scene.add( directionalLight );

	directionalLight.castShadow = true;

	var d = 1;
	directionalLight.shadowCameraLeft = -d;
	directionalLight.shadowCameraRight = d;
	directionalLight.shadowCameraTop = d;
	directionalLight.shadowCameraBottom = -d;

	directionalLight.shadowCameraNear = 1;
	directionalLight.shadowCameraFar = 4;

	directionalLight.shadowMapWidth = 1024;
	directionalLight.shadowMapHeight = 1024;

	directionalLight.shadowBias = -0.005;
	directionalLight.shadowDarkness = 0.15;

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	if(in_dice){requestAnimationFrame( animate );}
	render();
}

function render() {

	var timer = Date.now() * 0.0005;

	//mesh[0].rotation.x += 0.02;
	//mesh[0].rotation.y += 0.02;
	//mesh[0].rotation.z += 0.02;
	/*if (rotX == 0 && rotZ == 0) {
		mesh[0].rotation.y += ( targetRotationX - mesh[0].rotation.y ) * 0.05;
		mesh[0].rotation.x += ( targetRotationY - mesh[0].rotation.x ) * 0.05;
	} else if (rotX == 2 && rotZ == 0) 	{
		mesh[0].rotation.y += ( targetRotationX  * (-1) - mesh[0].rotation.y ) * 0.05;
		mesh[0].rotation.x += ( targetRotationY  - mesh[0].rotation.x ) * 0.05;
	}else {
		mesh[0].rotation.y += ( targetRotationX - mesh[0].rotation.y ) * 0.05;
		mesh[0].rotation.x += ( targetRotationY - mesh[0].rotation.x ) * 0.05;
	}*/
	for (var i = 0; i < anz_dices; ++i) {
		mesh[i].rotation.y += ( targetRotationX[i] - mesh[i].rotation.y ) * 0.05;
		mesh[i].rotation.x += ( targetRotationY[i] - mesh[i].rotation.x ) * 0.05;
		mesh[i].rotation.z += ( targetRotationZ[i] - mesh[i].rotation.z ) * 0.05;
	}

	if (Math.abs(mesh[0].rotation.y  - targetRotationX[0])+Math.abs(mesh[0].rotation.x  - targetRotationY) +Math.abs(mesh[0].rotation.z  - targetRotationZ)<0.005 && rolling)
	{
		rolling = false;

		rotX = ((Math.round((mesh[0].rotation.x % (Math.PI*2))/Math.PI*2))+4) % 4;
		rotY = ((Math.round((mesh[0].rotation.y % (Math.PI*2))/Math.PI*2))+4) % 4;
		rotZ = ((Math.round((mesh[0].rotation.z % (Math.PI*2))/Math.PI*2))+4) % 4;
		if (rotX == 0 && rotY == 0 || rotX == 2 && rotY == 2) {
			wert=1;
		} else if (rotX == 0 && rotY == 1 && rotZ == 0 || rotX == 2 && rotY == 3 && rotZ == 0) {
			wert=2;
		} else if (rotX == 0 && rotY == 2 && rotZ == 0 || rotX == 2 && rotY == 0 && rotZ == 0) {
			wert=6;
		} else if (rotX == 0 && rotY == 3 && rotZ == 0 || rotX == 2 && rotY == 1 && rotZ == 0) {
			wert=5;
		} else if (rotX == 1) {
			wert=4;
		} else if (rotX == 3) {
			wert=3;
		} else {
			wert="x: " + rotX + "  y: " + rotY + "  Z: " + rotZ;
		}
		//wert="x: " + rotX + "  y: " + rotY + "  Z: " + rotZ;
		alert(wert);
	} 

	renderer.render( scene, camera );
}

function onDocumentMouseDown( event ) {
	event.preventDefault();
	container.addEventListener( 'mousemove', onDocumentMouseMove, false );
	container.addEventListener( 'mouseup', onDocumentMouseUp, false );
	container.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	mouseYOnMouseDown = event.clientY - windowHalfY;
	for (var i = 0; i < anz_dices; ++i) {
		targetRotationXOnMouseDown[i] = targetRotationX[i];
		targetRotationYOnMouseDown[i] = targetRotationY[i];
		targetRotationZOnMouseDown[i] = targetRotationZ[i];
		if (i > 0) {
			randX[i] = Math.random()+0.5;
			randY[i] = Math.random()+0.5;
			randZ[i] = Math.random()+0.5;
		}
	}
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

	for (var i = 0; i < anz_dices; ++i) {
		targetRotationX[i] = targetRotationXOnMouseDown[i] +  (( mouseX - mouseXOnMouseDown ) * 0.08)*randX[i];
		targetRotationY[i] = targetRotationYOnMouseDown[i] +  (( mouseY - mouseYOnMouseDown ) * 0.08)*randY[i];
		targetRotationZ[i] = targetRotationZOnMouseDown[i] + ((( mouseX - mouseXOnMouseDown ) * 0.08)*randZ[i] + (( mouseY - mouseYOnMouseDown ) * 0.08)*randZ[i])/2;
	}

	/*if (rotX == 0 && rotZ == 0) {         // oben 4 ok 0 0 0 / 0 1 0 / 0 2 0 / 0 3 0 / 2 2 2 / 1 1 3
		targetRotationX = targetRotationXOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
		targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.08;
		targetRotationZ = (targetRotationXOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08) + (targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.08)/2;
	} else if (rotX == 2 && rotZ == 0) 	{ // oben 3 ok 2 0 0 / 2 1 0 / 2 2 0 / 2 3 0 / 3 3 1 / 0 1 2
		targetRotationX = targetRotationXOnMouseDown - ( mouseX - mouseXOnMouseDown ) * 0.08;
		targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.08;
		targetRotationZ = mesh[0].rotation.z;
	} else if (rotX == 3 && rotY == 3 || rotX == 0 && rotZ == 1) 	{ // oben 5 -  0 0 1 / 0 1 1 / 3 3 0 / 1 1 0 / 2 2 3 
		targetRotationX = mesh[0].rotation.x;
		targetRotationY = mesh[0].rotation.y;
		targetRotationZ = targetRotationZOnMouseDown - ( mouseY - mouseYOnMouseDown ) * 0.08;
	} else if (rotX == 1 && rotY == 3 || rotX == 2 && rotZ == 1) 	{ // oben 2 -  0 0 3 / 1 3 0 / 3 1 0 / 2 2 1 / 2 3 1
		targetRotationX = mesh[0].rotation.x;
		targetRotationY = mesh[0].rotation.y;
		targetRotationZ = mesh[0].rotation.z;
	} else if (rotX == 1 && rotY == 2) 	{ // oben 1  - 1 2 0 / 1 2 1 / 1 2 2 / 3 0 0 / 3 0 3
		targetRotationX = targetRotationXOnMouseDown - ( mouseX - mouseXOnMouseDown ) * 0.08;
		targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.08;
		targetRotationZ = mesh.rotation.z;
	} else if (rotX == 3 && rotY == 2) 	{ // oben 6 - 3 2 0 / 3 2 1 / 3 2 2 / 3 2 3 / 1 0 1 /
		targetRotationX = mesh[0].rotation.x;
		targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.08;
		targetRotationZ = targetRotationZOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
	} else {
		targetRotationX = targetRotationXOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.08;
		targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.08;
		targetRotationZ = targetRotationZOnMouseDown + (( mouseX - mouseXOnMouseDown ) * 0.08 + ( mouseY - mouseYOnMouseDown ) * 0.08)/2;
	}*/


}

function onDocumentMouseUp( event ) {
	MouseOut_MouseUp();
}

function onDocumentMouseOut( event ) {
	MouseOut_MouseUp();
}

function MouseOut_MouseUp() {
	container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	container.removeEventListener( 'mouseout', onDocumentMouseOut, false );

	for (var i = 0; i < anz_dices; ++i) {
		targetRotationX[i]=Math.round((targetRotationX[i])/Math.PI*2)*Math.PI/2;
		targetRotationY[i]=Math.round((targetRotationY[i])/Math.PI*2)*Math.PI/2;
		targetRotationZ[i]=Math.round((targetRotationZ[i])/Math.PI*2)*Math.PI/2;
	}
	
	rolling = true;
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		for (var i = 0; i < anz_dices; ++i) {
			targetRotationXOnMouseDown[i] = targetRotationX[i];
			targetRotationYOnMouseDown[i] = targetRotationY[i];
			targetRotationZOnMouseDown[i] = targetRotationZ[i];
			if (i > 0) {
				randX[i] = Math.random()+0.5;
				randY[i] = Math.random()+0.5;
				randZ[i] = Math.random()+0.5;
			}
		}
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		for (var i = 0; i < anz_dices; ++i) {
			targetRotationX[i] = targetRotationXOnMouseDown[i] +  (( mouseX - mouseXOnMouseDown ) * 0.02)*randX[i];
			targetRotationY[i] = targetRotationYOnMouseDown[i] +  (( mouseY - mouseYOnMouseDown ) * 0.02)*randY[i];
			targetRotationZ[i] = targetRotationZOnMouseDown[i] + ((( mouseX - mouseXOnMouseDown ) * 0.02)*randZ[i] + (( mouseY - mouseYOnMouseDown ) * 0.02)*randZ[i])/2;
		}
	}
}

function onDocumentTouchEnd( event ) {
	TouchEnd_TouchLeave();
}

function onDocumentTouchLeave( event ) {
	TouchEnd_TouchLeave();
}


function TouchEnd_TouchLeave(event) {
	for (var i = 0; i < anz_dices; ++i) {
		targetRotationX[i]=Math.round((targetRotationX[i])/Math.PI*2)*Math.PI/2;
		targetRotationY[i]=Math.round((targetRotationY[i])/Math.PI*2)*Math.PI/2;
		targetRotationZ[i]=Math.round((targetRotationZ[i])/Math.PI*2)*Math.PI/2;
	}

	rolling = true;	
}

function content_formatting() {"use strict";
	g_windowsheight = $(window).height();
	g_windowswidth = $(window).width();
	if (g_windowsheight > g_windowswidth) {
		$("#img_title").attr("style","width:100%;margin-top:-10px;");
		$("#img_title2").attr("style","width:100%;margin-top:-40px;");
		if (typeof mesh[0] !== "undefined" && mesh[0] !== null) {
			switch (anz_dices) {
				case 1:
					mesh[0].position.set( 0, 0, 0 );
					camera.position.set( 0, 0, 2.2);
					break;
				case 2:
					mesh[0].position.set( 0, 0.45, 0 );
					mesh[1].position.set( 0, -0.45, 0 );
					camera.position.set( 0, 0, 3);
					break;
				case 3:
					mesh[0].position.set( 0, 0.9, 0 );
					mesh[1].position.set( 0, 0, 0 );
					mesh[2].position.set( 0, -0.9, 0 );
					camera.position.set( 0, 0, 4.2);
					break;
				case 4:
					mesh[0].position.set( 0.45, 0.45, 0 );
					mesh[1].position.set( -0.45, 0.45, 0 );
					mesh[2].position.set( 0.45, -0.45, 0 );
					mesh[3].position.set( -0.45, -0.45, 0 );
					camera.position.set( 0, 0, 4.2);
					break;
				case 5:
					mesh[0].position.set( 0.45, 0.9, 0 );
					mesh[1].position.set( 0.45, -0.9, 0 );
					mesh[2].position.set( 0, 0, 0 );
					mesh[3].position.set( -0.45, 0.9, 0 );
					mesh[4].position.set( -0.45, -0.9, 0 );
					camera.position.set( 0, 0, 5.6);
					break;
			} 
		}
	} else {
		$("#img_title").attr("style","width:57%;margin-bottom:20px;");
		$("#img_title2").attr("style","width:42%;margin-top:0px;margin-bottom:20px;");

		if (typeof mesh[0] !== "undefined" && mesh[0] !== null) {
			switch (anz_dices) {
				case 1:
					mesh[0].position.set( 0, 0, 0 );
					camera.position.set( 0, 0, 2.2);
					break;
				case 2:
					mesh[0].position.set( 0.45, 0, 0 );
					mesh[1].position.set( -0.45, 0, 0 );
					camera.position.set( 0, 0, 3);
					break;
				case 3:
					mesh[0].position.set( 0.9, 0, 0 );
					mesh[1].position.set( 0, 0, 0 );
					mesh[2].position.set( -0.9, 0, 0 );
					camera.position.set( 0, 0, 4.2);
					break;
				case 4:
					mesh[0].position.set( 0.45, 0.45, 0 );
					mesh[1].position.set( -0.45, 0.45, 0 );
					mesh[2].position.set( 0.45, -0.45, 0 );
					mesh[3].position.set( -0.45, -0.45, 0 );
					camera.position.set( 0, 0, 4.2);
					break;
				case 5:
					mesh[0].position.set( 0.9, 0.45, 0 );
					mesh[1].position.set( 0.9, -0.45, 0 );
					mesh[2].position.set( 0, 0, 0 );
					mesh[3].position.set( -0.9, 0.45, 0 );
					mesh[4].position.set( -0.9, -0.45, 0 );
					camera.position.set( 0, 0, 5.6);
					break;
			} 
		}
	}
	$('#popupSwipe').css('max-width', (g_windowswidth - 10) + 'px');
	$('#popupWebGL').css('max-width', (g_windowswidth - 10) + 'px');
	$('#start').css('width', (g_windowswidth - 30) + 'px');
	
	for (var i = 1; i < 6; ++i) {
		$("#radio"+i).attr("style","width:" + (g_windowswidth-50)/5.3 + "px;max-width:92px;"+"height:" + (g_windowswidth-50)/5.3 + "px;max-height:92px;");
		$("#img_color"+i).css('max-width', '80px');
		$("#img_color"+i).css('width', + (g_windowswidth-90)/5.5 +'px');
		$("#radioanz"+i).attr("style","width:" + (g_windowswidth-50)/5.3 + "px;max-width:92px;"+"height:" + (g_windowswidth-50)/5.3 + "px;max-height:92px;");
		$("#img_anzahl"+i).css('max-width', '80px');
		$("#img_anzahl"+i).css('width', + (g_windowswidth-90)/5.5 +'px');
	}
}

$(window).resize( function() {"use strict";
	content_formatting();
});

function display_dice(){"use strict";
	myShakeEvent.start();
	in_dice=true;
	animate();
	$.mobile.changePage('#dice', {transition: 'slide'});
	mesh[0].material.color.setHex($('input:radio[name=color]:checked').val());
	mesh[0].material.ambient.setHex($('input:radio[name=color]:checked').val());
}

function quit_dice(){"use strict";
	myShakeEvent.stop();
	in_dice=false;
	$.mobile.changePage('#title', {transition: 'slide', reverse: true});
}

function close_settings() {"use strict";
	if ($('input:radio[name=anzahl]:checked').val() > anz_dices) {
		for (var i = anz_dices; i < $('input:radio[name=anzahl]:checked').val(); ++i) {
			if (typeof mesh[i] == "undefined" || mesh[i] == null) {
				clone_dice(i);
			}
			scene.add( mesh[i] );
		}
	}
	if (anz_dices > $('input:radio[name=anzahl]:checked').val()) {
		for (var i = $('input:radio[name=anzahl]:checked').val(); i < anz_dices; ++i) {
			scene.remove(mesh[i]);
		}
	}

	anz_dices = parseInt($('input:radio[name=anzahl]:checked').val());
	content_formatting();
	$.mobile.changePage('#title', {transition: 'pop', reverse: true});
}

function clone_dice(i) {"use strict";
	mesh[i] = mesh[0].clone();
	mesh[i].rotation.y = - Math.PI / 2;
	mesh[i].scale.set( 0.01, 0.01, 0.01 );
	targetRotationX[i] =  - Math.PI / 2;
}

navigator.mozL10n.ready( function() {
	// Example usage - http://homepage.hispeed.ch/grrds_games/Dice/?lang=en
	url_param = url_query('lang');
	if ( url_param ) {
		if (url_param !== navigator.mozL10n.language.code) {navigator.mozL10n.language.code = url_param;}
	}
});

function url_query( query ) {
	query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var expr = "[\\?&]"+query+"=([^&#]*)";
	var regex = new RegExp( expr );
	var results = regex.exec( window.location.href );
	if ( results !== null ) {
		return results[1];
	} else {
		return false;
	}
}
