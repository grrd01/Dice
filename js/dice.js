/*
* grrd's Dice
* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
* Licensed under the MPL License
*/

var container;
var mesh = [];
var camera, cameraTarget, scene, renderer, material;

var targetRotationX = [0, 0, 0, 0, 0];
var targetRotationXOnMouseDown = [0, 0, 0, 0, 0];
var randX = [1, 0, 0, 0, 0];

var targetRotationY = [0, 0, 0, 0, 0];
var targetRotationYOnMouseDown = [0, 0, 0, 0, 0];
var randY = [1, 0, 0, 0, 0];

var targetRotationZ = [0, 0, 0, 0, 0];
var targetRotationZOnMouseDown = [0, 0, 0, 0, 0];
var randZ = [1, 0, 0, 0, 0];

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;
var timeOnMouseDown;

var rotX;
var rotY;
var rotZ;
var rolling = false;
var wert =  [0, 0, 0, 0, 0];
var locked = [false, false, false, false, false]
var wert_count =  [0, 0, 0, 0, 0, 0];
var current_score = new Array(14);
var player_score = new Array(5);
for (var i = 0; i < player_score.length; ++i)
{player_score[i] = new Array(14);}

var totwert;
var in_dice = false;
var anz_dices = 1;
var in_yahtzee = true;
var in_lock = false;
var anz_player = 2;
var cur_player = 1;
var cur_try = 1;
var cur_speed;
var pop_swipe_shown = false;
var pop_lock_shown = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var g_windowsheight;
var g_windowswidth;

var myShakeEvent = new Shake({
	threshold: 8, // 15 - optional, shake strength threshold
	timeout: 1000 // optional, determines the frequency of event generation
});

window.addEventListener('shake', shakeEventDidOccur, false);
function shakeEventDidOccur () {
	$('#popupSwipe').popup('close');
	$("#lbtotwert").hide();
	$("#lbtry").hide();
	for (var i = 0; i < anz_dices; ++i) {
		if (!locked[i]) {
			targetRotationX[i]=Math.round((targetRotationX[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
			targetRotationY[i]=Math.round((targetRotationY[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
			targetRotationZ[i]=Math.round((targetRotationZ[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
		}
	}
	rolling = true;	
}

$(document).on("pageshow","#dice",function(){
	if (!pop_swipe_shown) {
		$("#popupSwipe").popup("open");
		pop_swipe_shown = true;
	}
	
});

if ( ! Detector.webgl ) {
	setTimeout(function() {$("#popupWebGL").popup("open");},500);
} else {
	init();
}

content_formatting();
setTimeout(function() {content_formatting();},500);

function init() {
	$("#lbtotwert").hide();
	$("#lbtry").hide();
	container = document.createElement( 'div' );
	document.getElementById("dice").appendChild( container );

	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera.position.set( 0, 0, 2.2);

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
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setClearColor( 0x000000, 0 );
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
	cur_speed = 0;
	for (var i = 0; i < anz_dices; ++i) {
		mesh[i].rotation.y += ( targetRotationX[i] - mesh[i].rotation.y ) * 0.05;
		mesh[i].rotation.x += ( targetRotationY[i] - mesh[i].rotation.x ) * 0.05;
		mesh[i].rotation.z += ( targetRotationZ[i] - mesh[i].rotation.z ) * 0.05;
		cur_speed += Math.abs(mesh[i].rotation.y  - targetRotationX[i]) + Math.abs(mesh[i].rotation.x  - targetRotationY[i]) + Math.abs(mesh[i].rotation.z  - targetRotationZ[i]);
	}

	if (cur_speed / anz_dices <0.005 && rolling)
	{
		rolling = false;
		totwert = 0;
		wert_count =  [0, 0, 0, 0, 0, 0];

		for (var i = 0; i < anz_dices; ++i) {
			rotX = ((Math.round((mesh[i].rotation.x % (Math.PI*2))/Math.PI*2))+4) % 4;
			rotY = ((Math.round((mesh[i].rotation.y % (Math.PI*2))/Math.PI*2))+4) % 4;
			rotZ = ((Math.round((mesh[i].rotation.z % (Math.PI*2))/Math.PI*2))+4) % 4;
			wert[i] = 0;
			if (rotX == 0 && rotY == 0 || 
				rotX == 2 && rotY == 2) {
				wert[i]=1;
			} else if (	rotX == 3 && rotZ == 1 || 
						rotX == 1 && rotZ == 3 || 
						rotX == 0 && rotY == 1 && rotZ == 0 || 
						rotX == 2 && rotY == 3 && rotZ == 0 || 
						rotX == 2 && rotY == 1 && rotZ == 2 || 
						rotX == 0 && rotY == 3 && rotZ == 2) {
				wert[i]=2;
			} else if (	rotX == 3 && rotZ == 0 || 
						rotX == 1 && rotZ == 2 || 
						rotX == 0 && rotY == 1 && rotZ == 3 || 
						rotX == 0 && rotY == 3 && rotZ == 1 || 
						rotX == 2 && rotY == 1 && rotZ == 1 || 
						rotX == 2 && rotY == 3 && rotZ == 3) {
				wert[i]=3;
			} else if (	rotX == 1 && rotZ == 0 || 
						rotX == 3 && rotZ == 2 || 
						rotX == 0 && rotY == 3 && rotZ == 3 || 
						rotX == 2 && rotY == 1 && rotZ == 3 || 
						rotX == 0 && rotY == 1 && rotZ == 1 || 
						rotX == 2 && rotY == 3 && rotZ == 1) {
				wert[i]=4;
			} else if (	rotX == 3 && rotZ == 3 || 
						rotX == 1 && rotZ == 1 || 
						rotX == 0 && rotY == 3 && rotZ == 0 || 
						rotX == 2 && rotY == 3 && rotZ == 2 || 
						rotX == 0 && rotY == 1 && rotZ == 2 || 
						rotX == 2 && rotY == 1 && rotZ == 0) {
				wert[i]=5;
			} else if (	rotX == 0 && rotY == 2 || 
						rotX == 2 && rotY == 0) {
				wert[i]=6;
			} else {
				wert="neu";
			}
			//wert=wert + "\n" + "x: " + rotX + "  y: " + rotY + "  Z: " + rotZ;
			//alert(wert);
			totwert += wert[i];
			wert_count[wert[i]-1] = wert_count[wert[i]-1] + 1;
		}
		if (in_yahtzee) {
			if (!pop_lock_shown && cur_try ==1 && !in_lock) {
				$("#popupLock").popup("open");
				pop_lock_shown = true;
			}
			if (!in_lock){ cur_try ++; } else { in_lock = false;}
			$("#lbtry").html(cur_try + " / 3");
			$("#lbtry").show();
			$("#lbtotwert").html("Player " + cur_player);
			if (cur_try > 3) { yahtzee_count(); }
		} else {
			$("#lbtotwert").html(totwert);
		}
		$("#lbtotwert").show();
	} 
	renderer.render( scene, camera );
}

function yahtzee_count () {
	for (var i = 0; i < current_score.length; ++i) {
		current_score[i]=0;
	}
	var sequence = 0;
	for (i = 0; i < wert_count.length; ++i) {
		current_score[i] = wert_count[i]*(i+1);
		if (wert_count[i]>=3) {current_score[7] = 3*(i+1);}
		if (wert_count[i]>=4) {current_score[8] = 4*(i+1);}
		if (wert_count[i]>=5) {current_score[12] = 50;}
		if (wert_count[i]>=5) {current_score[9] = 25;}
		if (wert_count[i]==3) {
			for (var j = 0; j < wert_count.length; ++j) {
				if (wert_count[j]==2) {current_score[9] = 25;}
			}
		}
		if (wert_count[i]>=1) {sequence++;} else {sequence = 0}
		if (sequence>=4) {current_score[10] = 30;}
		if (sequence>=5) {current_score[11] = 40;}
	}
	current_score[13] = totwert;
	for (var i = 0; i < current_score.length; ++i) {
		if (player_score[cur_player-1][i] === null)
		{
			$("#bt" + i + "p" + cur_player).html(current_score[i]);
			$("#lb" + i + "p" + cur_player).attr("style","display:none;");
			$("#bt" + i + "p" + cur_player).attr("style","display:block;");
		}
	}
	$.mobile.changePage('#popupYahtzee', {transition: 'pop' , role: 'dialog'});
}

function yahtzee_setvalue ( id ) {
	player_score[cur_player-1][id] = current_score[id];
	$("#lb" + id + "p" + cur_player).html(current_score[id]);

	totwert = 0;
	for (var i = 0; i < current_score.length; ++i) {
		$("#bt" + i + "p" + cur_player).attr("style","display:none;");
		$("#lb" + i + "p" + cur_player).attr("style","display:inline;");
		totwert += player_score[cur_player-1][id];
		if (i == 5) {
			$("#lbsum1p" + cur_player).html(totwert);
			if (totwert >= 63) {
				$("#lbbonusp" + cur_player).html(35);
				totwert += 35;
			}
			$("#lbsum2p" + cur_player).html(totwert);
		}
	}

	cur_player ++;
	if (cur_player > anz_player) { cur_player = 1; }
	cur_try = 1;
	$("#lbtry").html(cur_try + " / 3");
	$("#lbtotwert").html("Player " + cur_player);

	for (var i = 0; i < anz_dices; ++i) {
		locked[i] = false;
	}


	$.mobile.changePage('#dice', {transition: 'pop', reverse: true});
}

function yahtzee_init () {
	for (var i = 0; i < 13; ++i) {
		current_score[i] = 0;
		for (var j = 0; j < 5; ++j) {
			player_score[j][i] = null;
		}
	}
	cur_player = 1;
	cur_try = 1;

	$("#lbtotwert").html("Player " + cur_player);
	$("#lbtry").html(cur_try + " / 3");
	$("#lbtotwert").show();
	$("#lbtry").show();
}

function onDocumentMouseDown( event ) {
	$("#lbtotwert").hide();
	$("#lbtry").hide();
	event.preventDefault();
	container.addEventListener( 'mousemove', onDocumentMouseMove, false );
	container.addEventListener( 'mouseup', onDocumentMouseUp, false );
	container.addEventListener( 'mouseout', onDocumentMouseOut, false );
	mouseXOnMouseDown = event.clientX - windowHalfX;
	mouseYOnMouseDown = event.clientY - windowHalfY;
	timeOnMouseDown = new Date();
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
		if (!locked[i]) {
			targetRotationX[i] = targetRotationXOnMouseDown[i] +  (( mouseX - mouseXOnMouseDown ) * 0.08)*randX[i];
			targetRotationY[i] = targetRotationYOnMouseDown[i] +  (( mouseY - mouseYOnMouseDown ) * 0.08)*randY[i];
			targetRotationZ[i] = targetRotationZOnMouseDown[i] + ((( mouseX - mouseXOnMouseDown ) * 0.08)*randZ[i] + (( mouseY - mouseYOnMouseDown ) * 0.08)*randZ[i])/2;
		}
	}
}

function onDocumentMouseUp( event ) {
	MouseOut_MouseUp(event);
}

function onDocumentMouseOut( event ) {
	MouseOut_MouseUp(event);
}

function MouseOut_MouseUp( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
	if (mouseX - mouseXOnMouseDown < 10 && mouseY - mouseYOnMouseDown < 10 && new Date() - timeOnMouseDown < 500 && in_yahtzee)
	{
		lock_dice();
	}

	container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	container.removeEventListener( 'mouseout', onDocumentMouseOut, false );

	for (var i = 0; i < anz_dices; ++i) {
		if (!locked[i]) {
			targetRotationX[i]=Math.round((targetRotationX[i])/Math.PI*2)*Math.PI/2;
			targetRotationY[i]=Math.round((targetRotationY[i])/Math.PI*2)*Math.PI/2;
			targetRotationZ[i]=Math.round((targetRotationZ[i])/Math.PI*2)*Math.PI/2;
		}
	}
	
	rolling = true;
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		$("#lbtotwert").hide();
		$("#lbtry").hide();
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
			if (!locked[i]) {
				targetRotationX[i] = targetRotationXOnMouseDown[i] +  (( mouseX - mouseXOnMouseDown ) * 0.02)*randX[i];
				targetRotationY[i] = targetRotationYOnMouseDown[i] +  (( mouseY - mouseYOnMouseDown ) * 0.02)*randY[i];
				targetRotationZ[i] = targetRotationZOnMouseDown[i] + ((( mouseX - mouseXOnMouseDown ) * 0.02)*randZ[i] + (( mouseY - mouseYOnMouseDown ) * 0.02)*randZ[i])/2;
			}
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
		if (!locked[i]) {
			targetRotationX[i]=Math.round((targetRotationX[i])/Math.PI*2)*Math.PI/2;
			targetRotationY[i]=Math.round((targetRotationY[i])/Math.PI*2)*Math.PI/2;
			targetRotationZ[i]=Math.round((targetRotationZ[i])/Math.PI*2)*Math.PI/2;
		}
	}
	rolling = true;	
}

function lock_dice () {"use strict";
	in_lock = true;
	if (cur_try == 1){ return; }
	if (g_windowsheight > g_windowswidth) {
		if (mouseX < 0 && mouseY > g_windowsheight/15) {
			locked[4] = !locked[4];
			//mesh[4].material.color.setHex(0x00BB33);
		}
		if (mouseX > 0 && mouseY > g_windowsheight/15) {
			locked[1] = !locked[1];
		}
		if (mouseX > g_windowsheight/(-15) && mouseX < g_windowsheight/15 && mouseY > g_windowsheight/(-15) && mouseY < g_windowsheight/15) {
			locked[2] = !locked[2];
		}
		if (mouseX < 0 && mouseY < g_windowsheight/(-15)) {
			locked[3] = !locked[3];
		}
		if (mouseX > 0 && mouseY < g_windowsheight/(-15)) {
			locked[0] = !locked[0];
		}

	} else {
		if (mouseY < 0 && mouseX > g_windowsheight/15) {
			locked[0] = !locked[0];
		}
		if (mouseY > 0 && mouseX > g_windowsheight/15) {
			locked[1] = !locked[1];
		}
		if (mouseY > g_windowsheight/(-15) && mouseY < g_windowsheight/15 && mouseX > g_windowsheight/(-15) && mouseX < g_windowsheight/15) {
			locked[2] = !locked[2];
		}
		if (mouseY < 0 && mouseX < g_windowsheight/(-15)) {
			locked[3] = !locked[3];
		}
		if (mouseY > 0 && mouseX < g_windowsheight/(-15)) {
			locked[4] = !locked[4];
		}
	}
	for (var i = 0; i < anz_dices; ++i) {
		if (!locked[i]) { break; }
		if (i == anz_dices - 1) { yahtzee_count(); }
	}
}

function content_formatting() {"use strict";
	g_windowsheight = $(window).height();
	g_windowswidth = $(window).width();
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	if (g_windowsheight > g_windowswidth) {
		$("#img_title").attr("style","width:100%;margin-top:-10px;");
		$("#img_title2").attr("style","width:100%;margin-top:-40px;");
		$("#img_title3h").show();
		$("#img_title3q").hide();
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
		$("#img_title").attr("style","width:calc(46% - 5px);margin-bottom:20px;");
		$("#img_title2").attr("style","width:calc(34% - 5px);margin-top:0px;margin-bottom:20px;");
		$("#img_title3h").hide();
		$("#img_title3q").show();
		if (typeof mesh[0] !== "undefined" && mesh[0] !== null) {
			switch (anz_dices) {
				case 1:
					mesh[0].position.set( 0, 0, 0 );
					camera.position.set( 0, 0, 1.8);
					break;
				case 2:
					mesh[0].position.set( 0.45, 0, 0 );
					mesh[1].position.set( -0.45, 0, 0 );
					camera.position.set( 0, 0, 2.2);
					break;
				case 3:
					mesh[0].position.set( 0.9, 0, 0 );
					mesh[1].position.set( 0, 0, 0 );
					mesh[2].position.set( -0.9, 0, 0 );
					camera.position.set( 0, 0, 3);
					break;
				case 4:
					mesh[0].position.set( 0.45, 0.45, 0 );
					mesh[1].position.set( -0.45, 0.45, 0 );
					mesh[2].position.set( 0.45, -0.45, 0 );
					mesh[3].position.set( -0.45, -0.45, 0 );
					camera.position.set( 0, 0, 3);
					break;
				case 5:
					mesh[0].position.set( 0.9, 0.45, 0 );
					mesh[1].position.set( 0.9, -0.45, 0 );
					mesh[2].position.set( 0, 0, 0 );
					mesh[3].position.set( -0.9, 0.45, 0 );
					mesh[4].position.set( -0.9, -0.45, 0 );
					camera.position.set( 0, 0, 4);
					break;
			} 
		}
	}
	$("#btdice").attr("style","width:" + (g_windowswidth/2-16) + "px;");
	$("#btyahtzee").attr("style","width:" + (g_windowswidth/2-16) + "px;");
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
		$("#radioanzp"+i).attr("style","width:" + (g_windowswidth-50)/5.3 + "px;max-width:92px;"+"height:" + (g_windowswidth-50)/5.3 + "px;max-height:92px;");
		$("#img_anzahlp"+i).css('max-width', '80px');
		$("#img_anzahlp"+i).css('width', + (g_windowswidth-90)/5.5 +'px');
	}
}

$(window).resize( function() {"use strict";
	content_formatting();
	setTimeout(function() {content_formatting();},500);
});

function display_dice(yahtzee){"use strict";
	in_yahtzee = yahtzee;
	in_dice=true;
	anz_player = $('input:radio[name=anzahlp]:checked').val();
	if (in_yahtzee) {
		$('input:radio[name=anzahl]').filter('[value=5]').prop('checked', true);
		close_settings();
		yahtzee_init();
	} else {
		$("#lbtotwert").hide();
		$("#lbtry").hide();
	}
	myShakeEvent.start();
	animate();
	$.mobile.changePage('#dice', {transition: 'slide'});
	mesh[0].material.color.setHex($('input:radio[name=color]:checked').val());
	mesh[0].material.ambient.setHex($('input:radio[name=color]:checked').val());
}

function quit_dice(){"use strict";
	myShakeEvent.stop();
	in_dice=false;
	$("#lbtotwert").hide();
	$("#lbtry").hide();
	locked = [false, false, false, false, false];
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
	targetRotationX[i] = Math.round((targetRotationX[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
	targetRotationY[i] = Math.round((targetRotationY[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
	targetRotationZ[i ]= Math.round((targetRotationZ[i] + 30 * Math.random()-15)/Math.PI*2)*Math.PI/2;
	mesh[i].rotation.y = targetRotationX[i];
	mesh[i].rotation.x = targetRotationY[i];
	mesh[i].rotation.z = targetRotationZ[i];
}

function show_help (i) {"use strict";
	$("#helptit").html(navigator.mozL10n.get(i));
	$("#helptxt").html(navigator.mozL10n.get(i+"txt"));
	$("#popupHelp").popup("open");
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
