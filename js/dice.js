/**
 * grrd's Dice
 * Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*jslint browser:true, long: true, devel: true, for: true */
/*global  THREE, Shake, Detector*/

(function () {
    "use strict";

    // Localization
    let nLang = 0;
    const lLoc = [{
        lb_desc: "grrd’s Dice is a 3D Dice Roller app and a Yahtzee game for one to five players.",
        lb_swipe: "Swipe or shake to roll the dice!",
        lb_lock: "Tap to lock a dice!",
        lb_web_gl: "Your browser does not support WebGL!",
        lb_help: "Tap on an icon to get help!",
        lb_color: "Color:",
        lb_instr: "Display instructions:",
        lb_anz: "Number of dice:",
        lb_anz_pl: "Number of players:",
        bt_dice: "Dice!",
        bt_yahtzee: "Yahtzee!",
        bt_start: "Start",
        bt_back: " Back",
        bt_close: " Close",
        lb_dev: " Developed by Gérard Tyedmers with",
        lb_and: "and",
        lb_or: " or",
        lb_model: " 3D-Model created with",
        lb_puzzle: "Have a look at my other games:",
        lb_yes: " Yes",
        lb_no: " No",
        lb_again: " Play again?",
        lb_game: " game played.",
        lb_games: " games played.",
        lb_player: " Player",
        lb_win: " wins!",
        lb_with: " with",
        lb_pts: " points",
        lb_name: " Your name:",
        lb_img: " Your image:",
        lb_played: " Games played:",
        lb_won: " Games won:",
        lb_sound: " Play sounds",
        lb_1: " Aces",
        lb_1_txt: " Sum of all aces",
        lb_2: " Twos",
        lb_2_txt: " Sum of all twos",
        lb_3: " Threes",
        lb_3_txt: " Sum of all threes",
        lb_4: " Fours",
        lb_4_txt: " Sum of all fours",
        lb_5: " Fives",
        lb_5_txt: " Sum of all fives",
        lb_6: " Sixes",
        lb_6_txt: " Sum of all sixes",
        lb_sum1: " Total",
        lb_sum1_txt: " Total upper section",
        lb_bonus: " Bonus 35 pts",
        lb_bonus_txt: " if total > 62",
        lb_sum2: " Total",
        lb_sum2_txt: " Total with bonus",
        lb_3kind: " 3 of a kind",
        lb_3kind_txt: " Sum of 3 identical dice",
        lb_4kind: " 4 of a kind",
        lb_4kind_txt: " Sum of 4 identical dice",
        lb_full_house: " Full House 25 pts",
        lb_full_house_txt: " 2 and 3 dice of a kind",
        lb_small_str: " Small Straight 30 pts",
        lb_small_str_txt: " Sequence of 4 dice",
        lb_big_str: " Large Straight 40 pts",
        lb_big_str_txt: " Sequence of 5 dice",
        lb_yahtzee: " Yahtzee 50 pts",
        lb_yahtzee_txt: " 5 of a kind",
        lb_chance: " Chance",
        lb_chance_txt: " Total of all 5 dice",
        lb_sum3: " Total",
        lb_sum3_txt: " Total lower section",
        lb_sum4: " Grand Total",
        lb_sum4_txt: " Upper + lower section"
    }, {
        lb_desc: "grrd’s Dice ist eine 3D Würfel-App und ein Yahtzee (Kniffel, Yatzy) Spiel für 1 bis 5 Spieler.",
        lb_swipe: "Streiche oder schüttle zum Würfeln!",
        lb_lock: "Tippe, um einen Würfel zu sperren!",
        lb_web_gl: "Dein Browser unter- stützt WebGL nicht!",
        lb_help: "Tippe auf ein Icon für Hilfe!",
        lb_color: "Farbe:",
        lb_instr: "Anleitung einblenden:",
        lb_anz: "Anzahl Würfel:",
        lb_anz_pl: "Anzahl Spieler:",
        bt_dice: "Würfel!",
        bt_yahtzee: "Yahtzee!",
        bt_start: "Start",
        bt_back: " Zurück",
        bt_close: " Schliessen",
        lb_dev: " Entwickelt von Gérard Tyedmers mit",
        lb_and: "und",
        lb_or: " oder",
        lb_model: " 3D-Modell erstellt mit",
        lb_puzzle: "Schau dir auch meine anderen Spiele an:",
        lb_yes: " Ja",
        lb_no: " Nein",
        lb_again: " Nochmals spielen?",
        lb_game: " Spiel gespielt.",
        lb_games: " Spiele gespielt.",
        lb_player: " Spieler",
        lb_win: " gewinnt!",
        lb_with: " mit",
        lb_pts: " Punkten",
        lb_name: " Dein Name:",
        lb_img: " Dein Bild",
        lb_played: " Spiele gespielt:",
        lb_won: " Spiele gewonnen:",
        lb_sound: " Töne abspielen",
        lb_1: " Einer",
        lb_1_txt: " Summe aller Einer",
        lb_2: " Zweier",
        lb_2_txt: " Summe aller Zweier",
        lb_3: " Dreier",
        lb_3_txt: " Summe aller Dreier",
        lb_4: " Vierer",
        lb_4_txt: " Summe aller Vierer",
        lb_5: " Fünfer",
        lb_5_txt: " Summe aller Fünfer",
        lb_6: " Sechser",
        lb_6_txt: " Summe aller Sechser",
        lb_sum1: " Summe",
        lb_sum1_txt: " Summe obere Hälfte",
        lb_bonus: " Bonus 35 Pt.",
        lb_bonus_txt: " wenn Summe > 62 Pt.",
        lb_sum2: " Summe",
        lb_sum2_txt: " Summe mit Bonus",
        lb_3kind: " Dreierpasch",
        lb_3kind_txt: " Drei gleiche Würfel",
        lb_4kind: " Viererpasch",
        lb_4kind_txt: " Vier gleiche Würfel",
        lb_full_house: " Full House 25 Pt.",
        lb_full_house_txt: " 2 und 3 gleiche Würfel",
        lb_small_str: " Kleine Strasse 30 Pt.",
        lb_small_str_txt: " Reihenfolge mit 4 Würfeln",
        lb_big_str: " Grosse Strasse 40 Pt",
        lb_big_str_txt: " Reihenfolge mit 5 Würfeln",
        lb_yahtzee: " Yahtzee 50 Pt.",
        lb_yahtzee_txt: " Fünf gleiche Würfel",
        lb_chance: " Chance",
        lb_chance_txt: " Summe aller 5 Würfel",
        lb_sum3: " Summe",
        lb_sum3_txt: " Summe untere Hälfte",
        lb_sum4: " Summe Total",
        lb_sum4_txt: " obere + untere Hälfte"
    }, {
        lb_desc: "grrd’s Dice est une application 3D pour jouer aux dés et un jeu Yahtzee (Yatzee, Yatzy) pour 1 à 5 joueurs.",
        lb_swipe: "Glissez ou secouez pour lancer les dés!",
        lb_lock: "Tapez pour verrouiller un dé!",
        lb_web_gl: "Votre navigateur ne supporte pas WebGL.",
        lb_help: "Tapez sur une icône pour obtenir de l'aide!",
        lb_color: "Couleur:",
        lb_instr: "Afficher les instructions:",
        lb_anz: "Nombre de dés:",
        lb_anz_pl: "Nombre de joueurs:",
        bt_dice: "Dés!",
        bt_yahtzee: "Yahtzee!",
        bt_start: "Démarrer",
        bt_back: " Retour",
        bt_close: " Fermer",
        lb_dev: " Développé par Gérard Tyedmers avec",
        lb_and: "et",
        lb_or: " ou",
        lb_model: " Modèle 3D créé avec",
        lb_puzzle: "Regardez aussi mes autres jeux:",
        lb_yes: " Oui",
        lb_no: " Non",
        lb_again: " Jouer à nouveau?",
        lb_game: " jeu joué.",
        lb_games: " jeux joués.",
        lb_player: " Joueur",
        lb_win: " gagne!",
        lb_with: " avec",
        lb_pts: " points",
        lb_name: " Votre nom:",
        lb_img: " Votre image:",
        lb_played: " Jeux joués:",
        lb_won: " Jeux gagnés:",
        lb_sound: " Jouer les sons",
        lb_1: " As",
        lb_1_txt: " Somme des 1 obtenus",
        lb_2: " Deux",
        lb_2_txt: " Somme des 2 obtenus",
        lb_3: " Trois",
        lb_3_txt: " Somme des 3 obtenus",
        lb_4: " Quatre",
        lb_4_txt: " Somme des 4 obtenus",
        lb_5: " Cinq",
        lb_5_txt: " Somme des 5 obtenus",
        lb_6: " Six",
        lb_6_txt: " Somme des 6 obtenus",
        lb_sum1: " Total",
        lb_sum1_txt: " Total 1ère section",
        lb_bonus: " Prime 35 pts",
        lb_bonus_txt: " Si total > 62",
        lb_sum2: " Total",
        lb_sum2_txt: " 1ère section + prime",
        lb_3kind: " Brelan",
        lb_3kind_txt: " 3 dés identiques",
        lb_4kind: " Carré",
        lb_4kind_txt: " 4 dés identiques",
        lb_full_house: " Full 25 pts",
        lb_full_house_txt: " 2 + 3 dés identiques",
        lb_small_str: " Petite suite 30 pts",
        lb_small_str_txt: " Suite de 4 dés",
        lb_big_str: " Grande suite 40 pts",
        lb_big_str_txt: " Suite  de 5 dés",
        lb_yahtzee: " Yahtzee 50 pts",
        lb_yahtzee_txt: " 5 dés identiques",
        lb_chance: " Chance",
        lb_chance_txt: " Somme des dés",
        lb_sum3: " Total",
        lb_sum3_txt: " Total 2ème section",
        lb_sum4: " Total global",
        lb_sum4_txt: " 1ère + 2ème section"
    }, {
        lb_desc: "grrd's Dice is een 3D dobbelstenen app en een Yahtzee spel voor 1-5 spelers.",
        lb_swipe: "Veeg of schud om te dobbelen!",
        lb_lock: "Tik om de dobbelsteen te blokkeren!",
        lb_web_gl: "Uw browser ondersteunt geen WebGL!",
        lb_help: "Tik op een pictogram voor hulp!",
        lb_color: "Kleur:",
        lb_instr: "Instructies weergeven:",
        lb_anz: "Aantal dobbelstenen:",
        lb_anz_pl: "Aantal spelers:",
        bt_dice: "Dobbelstenen!",
        bt_yahtzee: "Yahtzee!",
        bt_start: "Begin",
        bt_back: " Terug",
        bt_close: " Sluiten",
        lb_dev: " Ontwikkeld door Gérard Tyedmers met",
        lb_and: "en",
        lb_or: " of",
        lb_model: " 3D-model gemaakt met",
        lb_puzzle: "Kijk eens naar mijn andere spelletjes:",
        lb_yes: " Ja",
        lb_no: " Nee",
        lb_again: " Speel opnieuw?",
        lb_game: " wedstrijd gespeeld.",
        lb_games: " wedstrijden gespeeld.",
        lb_player: " Speler",
        lb_win: " wint!",
        lb_with: " met",
        lb_pts: " punten",
        lb_name: " Jouw naam:",
        lb_img: " Uw afbeelding:",
        lb_played: " Gespeelde spellen:",
        lb_won: " Spellen gewonnen:",
        lb_sound: " Speel geluiden",
        lb_1: " Enen",
        lb_1_txt: " Som van alle enen",
        lb_2: " Tweeën",
        lb_2_txt: " Som van alle tweeën",
        lb_3: " Drieën",
        lb_3_txt: " Som van alle drieën",
        lb_4: " Vieren",
        lb_4_txt: " Som van alle vieren",
        lb_5: " Vijven",
        lb_5_txt: " Som van alle vijven",
        lb_6: " Zessen",
        lb_6_txt: " Som van alle zessen",
        lb_sum1: " Totaal",
        lb_sum1_txt: " van de bovenste helft",
        lb_bonus: " Bonus 35 ptn",
        lb_bonus_txt: " als de totale > 62",
        lb_sum2: " Totaal",
        lb_sum2_txt: " Bovenste helft + bonus",
        lb_3kind: " 3 dezelfde",
        lb_3kind_txt: " Som van 3 dezelfde",
        lb_4kind: " 4 dezelfde",
        lb_4kind_txt: " Som van 4 dezelfde",
        lb_full_house: " Full House 25 ptn",
        lb_full_house_txt: " 2 en 3 dezelfde",
        lb_small_str: " Kleine Straat 30 ptn",
        lb_small_str_txt: " 4 opeenvolgende nummers",
        lb_big_str: " Grote Straat 40 ptn",
        lb_big_str_txt: " 5 opeenvolgende nummers",
        lb_yahtzee: " Yahtzee 50 ptn",
        lb_yahtzee_txt: " 5 dezelfde",
        lb_chance: " Chance",
        lb_chance_txt: " Vrije keus",
        lb_sum3: " Totaal",
        lb_sum3_txt: " van de onderste helft",
        lb_sum4: " Totaal generaal",
        lb_sum4_txt: " bovenste + onderste helft"
    }, {
        lb_desc: "grrd's Dice è ina app 3D per far ir dats e dar Yahtzee per in enfin tschintg giugaders.",
        lb_swipe: "Trair u scurlattar per far ir il dat!",
        lb_lock: "Tutgar per bloccar in dat!",
        lb_web_gl: "Tes navigatur na sustegna betg WebGL!",
        lb_help: "Tutga sin ina icone per retschaiver agid!",
        lb_color: "Colur:",
        lb_instr: "Visualisar ils instrucziuns:",
        lb_anz: "Dumber da dats:",
        lb_anz_pl: "Dumber da giugaders:",
        bt_dice: "Bittar ils dats!",
        bt_yahtzee: "Yahtzee!",
        bt_start: "Cumenzar",
        bt_back: " Enavos",
        bt_close: " Serrar",
        lb_dev: " Sviluppà da Gérard Tyedmers cun",
        lb_and: "e",
        lb_or: " u",
        lb_model: " Creà il model 3D cun",
        lb_puzzle: "Manchenta betg:",
        lb_yes: " Gea",
        lb_no: " Na",
        lb_again: " Giugar anc ina giada?",
        lb_game: " gieu",
        lb_games: " gieus",
        lb_player: " Giugader",
        lb_win: " gudagna!",
        lb_with: " cun",
        lb_pts: " puncts",
        lb_name: " Tes num:",
        lb_img: " Tes maletg:",
        lb_played: " Gieus:",
        lb_won: " Gieus gudignads:",
        lb_sound: " Far ir tuns",
        lb_1: " Puncts",
        lb_1_txt: " Summa da tut ils puncts",
        lb_2: " Da dus",
        lb_2_txt: " Dumber da tut ils da dus",
        lb_3: " Da trais",
        lb_3_txt: " Summa da tut ils da trais",
        lb_4: " Da quatter",
        lb_4_txt: " Summa da tut ils da quatter",
        lb_5: " Tschintgs",
        lb_5_txt: " Summa da tut ils tschintgs",
        lb_6: " Da sis",
        lb_6_txt: " Summa da tut ils da sis",
        lb_sum1: " Total",
        lb_sum1_txt: " Total da la secziun sura",
        lb_bonus: " Bonus 35 puncts",
        lb_bonus_txt: " sch'il total > 62",
        lb_sum2: " Total",
        lb_sum2_txt: " Secziun sura + il bonus",
        lb_3kind: " 3 d'ina sort",
        lb_3kind_txt: " Summa da 3 dats identics",
        lb_4kind: " 4 d'ina sort",
        lb_4kind_txt: " Summa da 4 dats identics",
        lb_full_house: " Full House 25 puncts",
        lb_full_house_txt: " 2 e 3 dats identics",
        lb_small_str: " Via pitschna 30 puncts",
        lb_small_str_txt: " Sequenza da 4 dats",
        lb_big_str: " Via gronda 40 puncts",
        lb_big_str_txt: " Sequenza da 5 dats",
        lb_yahtzee: " Yahtzee 50 puncts",
        lb_yahtzee_txt: " 5 d'ina sort",
        lb_chance: " Schanza",
        lb_chance_txt: " Total dals 5 dats",
        lb_sum3: " Total",
        lb_sum3_txt: " Total da la secziun sut",
        lb_sum4: " Total grond",
        lb_sum4_txt: " Secziun sura e sut"
    }];

    let container;
    let mesh = [];
    let camera;
    let scene;
    let renderer;

    let targetRotationX = [0, 0, 0, 0, 0];
    let targetRotationXOnMouseDown = [0, 0, 0, 0, 0];
    let randX = [1, 0, 0, 0, 0];

    let targetRotationY = [0, 0, 0, 0, 0];
    let targetRotationYOnMouseDown = [0, 0, 0, 0, 0];
    let randY = [1, 0, 0, 0, 0];

    let targetRotationZ = [0, 0, 0, 0, 0];
    let targetRotationZOnMouseDown = [0, 0, 0, 0, 0];
    let randZ = [1, 0, 0, 0, 0];

    let mouseX = 0;
    let mouseXOnMouseDown = 0;

    let mouseY = 0;
    let mouseYOnMouseDown = 0;
    let timeOnMouseDown;

    let inYahtzee = true;
    let inDice = false;
    let anzPlayer = 2;
    let anzDices = 1;
    let inMove = false;
    let inLock = false;
    let curPlayer = 1;
    let curTry = 1;
    let r_color = 0;
    let gameOver = false;

    let popSwipeShown = false;
    let popLockShown = false;
    let popHelpShown = false;

    let curSpeed;
    let totVal;
    let upperVal;
    let countVal = [0, 0, 0, 0, 0, 0];
    let rotX;
    let rotY;
    let rotZ;
    let rolling = false;
    let diceVal = [0, 0, 0, 0, 0];
    let locked = [false, false, false, false, false];
    let currentScore = [];
    let playerScore = [];
    let ii;
    for (ii = 0; ii < 5; ii += 1) {
        playerScore[ii] = [];
    }
    let totalScore = [0, 0, 0, 0, 0];

    let gWindowsHeight = document.documentElement.clientHeight;
    let gWindowsWidth = document.documentElement.clientWidth;
    let windowHalfX = gWindowsWidth / 2;
    let windowHalfY = gWindowsHeight / 2;

    const myShakeEvent = new Shake({
        threshold: 8, // 15 - optional, shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });

    const localStorageOK = (function () {
        const mod = "modernizr";
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (ignore) {
            return false;
        }
    }());

    const $ = function (id) {
        return document.getElementById(id);
    };

    const $lbTotVal = $("lb_tot_val");
    const $lbTry = $("lb_try");
    const $bt_list = $("bt_list");
    const $imgLock0 = $("img_lock0");
    const $imgLock1 = $("img_lock1");
    const $imgLock2 = $("img_lock2");
    const $imgLock3 = $("img_lock3");
    const $imgLock4 = $("img_lock4");
    const $game = $("iGame");
    const $Title = $("iTitle");
    const $pupupInfo = $("iPopupInfo");
    const $popupSettings = $("iPopupSettings");
    const $popupYahtzee = $("popup_yahtzee");
    const $popupHelp = $("iPopupHelp");
    const $helptit = $("lb_helptit");
    const $help = $("lb_help");
    const $grpanz = $("grp_anz");

    function fShowPopup(e) {
        document.querySelectorAll(".page:not(.swipe-out) > fieldset")[0].disabled = true;
        if (e === $popupHelp) {
            document.querySelectorAll("#popup_yahtzee > fieldset")[0].disabled = true;
        }
        e.classList.remove("popup-init");
        e.classList.remove("popup-hide");
        e.classList.add("popup-show");
        if (e === $popupYahtzee) {
            myShakeEvent.stop();
            inDice = false;
            if (!popHelpShown && $("b_instr").checked) {
                setTimeout(function () {
                    $helptit.innerHTML = "";
                    $help.innerHTML = lLoc[nLang].lb_help;
                    fShowPopup($popupHelp);
                    popHelpShown = true;
                }, 700);
            }
        }
    }
    function fHidePopup(e) {
        if (document.getElementsByClassName("popup-show").length === 1) {
            document.querySelectorAll(".page:not(.swipe-out) > fieldset")[0].disabled = false;
        }
        if (e === $popupHelp) {
            document.querySelectorAll("#popup_yahtzee > fieldset")[0].disabled = false;
        }
        e.classList.remove("popup-show");
        e.classList.add("popup-hide");
        setTimeout(function(){
            e.scrollTop = 0;
        }, 1050);
    }

    function shakeEventDidOccur() {
        let i;
        if (inYahtzee && rolling) {
            return;
        }
        fHidePopup($popupHelp);
        $lbTotVal.style.display = "none";
        $lbTry.style.display = "none";
        for (i = 0; i < anzDices; i += 1) {
            if (!locked[i]) {
                targetRotationX[i] = Math.round((targetRotationX[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
                targetRotationY[i] = Math.round((targetRotationY[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
                targetRotationZ[i] = Math.round((targetRotationZ[i] + 30 * Math.random() - 15) / Math.PI * 2) * Math.PI / 2;
            }
        }
        rolling = true;
    }

    function onDocumentMouseMove(event) {
        let i;
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
        let i;
        let j;
        let $bt_p_;
        let sequence = 0;
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
            if (i === 6) {
                i = 7;
            }
            if (playerScore[curPlayer - 1][i] === null) {
                $bt_p_ = $("bt_" + i + "p" + curPlayer);
                $("lb_" + i + "p" + curPlayer).style.display = "none";
                $bt_p_.style.display = "block";
                $bt_p_.firstChild.innerHTML = currentScore[i];
            }
        }
        $("iYahtzeeClose").parentElement.style.display = "none";
        fShowPopup($popupYahtzee);
    }

    function lockDice() {
        let i;
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
                $imgLock4.style.display = (locked[4] ? "block" : "none");
            }
            if (mouseX > 0 && mouseY > gWindowsHeight / 15) {
                locked[1] = !locked[1];
                $imgLock1.style.display = (locked[1] ? "block" : "none");
            }
            if (mouseX > gWindowsHeight / (-15) && mouseX < gWindowsHeight / 15 && mouseY > gWindowsHeight / (-15) && mouseY < gWindowsHeight / 15) {
                locked[2] = !locked[2];
                $imgLock2.style.display = (locked[2] ? "block" : "none");
            }
            if (mouseX < 0 && mouseY < gWindowsHeight / (-15)) {
                locked[3] = !locked[3];
                $imgLock3.style.display = (locked[3] ? "block" : "none");
            }
            if (mouseX > 0 && mouseY < gWindowsHeight / (-15)) {
                locked[0] = !locked[0];
                $imgLock0.style.display = (locked[0] ? "block" : "none");
            }

        } else {
            if (mouseY < 0 && mouseX > gWindowsHeight / 15) {
                locked[0] = !locked[0];
                $imgLock0.style.display = (locked[0] ? "block" : "none");
            }
            if (mouseY > 0 && mouseX > gWindowsHeight / 15) {
                locked[1] = !locked[1];
                $imgLock1.style.display = (locked[1] ? "block" : "none");
            }
            if (mouseY > gWindowsHeight / (-15) && mouseY < gWindowsHeight / 15 && mouseX > gWindowsHeight / (-15) && mouseX < gWindowsHeight / 15) {
                locked[2] = !locked[2];
                $imgLock2.style.display = (locked[2] ? "block" : "none");
            }
            if (mouseY < 0 && mouseX < gWindowsHeight / (-15)) {
                locked[3] = !locked[3];
                $imgLock3.style.display = (locked[3] ? "block" : "none");
            }
            if (mouseY > 0 && mouseX < gWindowsHeight / (-15)) {
                locked[4] = !locked[4];
                $imgLock4.style.display = (locked[4] ? "block" : "none");
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
        let i;
        for (i = 0; i < 5; i += 1) {
            locked[i] = false;
            $("img_lock" + i).style.display = "none";
        }
    }

    function mouseOutMouseUp(event) {
        let i;
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
        let i;
        $lbTotVal.style.display = "none";
        $lbTry.style.display = "none";
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
        let i;
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
        let i;
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
        let i;
        timeOnMouseDown = new Date();
        inMove = false;
        if (event.touches.length === 1) {
            event.preventDefault();
            $lbTotVal.style.display = "none";
            $lbTry.style.display = "none";
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

    function render() {
        let i;
        let j;
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
                if (!popLockShown && curTry === 1 && !inLock && $("b_instr").checked) {
                    $helptit.innerHTML = "";
                    $help.innerHTML = lLoc[nLang].lb_lock;
                    fShowPopup($popupHelp);
                    popLockShown = true;
                }
                if (!inLock) {
                    curTry += 1;
                } else {
                    inLock = false;
                }
                $lbTry.innerHTML = curTry + " / 3";
                $lbTry.style.display = "block";
                $lbTotVal.innerHTML = lLoc[nLang].lb_player + " " + curPlayer;
                if (curTry > 3) {
                    yahtzeeCount();
                }
            } else {
                $lbTotVal.innerHTML = totVal;
            }
            $lbTotVal.style.display = "block";
        }
        renderer.render(scene, camera);
    }

    function animate() {
        if (inDice) {
            window.requestAnimationFrame(animate);
            render();
        }
    }

    function contentFormatting() {
        gWindowsHeight = document.documentElement.clientHeight;
        gWindowsWidth = document.documentElement.clientWidth;
        windowHalfX = gWindowsWidth / 2;
        windowHalfY = gWindowsHeight / 2;
        if (gWindowsHeight > gWindowsWidth) {
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
        camera.aspect = gWindowsWidth / gWindowsHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(gWindowsWidth, gWindowsHeight);
    }

    function quit_dice() {
        let i;
        myShakeEvent.stop();
        inDice = false;
        $lbTotVal.style.display = "none";
        $lbTry.style.display = "none";
        $("bt_dice_yahtzee").classList.remove("swipe-out-bottom");
        $grpanz.classList.remove("swipe-in-bottom");
        unlockDice();
        $Title.classList.remove("swipe-out");
        $game.classList.remove("swipe-in");
        $Title.classList.add("swipe-out-right");
        $game.classList.add("swipe-in-left");
        document.getElementsByTagName("FIELDSET")[0].disabled = false;
        for (i = 0; i < anzDices; i += 1) {
            mesh[i].rotation.y = targetRotationX[i];
            mesh[i].rotation.x = targetRotationY[i];
            mesh[i].rotation.z = targetRotationZ[i];
        }
        rolling = false;
    }

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
        let i;
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

    function close_list() {
        fHidePopup($popupYahtzee);
        myShakeEvent.start();
        inDice = true;
        animate();
        if (gameOver) {
            gameOver = false;
            quit_dice();
        }
    }

    function closeSettings() {
        if (localStorageOK) {
            localStorage.setItem("s_color", r_color);
            localStorage.setItem("s_instr", $("b_instr").checked);
        }
        contentFormatting();
        fHidePopup($popupSettings);
    }

    function yahtzeeSetValue(e) {
        const id = e.target.id.substring(3, e.target.id.indexOf("p"));
        let i;
        let empty = false;
        playerScore[curPlayer - 1][id] = currentScore[id];
        $("lb_" + id + "p" + curPlayer).innerHTML = currentScore[id];

        totVal = 0;
        for (i = 0; i < currentScore.length; i += 1) {
            if (i === 6) {
                i = 7;
            }
            $("bt_" + i + "p" + curPlayer).style.display = "none";
            $("lb_" + i + "p" + curPlayer).style.display = "inline";
            totVal += playerScore[curPlayer - 1][i];
            if (i === 5) {
                $("lb_sum1p" + curPlayer).innerHTML = totVal;
                if (totVal >= 63) {
                    $("lb_bonus_p" + curPlayer).innerHTML = "35";
                    totVal += 35;
                }
                upperVal = totVal;
                $("lb_sum2p" + curPlayer).innerHTML = totVal;
            }
        }
        $("lb_sum3p" + curPlayer).innerHTML = totVal - upperVal;
        $("lb_sum4p" + curPlayer).innerHTML = totVal;
        totalScore[curPlayer - 1] = totVal;

        for (i = 0; i < currentScore.length; i += 1) {
            if (playerScore[curPlayer - 1][i] === null && i !== 6) {
                empty = true;
            }
        }

        if (!empty && curPlayer === anzPlayer) {
            i = totalScore.indexOf(Math.max.apply(Math, totalScore));
            $helptit.innerHTML = lLoc[nLang].lb_player + " " + (i + 1) + " " + lLoc[nLang].lb_win;
            $help.innerHTML = lLoc[nLang].lb_with + " " + totalScore[i] + " " + lLoc[nLang].lb_pts;
            $("iYahtzeeClose").parentElement.style.display = "block";
            fShowPopup($popupHelp);
            gameOver = true;
        } else {
            curPlayer += 1;
            if (curPlayer > anzPlayer) {
                curPlayer = 1;
            }
            curTry = 1;
            $lbTry.innerHTML = curTry + " / 3";
            $lbTotVal.innerHTML = lLoc[nLang].lb_player + " " + curPlayer;
            unlockDice();
            close_list();
        }
    }

    function yahtzee_init() {
        let i;
        let j;
        let $lb_p_;
        let $img;
        for (i = 0; i < 14; i += 1) {
            currentScore[i] = 0;
            for (j = 0; j < 5; j += 1) {
                if (i === 6) {
                    i = 7;
                }
                playerScore[j][i] = null;
                $("bt_" + i + "p" + (j + 1)).style.display = "none";
                $lb_p_ = $("lb_" + i + "p" + (j + 1));
                $lb_p_.style.display = "inline";
                $lb_p_.innerHTML = "";
            }
        }
        for (j = 0; j < 5; j += 1) {
            $img = $("img_p" + (j + 1));
            $img.style.width = "100%";
            if (j < anzPlayer) {
                $img.style.backgroundColor = "#CC002F";
                $("lb_sum1p" + (j + 1)).innerHTML = "0";
                $("lb_sum2p" + (j + 1)).innerHTML = "0";
                $("lb_sum3p" + (j + 1)).innerHTML = "0";
                $("lb_sum4p" + (j + 1)).innerHTML = "0";
            } else {
                $img.style.backgroundColor = "#AAAAAA";
                $("lb_sum1p" + (j + 1)).innerHTML = "";
                $("lb_sum2p" + (j + 1)).innerHTML = "";
                $("lb_sum3p" + (j + 1)).innerHTML = "";
                $("lb_sum4p" + (j + 1)).innerHTML = "";
            }
            $("lb_bonus_p" + (j + 1)).innerHTML = "";
            totalScore[j] = 0;
        }

        curPlayer = 1;
        curTry = 1;
        unlockDice();

        $lbTotVal.innerHTML = lLoc[nLang].lb_player + " " + curPlayer;
        $lbTry.innerHTML = curTry + " / 3";
        $lbTotVal.style.display = "block";
        $lbTry.style.display = "block";
    }

    function setColor(e) {
        r_color = parseInt(e.target.getAttribute("data-num"), 10);
        Array.from(document.getElementsByClassName("list-button-col")).forEach(function (rButton) {
            rButton.classList.remove("selected");
        });
        e.target.classList.add("selected");
    }

    // zu Spielfeld wechseln
    function displayDice(e) {
        const color = [
            [[0.750000, 0.000000, 0.070000], [1.000000, 1.000000, 1.000000]],
            [[0.090000, 0.200000, 0.550000], [1.000000, 1.000000, 1.000000]],
            [[0.900000, 0.500000, 0.005000], [1.000000, 1.000000, 1.000000]],
            [[0.017000, 0.292000, 0.243000], [1.000000, 1.000000, 1.000000]],
            [[0.650000, 0.650000, 0.650000], [0.060000, 0.060000, 0.060000]]
        ];
        //var r_color = $("input:radio[name=color]:checked").val();
        inDice = true;
        if (inYahtzee) {
            anzPlayer = parseInt(e.target.getAttribute("data-num"), 10);
            numberOfDice(5);
            //$("input:radio[name=anzahl]").filter("[value=5]").prop("checked", true);
            closeSettings();
            yahtzee_init();
            $bt_list.style.display = "block";
        } else {
            numberOfDice(parseInt(e.target.getAttribute("data-num"), 10));
            $lbTotVal.style.display = "none";
            $lbTry.style.display = "none";
            $bt_list.style.display = "none";
            unlockDice();
        }
        myShakeEvent.start();
        animate();
        mesh[0].children[0].material[0].color.setRGB(
            color[parseInt(r_color)][0][0],
            color[parseInt(r_color)][0][1],
            color[parseInt(r_color)][0][2]
        );
        mesh[0].children[0].material[1].color.setRGB(
            color[parseInt(r_color)][1][0],
            color[parseInt(r_color)][1][1],
            color[parseInt(r_color)][1][2]
        );
        document.getElementsByTagName("FIELDSET")[0].disabled = true;
        $Title.classList.remove("swipe-out-right");
        $game.classList.remove("swipe-in-left");
        $Title.classList.add("swipe-out");
        $game.classList.add("swipe-in");
        if (!popSwipeShown && $("b_instr").checked) {
            setTimeout(function () {
                $helptit.innerHTML = "";
                $help.innerHTML = lLoc[nLang].lb_swipe;
                fShowPopup($popupHelp);
                popSwipeShown = true;
            }, 700);
        }
    }

    function addShadowedLight(x, y, z, color, intensity) {

        const directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z);
        scene.add(directionalLight);

        directionalLight.castShadow = true;

        const d = 1;
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

    function urlQuery(query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const expr = "[\\?&]" + query + "=([^&#]*)";
        const regex = new RegExp(expr);
        const results = regex.exec(window.location.href);
        if (results !== null) {
            return results[1];
        } else {
            return false;
        }
    }

    function set_number(e) {
        inYahtzee = (e.target.getAttribute("data-yahtzee") === "true");
        if (inYahtzee) {
            $("lb_anz").innerHTML = lLoc[nLang].lb_anz_pl;
        } else {
            $("lb_anz").innerHTML = lLoc[nLang].lb_anz;
        }
        $("bt_dice_yahtzee").classList.add("swipe-out-bottom");
        setTimeout(function () {
            $grpanz.classList.remove("swipe-out-bottom");
            $grpanz.classList.add("swipe-in-bottom");
        }, 500);
    }

    document.onkeydown = function (e) {
        // mit Pfeiltasten navigieren
        switch (e.key) {
            case "Escape":
                let aOpenPopups =  document.getElementsByClassName("popup-show");
                let nOpenPopups =  aOpenPopups.length;
                if (nOpenPopups > 0) {
                    if (aOpenPopups[nOpenPopups - 1] === $popupYahtzee) {
                        if ($("iYahtzeeClose").parentElement.style.display === "block") {
                            close_list();
                        }
                    } else {
                        fHidePopup(aOpenPopups[nOpenPopups - 1]);
                    }
                } else if ($game.classList.contains("swipe-in") === true) {
                    quit_dice();
                }
                break;
        }
    }

    function fInit() {
        let i;
        let j;
        let el1;
        let el2;
        let el3;
        let el4;
        // Localize
        // Example usage - https://grrd01.github.io/Dice/?lang=en
        const cLang = (urlQuery("lang") || navigator.language || navigator.browserLanguage || (navigator.languages || ["en"])[0]).substring(0, 2).toLowerCase();
        if (cLang === "de") {
            nLang = 1;
        } else if (cLang === "fr") {
            nLang = 2;
        } else if (cLang === "nl") {
            nLang = 3;
        } else if (cLang === "rm") {
            nLang = 4;
        }
        if (nLang) {
            document.documentElement.setAttribute("lang", cLang);
        }
        $("bt_dice").getElementsByTagName("span")[0].innerHTML = lLoc[nLang].bt_dice.replace(/\s/g, "\u00a0");
        $("bt_yahtzee").getElementsByTagName("span")[0].innerHTML = lLoc[nLang].bt_yahtzee;

        $("lb_dev").innerHTML = lLoc[nLang].lb_dev;
        $("lb_and").innerHTML = " " + lLoc[nLang].lb_and + " ";
        $("lb_model").innerHTML = lLoc[nLang].lb_model;
        $("lb_puzzle").innerHTML = lLoc[nLang].lb_puzzle;
        $("lb_color").innerHTML = lLoc[nLang].lb_color;
        $("lb_instr").innerHTML = lLoc[nLang].lb_instr;

        document.querySelector("meta[name='description']").setAttribute("content", lLoc[nLang].lb_desc);

        // ServiceWorker initialisieren
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("sw.js").then(function (registration) {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                }, function (err) {
                    console.log("ServiceWorker registration failed: ", err);
                });
            });
        }

        Array.from(document.getElementsByClassName("todo")).forEach(function (rRow, index) {
            j = index;
            if (j > 5) {j += 1;}
            for (i = 1; i < 6; i += 1) {
                el4 = document.createElement("td");
                el1 = document.createElement("button");
                el1.id = "bt_" + j + "p" + i;
                el1.classList.add("mini-button", "xs");
                el2 = document.createElement("span");
                el2.className = "bttxt";
                el1.appendChild(el2);
                el4.appendChild(el1);
                el3 = document.createElement("div");
                el3.id = "lb_" + j + "p" + i;
                el3.className = "d_block score";
                el4.appendChild(el3);
                rRow.appendChild(el4);
            }
        });


        $("iInfo").addEventListener("click", function () {
            fShowPopup($pupupInfo);
        });
        $("iInfoClose").addEventListener("click", function () {
            fHidePopup($pupupInfo);
        });
        $("iSettings").addEventListener("click", function () {
            fShowPopup($popupSettings);
        });
        $("iSettingsClose").addEventListener("click", function () {
            closeSettings();
        });
        Array.from(document.getElementsByClassName("list-button-50")).forEach(function (rButton) {
            rButton.addEventListener("click", function (e) {
                set_number(e);
            });
        });
        Array.from(document.getElementsByClassName("list-button-20")).forEach(function (rButton) {
            rButton.addEventListener("click", function (e) {
                displayDice(e);
            });
        });
        Array.from(document.getElementsByClassName("list-button-col")).forEach(function (rButton) {
            rButton.addEventListener("click", function (e) {
                setColor(e);
            });
        });
        Array.from(document.getElementsByClassName("help")).forEach(function (rButton) {
            rButton.addEventListener("click", function (e) {
                $helptit.innerHTML = lLoc[nLang][e.target.id];
                $help.innerHTML = lLoc[nLang][e.target.id + "_txt"];
                fShowPopup($popupHelp);
            });
        });
        for (i = 0; i < 14; i += 1) {
            if (i === 6) {
                i = 7;
            }
            for (j = 1; j <= 5; j += 1) {
                $("bt_" + i + "p" + j).addEventListener("click", function (e) {
                    yahtzeeSetValue(e);
                });
            }
        }

        $("iClose").addEventListener("click", quit_dice);
        $bt_list.addEventListener("click", function () {
            $("iYahtzeeClose").parentElement.style.display = "block";
            fShowPopup($popupYahtzee);
        });
        $("iYahtzeeClose").addEventListener("click", close_list);
        $("iCloseHelp").addEventListener("click", function () {
            fHidePopup($popupHelp);
        });
        $popupHelp.addEventListener("click", function () {
            fHidePopup($popupHelp);
        });

        window.addEventListener("shake", shakeEventDidOccur, false);

        if (!localStorageOK) {
            $("b_instr").checked = true;
        } else {
            //localStorage.clear();
            if (localStorage.getItem("s_color") === null) {
                $("bt_col1").click();
            } else {
                $("bt_col" + (parseInt(localStorage.getItem("s_color")) + 1)).click();
            }
            if (localStorage.getItem("s_instr") === null) {
                $("b_instr").checked = true;
            } else {
                $("b_instr").checked = (localStorage.getItem("s_instr") === "true");
            }
        }

        $lbTotVal.style.display = "none";
        $lbTry.style.display = "none";
        container = document.createElement("div");
        $game.appendChild(container);

        camera = new THREE.PerspectiveCamera(35, gWindowsWidth / gWindowsHeight, 1, 15);
        camera.position.set(0, 0, 2.2);

        scene = new THREE.Scene();

        const onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + "% downloaded");
            }
        };

        const onError = function (xhr) {};

        const mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath("./models/");
        mtlLoader.load("dice.mtl", function (materials) {
            materials.preload();
            const objLoader = new THREE.OBJLoader();
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
        renderer.setSize(gWindowsWidth, gWindowsHeight);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        container.appendChild(renderer.domElement);

        container.addEventListener("mousedown", onDocumentMouseDown, false);
        container.addEventListener("touchstart", onDocumentTouchStart, false);
        container.addEventListener("touchmove", onDocumentTouchMove, false);
        container.addEventListener("touchend", onDocumentTouchEnd, false);

        window.addEventListener("resize", contentFormatting, false);
    }

    fInit();

}());
