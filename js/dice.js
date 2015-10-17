/*
 * grrd's Dice
 * Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
 * Licensed under the MPL License
 */

"use strict";

(function() {
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
    var locked = [false, false, false, false, false];
    var wert_count =  [0, 0, 0, 0, 0, 0];
    var current_score = new Array(14);
    var player_score = new Array(5);
    for (var i = 0; i < player_score.length; ++i)
    {player_score[i] = new Array(14);}
    var total_score =  [0, 0, 0, 0, 0];

    var totwert;
    var upperwert;
    var in_dice = false;
    var anz_dices = 1;
    var in_yahtzee = true;
    var in_lock = false;
    var in_move = false;
    var anz_player = 2;
    var cur_player = 1;
    var cur_try = 1;
    var cur_speed;
    var pop_swipe_shown = false;
    var pop_lock_shown = false;
    var pop_help_shown = false;
    var game_over = false;
    var lock_height;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var g_windowsheight;
    var g_windowswidth;

    var $lbanz = $("#lbanz");
    var $lbtry = $("#lbtry");
    var $bt_list = $("#bt_list");
    var $lbtotwert = $("#lbtotwert");
    var $imglock0 = $("#imglock0");
    var $imglock1 = $("#imglock1");
    var $imglock2 = $("#imglock2");
    var $imglock3 = $("#imglock3");
    var $imglock4 = $("#imglock4");
    var $div_close_list = $("#div_close_list");
    var $btdiceyahtzee = $("#btdiceyahtzee");
    var $btdice = $("#btdice");
    var $dice = $("#dice");
    var $btyahtzee = $("#btyahtzee");
    var $popupSwipe = $("#popupSwipe");
    var $popupLock = $("#popupLock");
    var $popupWebGL = $("#popupWebGL");
    var $popupHelp = $("#popupHelp");
    var $helptit = $("#helptit");
    var $helptxt = $("#helptxt");

    $btdice.click(function(e) {set_number(false); e.preventDefault();});
    $btyahtzee.click(function(e) {set_number(true); e.preventDefault();});
    $bt_list.click(function(e) {$.mobile.changePage('#popupYahtzee', {transition: 'pop' , role: 'dialog'}); e.preventDefault();});
    $("#bt_quit").click(function(e) {quit_dice(); e.preventDefault();});
    $("#bt_closeSettings").click(function(e) {close_settings(); e.preventDefault();});
    $("#popupYahtzee").mousedown(function() {$('#popupHelp').popup('close');});
    $("#bt_close_list").click(function(e) {close_list(); e.preventDefault();});
    $("[id^=btanzahl]").click(function(e) {display_dice(Number($(this).attr('id').slice(-1))); e.preventDefault();});
    $(".help").click(function(e) {show_help($(this).attr('id')); e.preventDefault();});

    $("[id^=bt0p]").click(function(e) {yahtzee_setvalue(0); e.preventDefault();});
    $("[id^=bt1p]").click(function(e) {yahtzee_setvalue(1); e.preventDefault();});
    $("[id^=bt2p]").click(function(e) {yahtzee_setvalue(2); e.preventDefault();});
    $("[id^=bt3p]").click(function(e) {yahtzee_setvalue(3); e.preventDefault();});
    $("[id^=bt4p]").click(function(e) {yahtzee_setvalue(4); e.preventDefault();});
    $("[id^=bt5p]").click(function(e) {yahtzee_setvalue(5); e.preventDefault();});

    $("[id^=bt7p]").click(function(e) {yahtzee_setvalue(7); e.preventDefault();});
    $("[id^=bt8p]").click(function(e) {yahtzee_setvalue(8); e.preventDefault();});
    $("[id^=bt9p]").click(function(e) {yahtzee_setvalue(9); e.preventDefault();});
    $("[id^=bt10p]").click(function(e) {yahtzee_setvalue(10); e.preventDefault();});
    $("[id^=bt11p]").click(function(e) {yahtzee_setvalue(11); e.preventDefault();});
    $("[id^=bt12p]").click(function(e) {yahtzee_setvalue(12); e.preventDefault();});
    $("[id^=bt13p]").click(function(e) {yahtzee_setvalue(13); e.preventDefault();});


    var myShakeEvent = new Shake({
        threshold: 8, // 15 - optional, shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });

    window.addEventListener('shake', shakeEventDidOccur, false);
    function shakeEventDidOccur () {
        if (in_yahtzee && rolling) {return;}
        $popupSwipe.popup('close');
        $popupLock.popup('close');
        $lbtotwert.hide();
        $lbtry.hide();
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
            $popupSwipe.popup("open");
            $dice.mousedown(function(e) {$(this).off('mousedown');$('#popupSwipe').popup('close');onDocumentMouseDown(e)});
            $dice.mouseup(function(e) {$(this).off('mouseup');onDocumentMouseUp(e)});
            pop_swipe_shown = true;
        }
    });

    $(document).on("pageshow","#popupYahtzee",function(){
        myShakeEvent.stop();
        in_dice=false;
        if (!pop_help_shown) {
            $helptit.html(navigator.mozL10n.get("lbhelp"));
            $helptxt.html("");
            $popupHelp.popup("open");
            pop_help_shown = true;
        }
    });

    if ( ! Detector.webgl ) {
        setTimeout(function() {$popupWebGL.popup("open");},500);
    } else {
        init();
    }

    content_formatting();
    setTimeout(function() {content_formatting();},500);

    function init() {
        $lbtotwert.hide();
        $lbtry.hide();
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
        addShadowedLight( 0.5, 1, -1, 0xffffff, 1 );
        addShadowedLight( -1, 1, 1, 0xffffff, 1.35 );

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

        window.addEventListener( 'resize', onWindowResize, false );
    }

    function addShadowedLight( x, y, z, color, intensity ) {

        var directionalLight = new THREE.DirectionalLight( color, intensity );
        directionalLight.position.set( x, y, z );
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
        if(in_dice){
            requestAnimationFrame( animate );
            render();
        }
    }

    function render() {
        var i, j;
        cur_speed = 0;
        for (i = 0; i < anz_dices; ++i) {
            mesh[i].rotation.y += ( targetRotationX[i] - mesh[i].rotation.y ) * 0.05;
            mesh[i].rotation.x += ( targetRotationY[i] - mesh[i].rotation.x ) * 0.05;
            mesh[i].rotation.z += ( targetRotationZ[i] - mesh[i].rotation.z ) * 0.05;
            cur_speed = Math.max(cur_speed, (Math.abs(mesh[i].rotation.y  - targetRotationX[i]) + Math.abs(mesh[i].rotation.x  - targetRotationY[i]) + Math.abs(mesh[i].rotation.z  - targetRotationZ[i])));
        }

        if (cur_speed < 0.02 && rolling)
        {
            rolling = false;
            totwert = 0;
            wert_count =  [0, 0, 0, 0, 0, 0];

            for ( j = 0; j < 2; j++) {
                for ( i = 0; i < anz_dices; ++i) {
                    rotX = ((Math.round((targetRotationY[i] % (Math.PI*2))/Math.PI*2))+4) % 4;
                    rotY = ((Math.round((targetRotationX[i] % (Math.PI*2))/Math.PI*2))+4) % 4;
                    rotZ = ((Math.round((targetRotationZ[i] % (Math.PI*2))/Math.PI*2))+4) % 4;
                    wert[i] = 0;
                    if (rotX == 0 && rotY == 0 ||
                        rotX == 2 && rotY == 2) {
                        wert[i]=1;
                    } else if (
                        rotX == 3              && rotZ == 1 ||
                        rotX == 1              && rotZ == 3 ||
                        rotX == 0 && rotY == 1 && rotZ == 0 ||
                        rotX == 2 && rotY == 3 && rotZ == 0 ||
                        rotX == 2 && rotY == 1 && rotZ == 2 ||
                        rotX == 0 && rotY == 3 && rotZ == 2) {
                        wert[i]=2;
                    } else if (
                        rotX == 3              && rotZ == 0 ||
                        rotX == 1              && rotZ == 2 ||
                        rotX == 0 && rotY == 1 && rotZ == 3 ||
                        rotX == 0 && rotY == 3 && rotZ == 1 ||
                        rotX == 2 && rotY == 1 && rotZ == 1 ||
                        rotX == 2 && rotY == 3 && rotZ == 3) {
                        wert[i]=3;
                    } else if (
                        rotX == 1              && rotZ == 0 ||
                        rotX == 3              && rotZ == 2 ||
                        rotX == 0 && rotY == 3 && rotZ == 3 ||
                        rotX == 2 && rotY == 1 && rotZ == 3 ||
                        rotX == 0 && rotY == 1 && rotZ == 1 ||
                        rotX == 2 && rotY == 3 && rotZ == 1) {
                        wert[i]=4;
                    } else if (
                        rotX == 3              && rotZ == 3 ||
                        rotX == 1              && rotZ == 1 ||
                        rotX == 0 && rotY == 3 && rotZ == 0 ||
                        rotX == 2 && rotY == 3 && rotZ == 2 ||
                        rotX == 0 && rotY == 1 && rotZ == 2 ||
                        rotX == 2 && rotY == 1 && rotZ == 0) {
                        wert[i]=5;
                    } else if (
                        rotX == 0 && rotY == 2 ||
                        rotX == 2 && rotY == 0) {
                        wert[i]=6;
                    }
                    //wert=wert + "\n" + "x: " + rotX + "  y: " + rotY + "  Z: " + rotZ;
                    //alert(wert);
                    totwert += wert[i];
                    wert_count[wert[i]-1] = wert_count[wert[i]-1] + 1;
                }
            }

            if (in_yahtzee) {
                if (!pop_lock_shown && cur_try ==1 && !in_lock) {
                    $popupLock.popup("open");
                    $dice.mousedown(function(e) {$(this).off('mousedown');$popupLock.popup('close');onDocumentMouseDown(e)});
                    $dice.mouseup(function(e) {$(this).off('mouseup');onDocumentMouseUp(e)});
                    pop_lock_shown = true;
                }
                if (!in_lock){ cur_try ++; } else { in_lock = false;}
                $lbtry.html(cur_try + " / 3");
                $lbtry.show();
                $lbtotwert.html(navigator.mozL10n.get("lbplayer") + " " + cur_player);
                if (cur_try > 3) { yahtzee_count(); }
            } else {
                $lbtotwert.html(totwert);
                var url_param = url_query('debug');
                if ( url_param ) {
                    var mystring ="";
                    for ( i = 0; i < anz_dices; ++i) {
                        rotX = ((Math.round((targetRotationY[i] % (Math.PI*2))/Math.PI*2))+4) % 4;
                        rotY = ((Math.round((targetRotationX[i] % (Math.PI*2))/Math.PI*2))+4) % 4;
                        rotZ = ((Math.round((targetRotationZ[i] % (Math.PI*2))/Math.PI*2))+4) % 4;
                        mystring = mystring + "" +rotX + " - " + rotY + " - " +rotZ + " : " + wert[i] + "<br>"
                    }
                    $lbtotwert.html(mystring);
                }
            }
            $lbtotwert.show();
        }
        renderer.render( scene, camera );
    }

    function yahtzee_count (){
        var i;
        var sequence = 0;
        for (i = 0; i < current_score.length; ++i) {
            current_score[i]=0;
        }
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
        for (i = 0; i < current_score.length; ++i) {
            if (player_score[cur_player-1][i] === null) {
                var $bt_p_ = $("#bt" + i + "p" + cur_player);
                $("#lb" + i + "p" + cur_player).css('display', 'none');
                $bt_p_.css('display', 'block');
                var $bt_p_ui_btn_text = $("#bt" + i + "p" + cur_player + " .ui-btn-text");
                if ($bt_p_ui_btn_text.length) {
                    $bt_p_ui_btn_text.text(current_score[i]);
                } else {
                    $bt_p_.html(current_score[i]);
                }
            }
        }
        $div_close_list.hide();
        $.mobile.changePage('#popupYahtzee', {transition: 'pop' , role: 'dialog'});
    }

    function yahtzee_setvalue ( id ) {
        var empty = false;
        player_score[cur_player-1][id] = current_score[id];
        $("#lb" + id + "p" + cur_player).html(current_score[id]);

        totwert = 0;
        for (var i = 0; i < current_score.length; ++i) {
            $("#bt" + i + "p" + cur_player).css('display', 'none');
            $("#lb" + i + "p" + cur_player).css('display', 'inline');
            totwert += player_score[cur_player-1][i];
            if (i == 5) {
                $("#lbsum1p" + cur_player).html(totwert);
                if (totwert >= 63) {
                    $("#lbbonusp" + cur_player).html(35);
                    totwert += 35;
                }
                upperwert = totwert;
                $("#lbsum2p" + cur_player).html(totwert);
            }
        }
        $("#lbsum3p" + cur_player).html(totwert - upperwert);
        $("#lbsum4p" + cur_player).html(totwert);
        total_score[cur_player - 1] = totwert;
        $div_close_list.show();

        for (i = 0; i < current_score.length; ++i) {
            if (player_score[cur_player - 1][i] === null && i != 6) {
                empty = true;
            }
        }

        if (!empty && cur_player == anz_player) {
            i = total_score.indexOf(Math.max.apply(Math, total_score));
            $helptit.html(navigator.mozL10n.get("lbplayer") + " " + (i + 1) + " " + navigator.mozL10n.get("lbwin"));
            $helptxt.html(navigator.mozL10n.get("lbwith") + " " + total_score[i] + " " + navigator.mozL10n.get("lbpts"));
            $popupHelp.popup("open");
            game_over = true;
        } else {
            cur_player ++;
            if (cur_player > anz_player) { cur_player = 1; }
            cur_try = 1;
            $lbtry.html(cur_try + " / 3");
            $lbtotwert.html(navigator.mozL10n.get("lbplayer") + " " + cur_player);
            unlock_dice();
            close_list();
        }
    }

    function yahtzee_init () {
        var i,j;
        for (i = 0; i < current_score.length; ++i) {
            current_score[i] = 0;
            for (j = 0; j < 5; ++j) {
                player_score[j][i] = null;
                $("#bt" + i + "p" + (j + 1)).css('display', 'none');
                var $lb_p_ = $("#lb" + i + "p" + (j + 1));
                $lb_p_.css('display', 'inline');
                $lb_p_.html("");
            }
        }
        for (j = 0; j < 5; ++j) {
            if (j < anz_player) {
                //$("#imgp" + (j + 1)).css({ opacity: 1 });
                $("#imgp" + (j + 1)).attr("style","width:100%;background-color: #CC002F;");
                $("#lbsum1p" + (j + 1)).html(0);
                $("#lbsum2p" + (j + 1)).html(0);
                $("#lbsum3p" + (j + 1)).html(0);
                $("#lbsum4p" + (j + 1)).html(0);
            } else {
                //$("#imgp" + (j + 1)).css({ opacity: 0.6 });
                $("#imgp" + (j + 1)).attr("style","width:100%;background-color: #AAAAAA;");
                $("#lbsum1p" + (j + 1)).html("");
                $("#lbsum2p" + (j + 1)).html("");
                $("#lbsum3p" + (j + 1)).html("");
                $("#lbsum4p" + (j + 1)).html("");
            }
            $("#lbbonusp" + (j + 1)).html("");
            total_score[j] = 0;
        }

        cur_player = 1;
        cur_try = 1;
        unlock_dice();

        $lbtotwert.html(navigator.mozL10n.get("lbplayer") + " " + cur_player);
        $lbtry.html(cur_try + " / 3");
        $lbtotwert.show();
        $lbtry.show();
    }

    function onDocumentMouseDown( event ) {
        $lbtotwert.hide();
        $lbtry.hide();
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
        if (in_yahtzee && rolling) {return;}
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

        container.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        container.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        container.removeEventListener( 'mouseout', onDocumentMouseOut, false );

        if (in_yahtzee && rolling) {return;}

        if (Math.abs(mouseX - mouseXOnMouseDown) < 5 && Math.abs(mouseY - mouseYOnMouseDown) < 5 && in_yahtzee)
        {
            in_lock = true;
            if (new Date() - timeOnMouseDown < 300) {
                lock_dice();
            }
        }

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
        timeOnMouseDown = new Date();
        in_move = false;
        if ( event.touches.length === 1 ) {
            event.preventDefault();
            $lbtotwert.hide();
            $lbtry.hide();
            mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
            mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
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
    }

    function onDocumentTouchMove( event ) {
        in_move = true;
        if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
            if (in_yahtzee && rolling) {return;}
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
        event.preventDefault();
        if (in_yahtzee && rolling) {return;}
        if (in_move == false && in_yahtzee)
        {
            in_lock = true;
            if (new Date() - timeOnMouseDown < 500) {
                mouseX = mouseXOnMouseDown;
                mouseY = mouseYOnMouseDown;
                lock_dice();
            }
        }
        for (var i = 0; i < anz_dices; ++i) {
            if (!locked[i]) {
                targetRotationX[i]=Math.round((targetRotationX[i])/Math.PI*2)*Math.PI/2;
                targetRotationY[i]=Math.round((targetRotationY[i])/Math.PI*2)*Math.PI/2;
                targetRotationZ[i]=Math.round((targetRotationZ[i])/Math.PI*2)*Math.PI/2;
            }
        }
        rolling = true;
    }

    function lock_dice () {
        var i;
        for (i = 0; i < anz_dices; ++i) {
            if (!locked[i]) {
                targetRotationX[i] = targetRotationXOnMouseDown[i];
                targetRotationY[i] = targetRotationYOnMouseDown[i];
                targetRotationZ[i] = targetRotationZOnMouseDown[i];
            }
        }
        if (cur_try == 1){ return; }
        if (rolling){ return; }
        if (g_windowsheight > g_windowswidth) {
            if (mouseX < 0 && mouseY > g_windowsheight/15) {
                locked[4] = !locked[4];
                $('#imglock4').toggle();
                //mesh[4].material.color.setHex(0x00BB33);
            }
            if (mouseX > 0 && mouseY > g_windowsheight/15) {
                locked[1] = !locked[1];
                $('#imglock1').toggle();
            }
            if (mouseX > g_windowsheight/(-15) && mouseX < g_windowsheight/15 && mouseY > g_windowsheight/(-15) && mouseY < g_windowsheight/15) {
                locked[2] = !locked[2];
                $('#imglock2').toggle();
            }
            if (mouseX < 0 && mouseY < g_windowsheight/(-15)) {
                locked[3] = !locked[3];
                $('#imglock3').toggle();
            }
            if (mouseX > 0 && mouseY < g_windowsheight/(-15)) {
                locked[0] = !locked[0];
                $('#imglock0').toggle();
            }

        } else {
            if (mouseY < 0 && mouseX > g_windowsheight/15) {
                locked[0] = !locked[0];
                $('#imglock0').toggle();
            }
            if (mouseY > 0 && mouseX > g_windowsheight/15) {
                locked[1] = !locked[1];
                $('#imglock1').toggle();
            }
            if (mouseY > g_windowsheight/(-15) && mouseY < g_windowsheight/15 && mouseX > g_windowsheight/(-15) && mouseX < g_windowsheight/15) {
                locked[2] = !locked[2];
                $('#imglock2').toggle();
            }
            if (mouseY < 0 && mouseX < g_windowsheight/(-15)) {
                locked[3] = !locked[3];
                $('#imglock3').toggle();
            }
            if (mouseY > 0 && mouseX < g_windowsheight/(-15)) {
                locked[4] = !locked[4];
                $('#imglock4').toggle();
            }
        }
        for (i = 0; i < anz_dices; ++i) {
            if (!locked[i]) { break; }
            if (i == anz_dices - 1) { yahtzee_count(); }
        }
    }

    function content_formatting() {
        g_windowsheight = $(window).height();
        g_windowswidth = $(window).width();
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        if (g_windowsheight > g_windowswidth) {
            lock_height = g_windowsheight / 7;
            $imglock3.attr("style","position:absolute; top:" + (windowHalfY - lock_height*2.4) + "px; left:" + (windowHalfX - lock_height*1.4) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock3').css('display'));
            $imglock0.attr("style","position:absolute; top:" + (windowHalfY - lock_height*2.4) + "px; left:" + (windowHalfX + lock_height*0.4) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock0').css('display'));
            $imglock2.attr("style","position:absolute; top:" + (windowHalfY - lock_height/2) + "px; left:" + (windowHalfX - lock_height/2) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock2').css('display'));
            $imglock4.attr("style","position:absolute; top:" + (windowHalfY + lock_height*1.3) + "px; left:" + (windowHalfX - lock_height*1.4) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock4').css('display'));
            $imglock1.attr("style","position:absolute; top:" + (windowHalfY + lock_height*1.3) + "px; left:" + (windowHalfX + lock_height*0.4) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock1').css('display'));
            $("#img_title").attr("style","width:100%;margin-top:-10px;");
            $("#img_title2").attr("style","width:100%;margin-top:-20px;");
            $("#img_title3h").show();
            $("#img_title3q").hide();
            $btdiceyahtzee.css({"width":"100%","position":"absolute","bottom":"0","margin-bottom":"16px"});
            $btdice.css({"width":(g_windowswidth/2-16) + "px","height":""});
            $btyahtzee.css({"width":(g_windowswidth/2-16) + "px","height":""});
            $("#btdice_pad").attr("style","");
            $("#btyahtzee_pad").attr("style","");
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
            lock_height = g_windowsheight / 6;
            $imglock3.attr("style","position:absolute; top:" + (windowHalfY - lock_height*1.7) + "px; left:" + (windowHalfX - lock_height*2.8) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock3').css('display'));
            $imglock0.attr("style","position:absolute; top:" + (windowHalfY - lock_height*1.7) + "px; left:" + (windowHalfX + lock_height*1.8) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock0').css('display'));
            $imglock2.attr("style","position:absolute; top:" + (windowHalfY - lock_height/2) + "px; left:" + (windowHalfX - lock_height/2) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock2').css('display'));
            $imglock4.attr("style","position:absolute; top:" + (windowHalfY + lock_height*0.6) + "px; left:" + (windowHalfX - lock_height*2.8) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock4').css('display'));
            $imglock1.attr("style","position:absolute; top:" + (windowHalfY + lock_height*0.6) + "px; left:" + (windowHalfX + lock_height*1.8) + "px; pointer-events:none; width:" + lock_height + "px; height:" + lock_height + "px; display:" + $('#imglock1').css('display'));
            $("#img_title").attr("style","width:calc(46% - 15px);margin-bottom:20px;");
            $("#img_title2").attr("style","width:calc(31% - 10px);margin-top:0px;margin-bottom:20px;margin-left:20px;");
            $("#img_title3h").hide();
            $("#img_title3q").show();
            $btdiceyahtzee.css({"width":"100%","position":"absolute","margin-bottom": ((g_windowsheight - g_windowswidth * 0.2 - 100)/3.5) + "px","bottom":"0"});
            $btdice.css({"width":(g_windowswidth/2-16) + "px","height":Math.max(((g_windowsheight - g_windowswidth * 0.2 - 100)/2),40) + "px"});
            $btyahtzee.css({"width":(g_windowswidth/2-16) + "px","height": Math.max(((g_windowsheight - g_windowswidth * 0.2 - 100)/2),40) + "px"});
            $("#btdice_pad").attr("style","padding-top:" + Math.max(((g_windowsheight - g_windowswidth * 0.2 - 200)/4),0) + "px;");
            $("#btyahtzee_pad").attr("style","padding-top:" + Math.max(((g_windowsheight - g_windowswidth * 0.2 - 200)/4),0) + "px;");
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
        $popupSwipe.css('max-width', (g_windowswidth - 10) + 'px');
        $popupLock.css('max-width', (g_windowswidth - 10) + 'px');
        $popupWebGL.css('max-width', (g_windowswidth - 10) + 'px');
        $popupHelp.css('max-width', (g_windowswidth - 40) + 'px');
        $('#start').css('width', (g_windowswidth - 30) + 'px');

        for (var i = 1; i < 6; ++i) {
            $("#radio"+i).attr("style","width:" + (g_windowswidth-50)/5.3 + "px;max-width:92px;"+"height:" + (g_windowswidth-50)/5.3 + "px;max-height:92px;");
            $("#img_color"+i).css({'max-width': '80px', 'width': + (g_windowswidth-90)/5.5 +'px'});
            $("#imganzahl"+i).css({'max-width': '9179px', 'width': + (g_windowswidth-70)/5.1 +'px','margin':'-5px -5px -5px -15px'});
        }
    }

    $(window).resize( function() {
        content_formatting();
        setTimeout(function() {content_formatting();},500);
    });

    function set_number(yahtzee){
        in_yahtzee = yahtzee;
        if (in_yahtzee) {
            $lbanz.html(navigator.mozL10n.get("lbanzpl"));
        } else {
            $lbanz.html(navigator.mozL10n.get("lbanz"));
        }
        $('#btdiceyahtzee').slideToggle();
        setTimeout(function() {$('#grpanzahl').slideToggle();},500);
    }

    function display_dice(anzahl){
        var $input_radio_color_checked = $('input:radio[name=color]:checked');
        in_dice=true;
        if (in_yahtzee) {
            anz_player = anzahl;
            anzahl_dice(5);
            $('input:radio[name=anzahl]').filter('[value=5]').prop('checked', true);
            close_settings();
            yahtzee_init();
            $bt_list.show();
        } else {
            anzahl_dice(anzahl);
            $lbtotwert.hide();
            $lbtry.hide();
            $bt_list.hide();
            unlock_dice();
        }
        myShakeEvent.start();
        animate();
        $.mobile.changePage('#dice', {transition: 'slide'});
        mesh[0].material.color.setHex($input_radio_color_checked.val());
        mesh[0].material.ambient.setHex($input_radio_color_checked.val());
    }

    function anzahl_dice (anzahl) {
        if (anzahl > anz_dices) {
            for (i = anz_dices; i < anzahl; ++i) {
                if (typeof mesh[i] == "undefined" || mesh[i] == null) {
                    clone_dice(i);
                }
                scene.add( mesh[i] );
            }
        }
        if (anz_dices > anzahl) {
            for (i = anzahl; i < anz_dices; ++i) {
                scene.remove(mesh[i]);
            }
        }
        anz_dices = anzahl;
        content_formatting();
    }

    function quit_dice(){
        myShakeEvent.stop();
        in_dice=false;
        $lbtotwert.hide();
        $lbtry.hide();
        $('#btdiceyahtzee').show();
        $('#grpanzahl').hide();
        unlock_dice();
        $.mobile.changePage('#title', {transition: 'slide', reverse: true});
        for (i = 0; i < anz_dices; ++i) {
            mesh[i].rotation.y = targetRotationX[i];
            mesh[i].rotation.x = targetRotationY[i];
            mesh[i].rotation.z = targetRotationZ[i];
        }
        rolling = false;
    }

    function unlock_dice() {
        var i;
        for (i = 0; i < 5; ++i) {
            locked[i] = false;
            $('#imglock' + i).hide();
        }
    }

    function close_settings() {
        content_formatting();
        $.mobile.changePage('#title', {transition: 'pop', reverse: true});
    }

    function close_list() {
        myShakeEvent.start();
        in_dice=true;
        animate();
        if (game_over) {
            game_over = false;
            quit_dice();
        } else {
            $.mobile.changePage('#dice', {transition: 'pop', reverse: true});
        }
    }

    function clone_dice(i) {
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

    function show_help (i) {
        $helptit.html(navigator.mozL10n.get(i));
        $helptxt.html(navigator.mozL10n.get(i+"txt"));
        $popupHelp.popup("open");
    }

    navigator.mozL10n.ready( function() {
        // Example usage - http://homepage.hispeed.ch/grrds_games/Dice/?lang=en
        var url_param = url_query('lang');
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
}());

