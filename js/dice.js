/*
 * grrd's Dice
 * Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
 * Licensed under the MPL License
 */

/*jslint browser:true, for:true, devel: true, this: true */ /*global  $, window, THREE, Shake, Detector*/

(function () {
    "use strict";
    var langReady = false;
    var container;
    var mesh = [];
    var camera;
    var scene;
    var renderer;

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
    var diceVal = [0, 0, 0, 0, 0];
    var locked = [false, false, false, false, false];
    var countVal = [0, 0, 0, 0, 0, 0];
    var currentScore = [];
    var playerScore = [];
    var ii;
    for (ii = 0; ii < 5; ii += 1) {
        playerScore[ii] = [];
    }
    var totalScore = [0, 0, 0, 0, 0];

    var totVal;
    var upperVal;
    var inDice = false;
    var anzDices = 1;
    var inYahtzee = true;
    var inLock = false;
    var inMove = false;
    var anzPlayer = 2;
    var curPlayer = 1;
    var curTry = 1;
    var curSpeed;
    var popSwipeShown = false;
    var popLockShown = false;
    var popHelpShown = false;
    var gameOver = false;
    var lockHeight;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var gWindowsHeight;
    var gWindowsWidth;

    var $lbAnz = $("#lb_anz");
    var $lbTry = $("#lb_try");
    var $bt_list = $("#bt_list");
    var $lbTotVal = $("#lb_tot_val");
    var $imgLock0 = $("#img_lock0");
    var $imgLock1 = $("#img_lock1");
    var $imgLock2 = $("#img_lock2");
    var $imgLock3 = $("#img_lock3");
    var $imgLock4 = $("#img_lock4");
    var $div_close_list = $("#div_close_list");
    var $btDiceYahtzee = $("#bt_dice_yahtzee");
    var $btDice = $("#bt_dice");
    var $dice = $("#dice");
    var $btYahtzee = $("#bt_yahtzee");
    var $popupSwipe = $("#popup_swipe");
    var $popupLock = $("#popup_lock");
    var $popupWebGL = $("#popup_web_gl");
    var $popupHelp = $("#popup_help");
    var $helpTit = $("#help_tit");
    var $helpTxt = $("#help_txt");

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("sw.js").then(function (registration) {
                console.log("ServiceWorker registration successful with scope: ", registration.scope);
            }, function (err) {
                console.log("ServiceWorker registration failed: ", err);
            });
        });
    }

    function urlQuery(query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var expr = "[\\?&]" + query + "=([^&#]*)";
        var regex = new RegExp(expr);
        var results = regex.exec(window.location.href);
        if (results !== null) {
            return results[1];
        } else {
            return false;
        }
    }

    $bt_list.click(function (e) {
        $.mobile.changePage("#popup_yahtzee", {transition: "pop", role: "dialog"});
        e.preventDefault();
    });
    $("#popup_yahtzee").mousedown(function () {
        $popupHelp.popup("close");
    });

    var myShakeEvent = new Shake({
        threshold: 8, // 15 - optional, shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });

    function shakeEventDidOccur() {
        var i;
        if (inYahtzee && rolling) {
            return;
        }
        $popupSwipe.popup("close");
        $popupLock.popup("close");
        $lbTotVal.hide();
        $lbTry.hide();
        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                targetRotationX[i] = Math.round((targetRotationX[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
                targetRotationY[i] = Math.round((targetRotationY[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
                targetRotationZ[i] = Math.round((targetRotationZ[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
            }
        }
        rolling = true;
    }

    window.addEventListener("shake", shakeEventDidOccur, false);

    function contentFormatting() {
        var i;
        var w16;
        gWindowsHeight = $(window).height();
        gWindowsWidth = $(window).width();
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        if (gWindowsHeight > gWindowsWidth) {
            lockHeight = gWindowsHeight / 7;
            $imgLock3.attr("style", "position:absolute; top:" + (windowHalfY - lockHeight * 2.4) + "px; left:" + (windowHalfX - lockHeight * 1.4) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock3").css("display"));
            $imgLock0.attr("style", "position:absolute; top:" + (windowHalfY - lockHeight * 2.4) + "px; left:" + (windowHalfX + lockHeight * 0.4) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock0").css("display"));
            $imgLock2.attr("style", "position:absolute; top:" + (windowHalfY - lockHeight / 2) + "px; left:" + (windowHalfX - lockHeight / 2) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock2").css("display"));
            $imgLock4.attr("style", "position:absolute; top:" + (windowHalfY + lockHeight * 1.3) + "px; left:" + (windowHalfX - lockHeight * 1.4) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock4").css("display"));
            $imgLock1.attr("style", "position:absolute; top:" + (windowHalfY + lockHeight * 1.3) + "px; left:" + (windowHalfX + lockHeight * 0.4) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock1").css("display"));
            $("#img_title").attr("style", "width:100%;margin-top:-10px;");
            $("#img_title2").attr("style", "width:100%;margin-top:-20px;");
            $("#img_title3h").show();
            $("#img_title3q").hide();
            $btDiceYahtzee.css({width: "100%", position: "absolute", bottom: "0", "margin-bottom": "16px"});
            $btDice.css({width: (gWindowsWidth / 2 - 16) + "px", height: ""});
            $btYahtzee.css({width: (gWindowsWidth / 2 - 16) + "px", height: ""});
            $("#bt_dice_pad").attr("style", "");
            $("#bt_yahtzee_pad").attr("style", "");
            if (mesh[0] !== undefined && mesh[0] !== null) {
                switch (anzDices) {
                case 1:
                    mesh[0].position.set(0, 0, 0);
                    camera.position.set(0, 0, 2.2);
                    break;
                case 2:
                    mesh[0].position.set(0, 0.45, 0);
                    mesh[1].position.set(0, -0.45, 0);
                    camera.position.set(0, 0, 3);
                    break;
                case 3:
                    mesh[0].position.set(0, 0.9, 0);
                    mesh[1].position.set(0, 0, 0);
                    mesh[2].position.set(0, -0.9, 0);
                    camera.position.set(0, 0, 4.2);
                    break;
                case 4:
                    mesh[0].position.set(0.45, 0.45, 0);
                    mesh[1].position.set(-0.45, 0.45, 0);
                    mesh[2].position.set(0.45, -0.45, 0);
                    mesh[3].position.set(-0.45, -0.45, 0);
                    camera.position.set(0, 0, 4.2);
                    break;
                case 5:
                    mesh[0].position.set(0.45, 0.9, 0);
                    mesh[1].position.set(0.45, -0.9, 0);
                    mesh[2].position.set(0, 0, 0);
                    mesh[3].position.set(-0.45, 0.9, 0);
                    mesh[4].position.set(-0.45, -0.9, 0);
                    camera.position.set(0, 0, 5.6);
                    break;
                }
            }
        } else {
            lockHeight = gWindowsHeight / 6;
            $imgLock3.attr("style", "position:absolute; top:" + (windowHalfY - lockHeight * 1.7) + "px; left:" + (windowHalfX - lockHeight * 2.8) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock3").css("display"));
            $imgLock0.attr("style", "position:absolute; top:" + (windowHalfY - lockHeight * 1.7) + "px; left:" + (windowHalfX + lockHeight * 1.8) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock0").css("display"));
            $imgLock2.attr("style", "position:absolute; top:" + (windowHalfY - lockHeight / 2) + "px; left:" + (windowHalfX - lockHeight / 2) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock2").css("display"));
            $imgLock4.attr("style", "position:absolute; top:" + (windowHalfY + lockHeight * 0.6) + "px; left:" + (windowHalfX - lockHeight * 2.8) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock4").css("display"));
            $imgLock1.attr("style", "position:absolute; top:" + (windowHalfY + lockHeight * 0.6) + "px; left:" + (windowHalfX + lockHeight * 1.8) + "px; pointer-events:none; width:" + lockHeight + "px; height:" + lockHeight + "px; display:" + $("#img_lock1").css("display"));
            $("#img_title").attr("style", "width:calc(46% - 15px);margin-bottom:20px;");
            $("#img_title2").attr("style", "width:calc(31% - 10px);margin-top:0px;margin-bottom:20px;margin-left:20px;");
            $("#img_title3h").hide();
            $("#img_title3q").show();
            $btDiceYahtzee.css({width: "100%", position: "absolute", "margin-bottom": ((gWindowsHeight - gWindowsWidth * 0.2 - 100) / 3.5) + "px", bottom: "0"});
            $btDice.css({width: (gWindowsWidth / 2 - 16) + "px", height: Math.max(((gWindowsHeight - gWindowsWidth * 0.2 - 100) / 2), 40) + "px"});
            $btYahtzee.css({width: (gWindowsWidth / 2 - 16) + "px", height: Math.max(((gWindowsHeight - gWindowsWidth * 0.2 - 100) / 2), 40) + "px"});
            $("#bt_dice_pad").attr("style", "padding-top:" + Math.max(((gWindowsHeight - gWindowsWidth * 0.2 - 200) / 4), 0) + "px;");
            $("#bt_yahtzee_pad").attr("style", "padding-top:" + Math.max(((gWindowsHeight - gWindowsWidth * 0.2 - 200) / 4), 0) + "px;");
            if (mesh[0] !== undefined && mesh[0] !== null) {
                switch (anzDices) {
                case 1:
                    mesh[0].position.set(0, 0, 0);
                    camera.position.set(0, 0, 1.8);
                    break;
                case 2:
                    mesh[0].position.set(0.45, 0, 0);
                    mesh[1].position.set(-0.45, 0, 0);
                    camera.position.set(0, 0, 2.2);
                    break;
                case 3:
                    mesh[0].position.set(0.9, 0, 0);
                    mesh[1].position.set(0, 0, 0);
                    mesh[2].position.set(-0.9, 0, 0);
                    camera.position.set(0, 0, 3);
                    break;
                case 4:
                    mesh[0].position.set(0.45, 0.45, 0);
                    mesh[1].position.set(-0.45, 0.45, 0);
                    mesh[2].position.set(0.45, -0.45, 0);
                    mesh[3].position.set(-0.45, -0.45, 0);
                    camera.position.set(0, 0, 3);
                    break;
                case 5:
                    mesh[0].position.set(0.9, 0.45, 0);
                    mesh[1].position.set(0.9, -0.45, 0);
                    mesh[2].position.set(0, 0, 0);
                    mesh[3].position.set(-0.9, 0.45, 0);
                    mesh[4].position.set(-0.9, -0.45, 0);
                    camera.position.set(0, 0, 4);
                    break;
                }
            }
        }
        $popupSwipe.css("max-width", (gWindowsWidth - 10) + "px");
        $popupLock.css("max-width", (gWindowsWidth - 10) + "px");
        $popupWebGL.css("max-width", (gWindowsWidth - 10) + "px");
        $popupHelp.css("max-width", (gWindowsWidth - 40) + "px");
        $("#start").css("width", (gWindowsWidth - 30) + "px");

        for (i = 1; i < 6; i += 1) {
            $("#radio" + i).attr("style", "width:" + (gWindowsWidth - 50) / 5.3 + "px; max-width: 92px;" + "height:" + (gWindowsWidth - 50) / 5.3 + "px; max-height: 92px;");
            $("#img_color" + i).css({"max-width": "80px", width: (gWindowsWidth - 90) / 5.5 + "px"});
            $("#img_anz" + i).width((gWindowsWidth - 10) / 5 + "px");
        }
        w16 = $(".w16");
        w16.width(Math.min((gWindowsWidth - 40) / 6.2, 80) + "px");
        w16.height(Math.min((gWindowsWidth - 40) / 6.2, 80) + "px");
        setTimeout(function () {
            w16.width(Math.min((gWindowsWidth - 40) / 6.2, 80) + "px");
            w16.height(Math.min((gWindowsWidth - 40) / 6.2, 80) + "px");
        }, 500);
    }

    function onDocumentMouseMove(event) {
        var i;
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        if (inYahtzee && rolling) {
            return;
        }
        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                targetRotationX[i] = targetRotationXOnMouseDown[i] + ((mouseX - mouseXOnMouseDown) * 0.08) * randX[i];
                targetRotationY[i] = targetRotationYOnMouseDown[i] + ((mouseY - mouseYOnMouseDown) * 0.08) * randY[i];
                targetRotationZ[i] = targetRotationZOnMouseDown[i] + (((mouseX - mouseXOnMouseDown) * 0.08) * randZ[i] + ((mouseY - mouseYOnMouseDown) * 0.08) * randZ[i]) / 2;
            }
        }
    }

    function yahtzeeCount() {
        var i;
        var j;
        var $bt_p_;
        var $bt_p_ui_btn_text;
        var sequence = 0;
        for (i = 0; i < currentScore.length; i += 1) {
            currentScore[i] = 0;
        }
        for (i = 0; i < countVal.length; i += 1) {
            currentScore[i] = countVal[i] * (i + 1);
            if (countVal[i] >= 3) {
                currentScore[7] = 3 * (i + 1);
            }
            if (countVal[i] >= 4) {
                currentScore[8] = 4 * (i + 1);
            }
            if (countVal[i] >= 5) {
                currentScore[12] = 50;
            }
            if (countVal[i] >= 5) {
                currentScore[9] = 25;
            }
            if (countVal[i] === 3) {
                for (j = 0; j < countVal.length; j += 1) {
                    if (countVal[j] === 2) {
                        currentScore[9] = 25;
                    }
                }
            }
            if (countVal[i] >= 1) {
                sequence += 1;
            } else {
                sequence = 0;
            }
            if (sequence >= 4) {
                currentScore[10] = 30;
            }
            if (sequence >= 5) {
                currentScore[11] = 40;
            }
        }
        currentScore[13] = totVal;
        for (i = 0; i < currentScore.length; i += 1) {
            if (playerScore[curPlayer - 1][i] === null) {
                $bt_p_ = $("#bt_" + i + "p" + curPlayer);
                $("#lb_" + i + "p" + curPlayer).css("display", "none");
                $bt_p_.css("display", "block");
                $bt_p_ui_btn_text = $("#bt_" + i + "p" + curPlayer + " .ui-btn-text");
                if ($bt_p_ui_btn_text.length) {
                    $bt_p_ui_btn_text.text(currentScore[i]);
                } else {
                    $bt_p_.html(currentScore[i]);
                }
            }
        }
        $div_close_list.hide();
        $.mobile.changePage("#popup_yahtzee", {transition: "pop", role: "dialog"});
    }

    function lockDice() {
        var i;
        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                targetRotationX[i] = targetRotationXOnMouseDown[i];
                targetRotationY[i] = targetRotationYOnMouseDown[i];
                targetRotationZ[i] = targetRotationZOnMouseDown[i];
            }
        }
        if (curTry === 1) {
            return;
        }
        if (rolling) {
            return;
        }
        if (gWindowsHeight > gWindowsWidth) {
            if (mouseX < 0 && mouseY > gWindowsHeight / 15) {
                locked[4] = !locked[4];
                $("#img_lock4").toggle();
                //mesh[4].material.color.setHex(0x00BB33);
            }
            if (mouseX > 0 && mouseY > gWindowsHeight / 15) {
                locked[1] = !locked[1];
                $("#img_lock1").toggle();
            }
            if (mouseX > gWindowsHeight / (-15) && mouseX < gWindowsHeight / 15 && mouseY > gWindowsHeight / (-15) && mouseY < gWindowsHeight / 15) {
                locked[2] = !locked[2];
                $("#img_lock2").toggle();
            }
            if (mouseX < 0 && mouseY < gWindowsHeight / (-15)) {
                locked[3] = !locked[3];
                $("#img_lock3").toggle();
            }
            if (mouseX > 0 && mouseY < gWindowsHeight / (-15)) {
                locked[0] = !locked[0];
                $("#img_lock0").toggle();
            }

        } else {
            if (mouseY < 0 && mouseX > gWindowsHeight / 15) {
                locked[0] = !locked[0];
                $("#img_lock0").toggle();
            }
            if (mouseY > 0 && mouseX > gWindowsHeight / 15) {
                locked[1] = !locked[1];
                $("#img_lock1").toggle();
            }
            if (mouseY > gWindowsHeight / (-15) && mouseY < gWindowsHeight / 15 && mouseX > gWindowsHeight / (-15) && mouseX < gWindowsHeight / 15) {
                locked[2] = !locked[2];
                $("#img_lock2").toggle();
            }
            if (mouseY < 0 && mouseX < gWindowsHeight / (-15)) {
                locked[3] = !locked[3];
                $("#img_lock3").toggle();
            }
            if (mouseY > 0 && mouseX < gWindowsHeight / (-15)) {
                locked[4] = !locked[4];
                $("#img_lock4").toggle();
            }
        }
        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                break;
            }
            if (i === anzDices - 1) {
                yahtzeeCount();
            }
        }
    }

    function unlockDice() {
        var i;
        for (i = 0; i < 5; i += 1) {
            locked[i] = false;
            $("#img_lock" + i).hide();
        }
    }

    function mouseOutMouseUp(event) {
        var i;
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        container.removeEventListener("mousemove", onDocumentMouseMove, false);
        container.removeEventListener("mouseup", onDocumentMouseUp, false);
        container.removeEventListener("mouseout", onDocumentMouseOut, false);

        if (inYahtzee && rolling) {
            return;
        }

        if (Math.abs(mouseX - mouseXOnMouseDown) < 5 && Math.abs(mouseY - mouseYOnMouseDown) < 5 && inYahtzee) {
            inLock = true;
            if (new Date() - timeOnMouseDown < 300) {
                lockDice();
            }
        }

        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                targetRotationX[i] = Math.round((targetRotationX[i]) / Math.PI * 2) * Math.PI / 2;
                targetRotationY[i] = Math.round((targetRotationY[i]) / Math.PI * 2) * Math.PI / 2;
                targetRotationZ[i] = Math.round((targetRotationZ[i]) / Math.PI * 2) * Math.PI / 2;
            }
        }
        rolling = true;
    }

    function onDocumentMouseUp(event) {
        mouseOutMouseUp(event);
    }

    function onDocumentMouseOut(event) {
        mouseOutMouseUp(event);
    }

    function onDocumentMouseDown(event) {
        var i;
        $lbTotVal.hide();
        $lbTry.hide();
        event.preventDefault();
        container.addEventListener("mousemove", onDocumentMouseMove, false);
        container.addEventListener("mouseup", onDocumentMouseUp, false);
        container.addEventListener("mouseout", onDocumentMouseOut, false);
        mouseXOnMouseDown = event.clientX - windowHalfX;
        mouseYOnMouseDown = event.clientY - windowHalfY;
        timeOnMouseDown = new Date();
        for (i = 0; i < anzDices; i += 1) {
            targetRotationXOnMouseDown[i] = targetRotationX[i];
            targetRotationYOnMouseDown[i] = targetRotationY[i];
            targetRotationZOnMouseDown[i] = targetRotationZ[i];
            if (i > 0) {
                randX[i] = Math.random() + 0.5;
                randY[i] = Math.random() + 0.5;
                randZ[i] = Math.random() + 0.5;
            }
        }
    }

    function onDocumentTouchEnd(event) {
        var i;
        event.preventDefault();
        if (inYahtzee && rolling) {
            return;
        }
        if (inMove === false && inYahtzee) {
            inLock = true;
            if (new Date() - timeOnMouseDown < 500) {
                mouseX = mouseXOnMouseDown;
                mouseY = mouseYOnMouseDown;
                lockDice();
            }
        }
        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                targetRotationX[i] = Math.round((targetRotationX[i]) / Math.PI * 2) * Math.PI / 2;
                targetRotationY[i] = Math.round((targetRotationY[i]) / Math.PI * 2) * Math.PI / 2;
                targetRotationZ[i] = Math.round((targetRotationZ[i]) / Math.PI * 2) * Math.PI / 2;
            }
        }
        rolling = true;
    }

    function onDocumentTouchMove(event) {
        var i;
        inMove = true;
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
            if (inYahtzee && rolling) {
                return;
            }
            for (i = 0; i < anzDices; i += 1) {
                if (!locked[i]) {
                    targetRotationX[i] = targetRotationXOnMouseDown[i] + ((mouseX - mouseXOnMouseDown) * 0.06) * randX[i];
                    targetRotationY[i] = targetRotationYOnMouseDown[i] + ((mouseY - mouseYOnMouseDown) * 0.06) * randY[i];
                    targetRotationZ[i] = targetRotationZOnMouseDown[i] + (((mouseX - mouseXOnMouseDown) * 0.06) * randZ[i] + ((mouseY - mouseYOnMouseDown) * 0.02) * randZ[i]) / 2;
                }
            }
        }
    }

    function onDocumentTouchStart(event) {
        var i;
        timeOnMouseDown = new Date();
        inMove = false;
        if (event.touches.length === 1) {
            event.preventDefault();
            $lbTotVal.hide();
            $lbTry.hide();
            mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
            mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
            timeOnMouseDown = new Date();
            for (i = 0; i < anzDices; i += 1) {
                targetRotationXOnMouseDown[i] = targetRotationX[i];
                targetRotationYOnMouseDown[i] = targetRotationY[i];
                targetRotationZOnMouseDown[i] = targetRotationZ[i];
                if (i > 0) {
                    randX[i] = Math.random() + 0.5;
                    randY[i] = Math.random() + 0.5;
                    randZ[i] = Math.random() + 0.5;
                }
            }
        }
    }

    $(document).on("pageshow", "#dice", function () {
        if (!popSwipeShown) {
            $popupSwipe.popup("open");
            $dice.mousedown(function (e) {
                $(this).off("mousedown");
                $popupSwipe.popup("close");
                onDocumentMouseDown(e);
            });
            $dice.mouseup(function (e) {
                $(this).off("mouseup");
                onDocumentMouseUp(e);
            });
            popSwipeShown = true;
        }
        contentFormatting();
        setTimeout(function () {
            contentFormatting();
        }, 500);
    });

    function addShadowedLight(x, y, z, color, intensity) {

        var directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z);
        scene.add(directionalLight);

        directionalLight.castShadow = true;

        var d = 1;
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;

        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 4;

        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;

        directionalLight.shadow.bias = -0.005;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function init() {
        $lbTotVal.hide();
        $lbTry.hide();
        container = document.createElement("div");
        document.getElementById("dice").appendChild(container);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
        camera.position.set(0, 0, 2.2);

        scene = new THREE.Scene();

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + "% downloaded");
            }
        };

        var onError = function (xhr) {};

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("./models/");
        mtlLoader.load("dice.mtl", function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath("./models/");
            objLoader.load("dice.obj", function (object) {
                scene.add(object);
                mesh[0] = object;
            }, onProgress, onError);
        });

        // Lights
        scene.add(new THREE.AmbientLight(0x777777));
        addShadowedLight(0.5, 1, -1, 0xffffff, 0.7);
        addShadowedLight(-1, 1, 1, 0xffffff, 1);

        // renderer
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        container.appendChild(renderer.domElement);

        container.addEventListener("mousedown", onDocumentMouseDown, false);
        container.addEventListener("touchstart", onDocumentTouchStart, false);
        container.addEventListener("touchmove", onDocumentTouchMove, false);
        container.addEventListener("touchend", onDocumentTouchEnd, false);

        window.addEventListener("resize", onWindowResize, false);
    }

    $(document).on("pageshow", "#popup_yahtzee", function () {
        myShakeEvent.stop();
        inDice = false;
        if (!popHelpShown) {
            $helpTit.html(document.webL10n.get("lb_help"));
            $helpTxt.html("");
            $popupHelp.popup("open");
            popHelpShown = true;
        }
        contentFormatting();
    });

    if (!Detector.webgl) {
        setTimeout(function () {
            $popupWebGL.popup("open");
        }, 500);
    } else {
        init();
    }

    contentFormatting();
    setTimeout(function () {
        contentFormatting();
    }, 500);

    function render() {
        var i;
        var j;
        curSpeed = 0;
        for (i = 0; i < anzDices; i += 1) {
            mesh[i].rotation.y += (targetRotationX[i] - mesh[i].rotation.y) * 0.05;
            mesh[i].rotation.x += (targetRotationY[i] - mesh[i].rotation.x) * 0.05;
            mesh[i].rotation.z += (targetRotationZ[i] - mesh[i].rotation.z) * 0.05;
            curSpeed = Math.max(curSpeed, (Math.abs(mesh[i].rotation.y - targetRotationX[i]) + Math.abs(mesh[i].rotation.x - targetRotationY[i]) + Math.abs(mesh[i].rotation.z - targetRotationZ[i])));
        }

        if (curSpeed < 0.01 && rolling) {
            rolling = false;
            for (j = 0; j < 2; j += 1) {
                totVal = 0;
                countVal = [0, 0, 0, 0, 0, 0];
                for (i = 0; i < anzDices; i += 1) {
                    rotX = ((Math.round((targetRotationY[i] % (Math.PI * 2)) / Math.PI * 2)) + 4) % 4;
                    rotY = ((Math.round((targetRotationX[i] % (Math.PI * 2)) / Math.PI * 2)) + 4) % 4;
                    rotZ = ((Math.round((targetRotationZ[i] % (Math.PI * 2)) / Math.PI * 2)) + 4) % 4;
                    diceVal[i] = 0;
                    if (
                        (rotX === 0 && rotY === 0) ||
                        (rotX === 2 && rotY === 2)
                    ) {
                        diceVal[i] = 1;
                    } else if (
                        (rotX === 3 && rotZ === 1) ||
                        (rotX === 1 && rotZ === 3) ||
                        (rotX === 0 && rotY === 1 && rotZ === 0) ||
                        (rotX === 2 && rotY === 3 && rotZ === 0) ||
                        (rotX === 2 && rotY === 1 && rotZ === 2) ||
                        (rotX === 0 && rotY === 3 && rotZ === 2)
                    ) {
                        diceVal[i] = 2;
                    } else if (
                        (rotX === 3 && rotZ === 0) ||
                        (rotX === 1 && rotZ === 2) ||
                        (rotX === 0 && rotY === 1 && rotZ === 3) ||
                        (rotX === 0 && rotY === 3 && rotZ === 1) ||
                        (rotX === 2 && rotY === 1 && rotZ === 1) ||
                        (rotX === 2 && rotY === 3 && rotZ === 3)
                    ) {
                        diceVal[i] = 3;
                    } else if (
                        (rotX === 1 && rotZ === 0) ||
                        (rotX === 3 && rotZ === 2) ||
                        (rotX === 0 && rotY === 3 && rotZ === 3) ||
                        (rotX === 2 && rotY === 1 && rotZ === 3) ||
                        (rotX === 0 && rotY === 1 && rotZ === 1) ||
                        (rotX === 2 && rotY === 3 && rotZ === 1)
                    ) {
                        diceVal[i] = 4;
                    } else if (
                        (rotX === 3 && rotZ === 3) ||
                        (rotX === 1 && rotZ === 1) ||
                        (rotX === 0 && rotY === 3 && rotZ === 0) ||
                        (rotX === 2 && rotY === 3 && rotZ === 2) ||
                        (rotX === 0 && rotY === 1 && rotZ === 2) ||
                        (rotX === 2 && rotY === 1 && rotZ === 0)
                    ) {
                        diceVal[i] = 5;
                    } else if (
                        (rotX === 0 && rotY === 2) ||
                        (rotX === 2 && rotY === 0)
                    ) {
                        diceVal[i] = 6;
                    }
                    //diceVal=diceVal + "\n" + "x: " + rotX + "  y: " + rotY + "  Z: " + rotZ;
                    //alert(diceVal);
                    totVal += diceVal[i];
                    countVal[diceVal[i] - 1] = countVal[diceVal[i] - 1] + 1;
                }
            }

            if (inYahtzee) {
                if (!popLockShown && curTry === 1 && !inLock) {
                    $popupLock.popup("open");
                    $dice.mousedown(function (e) {
                        $(this).off("mousedown");
                        $popupLock.popup("close");
                        onDocumentMouseDown(e);
                    });
                    $dice.mouseup(function (e) {
                        $(this).off("mouseup");
                        onDocumentMouseUp(e);
                    });
                    popLockShown = true;
                }
                if (!inLock) {
                    curTry += 1;
                } else {
                    inLock = false;
                }
                $lbTry.html(curTry + " / 3");
                $lbTry.show();
                $lbTotVal.html(document.webL10n.get("lb_player") + " " + curPlayer);
                if (curTry > 3) {
                    yahtzeeCount();
                }
            } else {
                $lbTotVal.html(totVal);
            }
            $lbTotVal.show();
        }
        renderer.render(scene, camera);
    }

    function animate() {
        if (inDice) {
            window.requestAnimationFrame(animate);
            render();
        }
    }

    function quit_dice() {
        var i;
        myShakeEvent.stop();
        inDice = false;
        $lbTotVal.hide();
        $lbTry.hide();
        $btDiceYahtzee.show();
        $("#grp_anz").hide();
        unlockDice();
        $.mobile.changePage("#title", {transition: "slide", reverse: true});
        for (i = 0; i < anzDices; i += 1) {
            mesh[i].rotation.y = targetRotationX[i];
            mesh[i].rotation.x = targetRotationY[i];
            mesh[i].rotation.z = targetRotationZ[i];
        }
        rolling = false;
    }

    $("#bt_quit").click(function (e) {
        quit_dice();
        e.preventDefault();
    });

    function close_list() {
        myShakeEvent.start();
        inDice = true;
        animate();
        if (gameOver) {
            gameOver = false;
            quit_dice();
        } else {
            $.mobile.changePage("#dice", {transition: "pop", reverse: true});
        }
    }

    $("#bt_close_list").click(function (e) {
        close_list();
        e.preventDefault();
    });

    function yahtzeeSetValue(id) {
        var i;
        var empty = false;
        playerScore[curPlayer - 1][id] = currentScore[id];
        $("#lb_" + id + "p" + curPlayer).html(currentScore[id]);

        totVal = 0;
        for (i = 0; i < currentScore.length; i += 1) {
            $("#bt_" + i + "p" + curPlayer).css("display", "none");
            $("#lb_" + i + "p" + curPlayer).css("display", "inline");
            totVal += playerScore[curPlayer - 1][i];
            if (i === 5) {
                $("#lb_sum1p" + curPlayer).html(totVal);
                if (totVal >= 63) {
                    $("#lb_bonus_p" + curPlayer).html(35);
                    totVal += 35;
                }
                upperVal = totVal;
                $("#lb_sum2p" + curPlayer).html(totVal);
            }
        }
        $("#lb_sum3p" + curPlayer).html(totVal - upperVal);
        $("#lb_sum4p" + curPlayer).html(totVal);
        totalScore[curPlayer - 1] = totVal;
        $div_close_list.show();

        for (i = 0; i < currentScore.length; i += 1) {
            if (playerScore[curPlayer - 1][i] === null && i !== 6) {
                empty = true;
            }
        }

        if (!empty && curPlayer === anzPlayer) {
            i = totalScore.indexOf(Math.max.apply(Math, totalScore));
            $helpTit.html(document.webL10n.get("lb_player") + " " + (i + 1) + " " + document.webL10n.get("lb_win"));
            $helpTxt.html(document.webL10n.get("lb_with") + " " + totalScore[i] + " " + document.webL10n.get("lb_pts"));
            $popupHelp.popup("open");
            gameOver = true;
        } else {
            curPlayer += 1;
            if (curPlayer > anzPlayer) {
                curPlayer = 1;
            }
            curTry = 1;
            $lbTry.html(curTry + " / 3");
            $lbTotVal.html(document.webL10n.get("lb_player") + " " + curPlayer);
            unlockDice();
            close_list();
        }
    }

    $("[id^=bt_0p]").click(function (e) {
        yahtzeeSetValue(0);
        e.preventDefault();
    });
    $("[id^=bt_1p]").click(function (e) {
        yahtzeeSetValue(1);
        e.preventDefault();
    });
    $("[id^=bt_2p]").click(function (e) {
        yahtzeeSetValue(2);
        e.preventDefault();
    });
    $("[id^=bt_3p]").click(function (e) {
        yahtzeeSetValue(3);
        e.preventDefault();
    });
    $("[id^=bt_4p]").click(function (e) {
        yahtzeeSetValue(4);
        e.preventDefault();
    });
    $("[id^=bt_5p]").click(function (e) {
        yahtzeeSetValue(5);
        e.preventDefault();
    });

    $("[id^=bt_7p]").click(function (e) {
        yahtzeeSetValue(7);
        e.preventDefault();
    });
    $("[id^=bt_8p]").click(function (e) {
        yahtzeeSetValue(8);
        e.preventDefault();
    });
    $("[id^=bt_9p]").click(function (e) {
        yahtzeeSetValue(9);
        e.preventDefault();
    });
    $("[id^=bt_10p]").click(function (e) {
        yahtzeeSetValue(10);
        e.preventDefault();
    });
    $("[id^=bt_11p]").click(function (e) {
        yahtzeeSetValue(11);
        e.preventDefault();
    });
    $("[id^=bt_12p]").click(function (e) {
        yahtzeeSetValue(12);
        e.preventDefault();
    });
    $("[id^=bt_13p]").click(function (e) {
        yahtzeeSetValue(13);
        e.preventDefault();
    });

    function yahtzee_init() {
        var i;
        var j;
        var $lb_p_;
        for (i = 0; i < 14; i += 1) {
            currentScore[i] = 0;
            for (j = 0; j < 5; j += 1) {
                playerScore[j][i] = null;
                $("#bt_" + i + "p" + (j + 1)).css("display", "none");
                $lb_p_ = $("#lb_" + i + "p" + (j + 1));
                $lb_p_.css("display", "inline");
                $lb_p_.html("");
            }
        }
        for (j = 0; j < 5; j += 1) {
            if (j < anzPlayer) {
                $("#img_p" + (j + 1)).attr("style", "width:100%; background-color: #CC002F;");
                $("#lb_sum1p" + (j + 1)).html(0);
                $("#lb_sum2p" + (j + 1)).html(0);
                $("#lb_sum3p" + (j + 1)).html(0);
                $("#lb_sum4p" + (j + 1)).html(0);
            } else {
                $("#img_p" + (j + 1)).attr("style", "width:100%; background-color: #AAAAAA;");
                $("#lb_sum1p" + (j + 1)).html("");
                $("#lb_sum2p" + (j + 1)).html("");
                $("#lb_sum3p" + (j + 1)).html("");
                $("#lb_sum4p" + (j + 1)).html("");
            }
            $("#lb_bonus_p" + (j + 1)).html("");
            totalScore[j] = 0;
        }

        curPlayer = 1;
        curTry = 1;
        unlockDice();

        $lbTotVal.html(document.webL10n.get("lb_player") + " " + curPlayer);
        $lbTry.html(curTry + " / 3");
        $lbTotVal.show();
        $lbTry.show();
    }

    $(window).resize(function () {
        contentFormatting();
        setTimeout(function () {
            contentFormatting();
        }, 500);
    });

    function set_number(yahtzee) {
        inYahtzee = yahtzee;
        if (inYahtzee) {
            $lbAnz.html(document.webL10n.get("lb_anz_pl"));
        } else {
            $lbAnz.html(document.webL10n.get("lb_anz"));
        }
        $btDiceYahtzee.slideToggle();
        setTimeout(function () {
            $("#grp_anz").slideToggle();
        }, 500);
    }

    $btDice.click(function (e) {
        set_number(false);
        e.preventDefault();
    });
    $btYahtzee.click(function (e) {
        set_number(true);
        e.preventDefault();
    });

    function cloneDice(i) {
        mesh[i] = mesh[0].clone();
        mesh[i].rotation.y = -Math.PI / 2;
        targetRotationX[i] = Math.round((targetRotationX[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
        targetRotationY[i] = Math.round((targetRotationY[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
        targetRotationZ[i] = Math.round((targetRotationZ[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
        mesh[i].rotation.y = targetRotationX[i];
        mesh[i].rotation.x = targetRotationY[i];
        mesh[i].rotation.z = targetRotationZ[i];
    }

    function numberOfDice(anz) {
        var i;
        if (anz > anzDices) {
            for (i = anzDices; i < anz; i += 1) {
                if (mesh[i] === undefined || mesh[i] === null) {
                    cloneDice(i);
                }
                scene.add(mesh[i]);
            }
        }
        if (anzDices > anz) {
            for (i = anz; i < anzDices; i += 1) {
                scene.remove(mesh[i]);
            }
        }
        anzDices = anz;
        contentFormatting();
    }

    function closeSettings() {
        contentFormatting();
        $.mobile.changePage("#title", {transition: "pop", reverse: true});
    }

    $("#bt_closeSettings").click(function (e) {
        closeSettings();
        e.preventDefault();
    });

    function displayDice(anz) {
        var color = [
            [[0.750000, 0.000000, 0.070000], [1.000000, 1.000000, 1.000000]],
            [[0.090000, 0.200000, 0.550000], [1.000000, 1.000000, 1.000000]],
            [[0.900000, 0.500000, 0.005000], [1.000000, 1.000000, 1.000000]],
            [[0.017000, 0.292000, 0.243000], [1.000000, 1.000000, 1.000000]],
            [[0.650000, 0.650000, 0.650000], [0.060000, 0.060000, 0.060000]]
        ];
        var $input_radio_color_checked = $("input:radio[name=color]:checked");
        inDice = true;
        if (inYahtzee) {
            anzPlayer = anz;
            numberOfDice(5);
            $("input:radio[name=anzahl]").filter("[value=5]").prop("checked", true);
            closeSettings();
            yahtzee_init();
            $bt_list.show();
        } else {
            numberOfDice(anz);
            $lbTotVal.hide();
            $lbTry.hide();
            $bt_list.hide();
            unlockDice();
        }
        myShakeEvent.start();
        animate();
        $.mobile.changePage("#dice", {transition: "slide"});
        mesh[0].children[0].material[0].color.setRGB(
            color[parseInt($input_radio_color_checked.val())][0][0],
            color[parseInt($input_radio_color_checked.val())][0][1],
            color[parseInt($input_radio_color_checked.val())][0][2]
        );
        mesh[0].children[0].material[1].color.setRGB(
            color[parseInt($input_radio_color_checked.val())][1][0],
            color[parseInt($input_radio_color_checked.val())][1][1],
            color[parseInt($input_radio_color_checked.val())][1][2]
        );
    }

    $("[id^=bt_anz]").click(function (e) {
        displayDice(Number($(this).attr("id").slice(-1)));
        e.preventDefault();
    });

    function showHelp(i) {
        $helpTit.html(document.webL10n.get(i));
        $helpTxt.html(document.webL10n.get(i + "_txt"));
        $popupHelp.popup("open");
    }

    $(".help").click(function (e) {
        showHelp($(this).attr("id"));
        e.preventDefault();
    });

    document.webL10n.ready(function () {
        // Example usage - https://grrd01.github.io/Dice/?lang=en
        var urlParam = urlQuery("lang");
        langReady = true;
        if (urlParam && urlParam !== document.webL10n.getLanguage()) {
            document.webL10n.setLanguage(urlParam);
            langReady = false;
        }
    });
    document.addEventListener('localized', function () {
        if (langReady) {
            $("html").attr("lang", document.webL10n.getLanguage().substr(0, 2));
            $('meta[name=description]').attr("content", document.webL10n.get("lb_desc"));
            $('link[rel=manifest]').attr("href", "manifest/appmanifest_" + document.webL10n.getLanguage().substr(0, 2) +".json");
        }
        langReady = true;
    });
}());
