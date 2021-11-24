/**
 * grrd's Dice
 * Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
!function(){"use strict";let e=0;const t=[{lb_desc:"grrd’s Dice is a 3D Dice Roller app and a Yahtzee game for one to five players.",lb_swipe:"Swipe or shake to roll the dice!",lb_lock:"Tap to lock a dice!",lb_web_gl:"Your browser does not support WebGL!",lb_help:"Tap on an icon to get help!",lb_color:"Color:",lb_instr:"Display instructions:",lb_anz:"Number of dice:",lb_anz_pl:"Number of players:",bt_dice:"Dice!",bt_yahtzee:"Yahtzee!",bt_start:"Start",bt_back:" Back",bt_close:" Close",lb_dev:" Developed by Gérard Tyedmers with",lb_and:"and",lb_or:" or",lb_model:" 3D-Model created with",lb_puzzle:"Have a look at my other games:",lb_yes:" Yes",lb_no:" No",lb_again:" Play again?",lb_game:" game played.",lb_games:" games played.",lb_player:" Player",lb_win:" wins!",lb_with:" with",lb_pts:" points",lb_name:" Your name:",lb_img:" Your image:",lb_played:" Games played:",lb_won:" Games won:",lb_sound:" Play sounds",lb_1:" Aces",lb_1_txt:" Sum of all aces",lb_2:" Twos",lb_2_txt:" Sum of all twos",lb_3:" Threes",lb_3_txt:" Sum of all threes",lb_4:" Fours",lb_4_txt:" Sum of all fours",lb_5:" Fives",lb_5_txt:" Sum of all fives",lb_6:" Sixes",lb_6_txt:" Sum of all sixes",lb_sum1:" Total",lb_sum1_txt:" Total upper section",lb_bonus:" Bonus 35 pts",lb_bonus_txt:" if total > 62",lb_sum2:" Total",lb_sum2_txt:" Total with bonus",lb_3kind:" 3 of a kind",lb_3kind_txt:" Sum of 3 identical dice",lb_4kind:" 4 of a kind",lb_4kind_txt:" Sum of 4 identical dice",lb_full_house:" Full House 25 pts",lb_full_house_txt:" 2 and 3 dice of a kind",lb_small_str:" Small Straight 30 pts",lb_small_str_txt:" Sequence of 4 dice",lb_big_str:" Large Straight 40 pts",lb_big_str_txt:" Sequence of 5 dice",lb_yahtzee:" Yahtzee 50 pts",lb_yahtzee_txt:" 5 of a kind",lb_chance:" Chance",lb_chance_txt:" Total of all 5 dice",lb_sum3:" Total",lb_sum3_txt:" Total lower section",lb_sum4:" Grand Total",lb_sum4_txt:" Upper + lower section"},{lb_desc:"grrd’s Dice ist eine 3D Würfel-App und ein Yahtzee (Kniffel, Yatzy) Spiel für 1 bis 5 Spieler.",lb_swipe:"Streiche oder schüttle zum Würfeln!",lb_lock:"Tippe, um einen Würfel zu sperren!",lb_web_gl:"Dein Browser unter- stützt WebGL nicht!",lb_help:"Tippe auf ein Icon für Hilfe!",lb_color:"Farbe:",lb_instr:"Anleitung einblenden:",lb_anz:"Anzahl Würfel:",lb_anz_pl:"Anzahl Spieler:",bt_dice:"Würfel!",bt_yahtzee:"Yahtzee!",bt_start:"Start",bt_back:" Zurück",bt_close:" Schliessen",lb_dev:" Entwickelt von Gérard Tyedmers mit",lb_and:"und",lb_or:" oder",lb_model:" 3D-Modell erstellt mit",lb_puzzle:"Schau dir auch meine anderen Spiele an:",lb_yes:" Ja",lb_no:" Nein",lb_again:" Nochmals spielen?",lb_game:" Spiel gespielt.",lb_games:" Spiele gespielt.",lb_player:" Spieler",lb_win:" gewinnt!",lb_with:" mit",lb_pts:" Punkten",lb_name:" Dein Name:",lb_img:" Dein Bild",lb_played:" Spiele gespielt:",lb_won:" Spiele gewonnen:",lb_sound:" Töne abspielen",lb_1:" Einer",lb_1_txt:" Summe aller Einer",lb_2:" Zweier",lb_2_txt:" Summe aller Zweier",lb_3:" Dreier",lb_3_txt:" Summe aller Dreier",lb_4:" Vierer",lb_4_txt:" Summe aller Vierer",lb_5:" Fünfer",lb_5_txt:" Summe aller Fünfer",lb_6:" Sechser",lb_6_txt:" Summe aller Sechser",lb_sum1:" Summe",lb_sum1_txt:" Summe obere Hälfte",lb_bonus:" Bonus 35 Pt.",lb_bonus_txt:" wenn Summe > 62 Pt.",lb_sum2:" Summe",lb_sum2_txt:" Summe mit Bonus",lb_3kind:" Dreierpasch",lb_3kind_txt:" Drei gleiche Würfel",lb_4kind:" Viererpasch",lb_4kind_txt:" Vier gleiche Würfel",lb_full_house:" Full House 25 Pt.",lb_full_house_txt:" 2 und 3 gleiche Würfel",lb_small_str:" Kleine Strasse 30 Pt.",lb_small_str_txt:" Reihenfolge mit 4 Würfeln",lb_big_str:" Grosse Strasse 40 Pt",lb_big_str_txt:" Reihenfolge mit 5 Würfeln",lb_yahtzee:" Yahtzee 50 Pt.",lb_yahtzee_txt:" Fünf gleiche Würfel",lb_chance:" Chance",lb_chance_txt:" Summe aller 5 Würfel",lb_sum3:" Summe",lb_sum3_txt:" Summe untere Hälfte",lb_sum4:" Summe Total",lb_sum4_txt:" obere + untere Hälfte"},{lb_desc:"grrd’s Dice est une application 3D pour jouer aux dés et un jeu Yahtzee (Yatzee, Yatzy) pour 1 à 5 joueurs.",lb_swipe:"Glissez ou secouez pour lancer les dés!",lb_lock:"Tapez pour verrouiller un dé!",lb_web_gl:"Votre navigateur ne supporte pas WebGL.",lb_help:"Tapez sur une icône pour obtenir de l'aide!",lb_color:"Couleur:",lb_instr:"Afficher les instructions:",lb_anz:"Nombre de dés:",lb_anz_pl:"Nombre de joueurs:",bt_dice:"Dés!",bt_yahtzee:"Yahtzee!",bt_start:"Démarrer",bt_back:" Retour",bt_close:" Fermer",lb_dev:" Développé par Gérard Tyedmers avec",lb_and:"et",lb_or:" ou",lb_model:" Modèle 3D créé avec",lb_puzzle:"Regardez aussi mes autres jeux:",lb_yes:" Oui",lb_no:" Non",lb_again:" Jouer à nouveau?",lb_game:" jeu joué.",lb_games:" jeux joués.",lb_player:" Joueur",lb_win:" gagne!",lb_with:" avec",lb_pts:" points",lb_name:" Votre nom:",lb_img:" Votre image:",lb_played:" Jeux joués:",lb_won:" Jeux gagnés:",lb_sound:" Jouer les sons",lb_1:" As",lb_1_txt:" Somme des 1 obtenus",lb_2:" Deux",lb_2_txt:" Somme des 2 obtenus",lb_3:" Trois",lb_3_txt:" Somme des 3 obtenus",lb_4:" Quatre",lb_4_txt:" Somme des 4 obtenus",lb_5:" Cinq",lb_5_txt:" Somme des 5 obtenus",lb_6:" Six",lb_6_txt:" Somme des 6 obtenus",lb_sum1:" Total",lb_sum1_txt:" Total 1ère section",lb_bonus:" Prime 35 pts",lb_bonus_txt:" Si total > 62",lb_sum2:" Total",lb_sum2_txt:" 1ère section + prime",lb_3kind:" Brelan",lb_3kind_txt:" 3 dés identiques",lb_4kind:" Carré",lb_4kind_txt:" 4 dés identiques",lb_full_house:" Full 25 pts",lb_full_house_txt:" 2 + 3 dés identiques",lb_small_str:" Petite suite 30 pts",lb_small_str_txt:" Suite de 4 dés",lb_big_str:" Grande suite 40 pts",lb_big_str_txt:" Suite  de 5 dés",lb_yahtzee:" Yahtzee 50 pts",lb_yahtzee_txt:" 5 dés identiques",lb_chance:" Chance",lb_chance_txt:" Somme des dés",lb_sum3:" Total",lb_sum3_txt:" Total 2ème section",lb_sum4:" Total global",lb_sum4_txt:" 1ère + 2ème section"},{lb_desc:"grrd's Dice is een 3D dobbelstenen app en een Yahtzee spel voor 1-5 spelers.",lb_swipe:"Veeg of schud om te dobbelen!",lb_lock:"Tik om de dobbelsteen te blokkeren!",lb_web_gl:"Uw browser ondersteunt geen WebGL!",lb_help:"Tik op een pictogram voor hulp!",lb_color:"Kleur:",lb_instr:"Instructies weergeven:",lb_anz:"Aantal dobbelstenen:",lb_anz_pl:"Aantal spelers:",bt_dice:"Dobbelstenen!",bt_yahtzee:"Yahtzee!",bt_start:"Begin",bt_back:" Terug",bt_close:" Sluiten",lb_dev:" Ontwikkeld door Gérard Tyedmers met",lb_and:"en",lb_or:" of",lb_model:" 3D-model gemaakt met",lb_puzzle:"Kijk eens naar mijn andere spelletjes:",lb_yes:" Ja",lb_no:" Nee",lb_again:" Speel opnieuw?",lb_game:" wedstrijd gespeeld.",lb_games:" wedstrijden gespeeld.",lb_player:" Speler",lb_win:" wint!",lb_with:" met",lb_pts:" punten",lb_name:" Jouw naam:",lb_img:" Uw afbeelding:",lb_played:" Gespeelde spellen:",lb_won:" Spellen gewonnen:",lb_sound:" Speel geluiden",lb_1:" Enen",lb_1_txt:" Som van alle enen",lb_2:" Tweeën",lb_2_txt:" Som van alle tweeën",lb_3:" Drieën",lb_3_txt:" Som van alle drieën",lb_4:" Vieren",lb_4_txt:" Som van alle vieren",lb_5:" Vijven",lb_5_txt:" Som van alle vijven",lb_6:" Zessen",lb_6_txt:" Som van alle zessen",lb_sum1:" Totaal",lb_sum1_txt:" van de bovenste helft",lb_bonus:" Bonus 35 ptn",lb_bonus_txt:" als de totale > 62",lb_sum2:" Totaal",lb_sum2_txt:" Bovenste helft + bonus",lb_3kind:" 3 dezelfde",lb_3kind_txt:" Som van 3 dezelfde",lb_4kind:" 4 dezelfde",lb_4kind_txt:" Som van 4 dezelfde",lb_full_house:" Full House 25 ptn",lb_full_house_txt:" 2 en 3 dezelfde",lb_small_str:" Kleine Straat 30 ptn",lb_small_str_txt:" 4 opeenvolgende nummers",lb_big_str:" Grote Straat 40 ptn",lb_big_str_txt:" 5 opeenvolgende nummers",lb_yahtzee:" Yahtzee 50 ptn",lb_yahtzee_txt:" 5 dezelfde",lb_chance:" Chance",lb_chance_txt:" Vrije keus",lb_sum3:" Totaal",lb_sum3_txt:" van de onderste helft",lb_sum4:" Totaal generaal",lb_sum4_txt:" bovenste + onderste helft"},{lb_desc:"grrd's Dice è ina app 3D per far ir dats e dar Yahtzee per in enfin tschintg giugaders.",lb_swipe:"Trair u scurlattar per far ir il dat!",lb_lock:"Tutgar per bloccar in dat!",lb_web_gl:"Tes navigatur na sustegna betg WebGL!",lb_help:"Tutga sin ina icone per retschaiver agid!",lb_color:"Colur:",lb_instr:"Visualisar ils instrucziuns:",lb_anz:"Dumber da dats:",lb_anz_pl:"Dumber da giugaders:",bt_dice:"Bittar ils dats!",bt_yahtzee:"Yahtzee!",bt_start:"Cumenzar",bt_back:" Enavos",bt_close:" Serrar",lb_dev:" Sviluppà da Gérard Tyedmers cun",lb_and:"e",lb_or:" u",lb_model:" Creà il model 3D cun",lb_puzzle:"Manchenta betg:",lb_yes:" Gea",lb_no:" Na",lb_again:" Giugar anc ina giada?",lb_game:" gieu",lb_games:" gieus",lb_player:" Giugader",lb_win:" gudagna!",lb_with:" cun",lb_pts:" puncts",lb_name:" Tes num:",lb_img:" Tes maletg:",lb_played:" Gieus:",lb_won:" Gieus gudignads:",lb_sound:" Far ir tuns",lb_1:" Puncts",lb_1_txt:" Summa da tut ils puncts",lb_2:" Da dus",lb_2_txt:" Dumber da tut ils da dus",lb_3:" Da trais",lb_3_txt:" Summa da tut ils da trais",lb_4:" Da quatter",lb_4_txt:" Summa da tut ils da quatter",lb_5:" Tschintgs",lb_5_txt:" Summa da tut ils tschintgs",lb_6:" Da sis",lb_6_txt:" Summa da tut ils da sis",lb_sum1:" Total",lb_sum1_txt:" Total da la secziun sura",lb_bonus:" Bonus 35 puncts",lb_bonus_txt:" sch'il total > 62",lb_sum2:" Total",lb_sum2_txt:" Secziun sura + il bonus",lb_3kind:" 3 d'ina sort",lb_3kind_txt:" Summa da 3 dats identics",lb_4kind:" 4 d'ina sort",lb_4kind_txt:" Summa da 4 dats identics",lb_full_house:" Full House 25 puncts",lb_full_house_txt:" 2 e 3 dats identics",lb_small_str:" Via pitschna 30 puncts",lb_small_str_txt:" Sequenza da 4 dats",lb_big_str:" Via gronda 40 puncts",lb_big_str_txt:" Sequenza da 5 dats",lb_yahtzee:" Yahtzee 50 puncts",lb_yahtzee_txt:" 5 d'ina sort",lb_chance:" Schanza",lb_chance_txt:" Total dals 5 dats",lb_sum3:" Total",lb_sum3_txt:" Total da la secziun sut",lb_sum4:" Total grond",lb_sum4_txt:" Secziun sura e sut"}];let l,n,s,a,o,i,r,_,b,d,u,c,m=[],p=[0,0,0,0,0],h=[0,0,0,0,0],f=[1,0,0,0,0],g=[0,0,0,0,0],y=[0,0,0,0,0],w=[1,0,0,0,0],k=[0,0,0,0,0],M=[0,0,0,0,0],x=[1,0,0,0,0],S=0,T=0,v=0,z=0,L=!0,E=!1,H=2,I=1,P=!1,D=!1,C=1,A=1,Y=0,B=!1,G=!1,N=!1,W=!1,j=[0,0,0,0,0,0],R=!1,q=[0,0,0,0,0],F=[!1,!1,!1,!1,!1],V=[],J=[];for(c=0;c<5;c+=1)J[c]=[];let O=[0,0,0,0,0],K=document.documentElement.clientHeight,X=document.documentElement.clientWidth,Z=X/2,U=K/2;const Q=new Shake({threshold:8,timeout:1e3}),$=function(){const e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(e){return!1}}(),ee=function(e){return document.getElementById(e)},te=ee("lb_tot_val"),le=ee("lb_try"),ne=ee("bt_list"),se=ee("img_lock0"),ae=ee("img_lock1"),oe=ee("img_lock2"),ie=ee("img_lock3"),re=ee("img_lock4"),_e=ee("iGame"),be=ee("iTitle"),de=ee("iPopupInfo"),ue=ee("iPopupSettings"),ce=ee("popup_yahtzee"),me=ee("iPopupHelp"),pe=ee("lb_helptit"),he=ee("lb_help"),fe=ee("grp_anz");function ge(l){document.querySelectorAll(".page:not(.swipe-out) > fieldset")[0].disabled=!0,l===me&&(document.querySelectorAll("#popup_yahtzee > fieldset")[0].disabled=!0),l.classList.remove("popup-init"),l.classList.remove("popup-hide"),l.classList.add("popup-show"),document.activeElement.blur(),l===ce&&(Q.stop(),E=!1,!W&&ee("b_instr").checked&&setTimeout(function(){pe.innerHTML="",he.innerHTML=t[e].lb_help,ge(me),W=!0},700))}function ye(e){1===document.getElementsByClassName("popup-show").length&&(document.querySelectorAll(".page:not(.swipe-out) > fieldset")[0].disabled=!1),e===me&&(document.querySelectorAll("#popup_yahtzee > fieldset")[0].disabled=!1),e.classList.remove("popup-show"),e.classList.add("popup-hide"),setTimeout(function(){e.scrollTop=0},1050)}function we(){let e;if(!L||!R){for(ye(me),te.style.display="none",le.style.display="none",e=0;e<I;e+=1)F[e]||(p[e]=Math.round((p[e]+30*Math.random()-15)/Math.PI*2)*Math.PI/2,g[e]=Math.round((g[e]+30*Math.random()-15)/Math.PI*2)*Math.PI/2,k[e]=Math.round((k[e]+30*Math.random()-15)/Math.PI*2)*Math.PI/2);R=!0}}function ke(e){let t;if(S=e.clientX-Z,v=e.clientY-U,!L||!R)for(t=0;t<I;t+=1)F[t]||(p[t]=h[t]+.08*(S-T)*f[t],g[t]=y[t]+.08*(v-z)*w[t],k[t]=M[t]+(.08*(S-T)*x[t]+.08*(v-z)*x[t])/2)}function Me(){let e,t,l,n=0;for(e=0;e<V.length;e+=1)V[e]=0;for(e=0;e<j.length;e+=1){if(V[e]=j[e]*(e+1),j[e]>=3&&(V[7]=3*(e+1)),j[e]>=4&&(V[8]=4*(e+1)),j[e]>=5&&(V[12]=50),j[e]>=5&&(V[9]=25),3===j[e])for(t=0;t<j.length;t+=1)2===j[t]&&(V[9]=25);j[e]>=1?n+=1:n=0,n>=4&&(V[10]=30),n>=5&&(V[11]=40)}for(V[13]=r,e=0;e<V.length;e+=1)6===e&&(e=7),null===J[C-1][e]&&(l=ee("bt_"+e+"p"+C),ee("lb_"+e+"p"+C).style.display="none",l.style.display="block",l.firstChild.innerHTML=V[e]);ee("iYahtzeeClose").parentElement.style.display="none",ge(ce)}function xe(){let e;for(e=0;e<I;e+=1)F[e]||(p[e]=h[e],g[e]=y[e],k[e]=M[e]);if(1!==A&&!R)for(K>X?(S<0&&v>K/15&&(F[4]=!F[4],re.style.display=F[4]?"block":"none"),S>0&&v>K/15&&(F[1]=!F[1],ae.style.display=F[1]?"block":"none"),S>K/-15&&S<K/15&&v>K/-15&&v<K/15&&(F[2]=!F[2],oe.style.display=F[2]?"block":"none"),S<0&&v<K/-15&&(F[3]=!F[3],ie.style.display=F[3]?"block":"none"),S>0&&v<K/-15&&(F[0]=!F[0],se.style.display=F[0]?"block":"none")):(v<0&&S>K/15&&(F[0]=!F[0],se.style.display=F[0]?"block":"none"),v>0&&S>K/15&&(F[1]=!F[1],ae.style.display=F[1]?"block":"none"),v>K/-15&&v<K/15&&S>K/-15&&S<K/15&&(F[2]=!F[2],oe.style.display=F[2]?"block":"none"),v<0&&S<K/-15&&(F[3]=!F[3],ie.style.display=F[3]?"block":"none"),v>0&&S<K/-15&&(F[4]=!F[4],re.style.display=F[4]?"block":"none")),e=0;e<I&&F[e];e+=1)e===I-1&&Me()}function Se(){let e;for(e=0;e<5;e+=1)F[e]=!1,ee("img_lock"+e).style.display="none"}function Te(e){let t;if(S=e.clientX-Z,v=e.clientY-U,l.removeEventListener("mousemove",ke,!1),l.removeEventListener("mouseup",ve,!1),l.removeEventListener("mouseout",ze,!1),!L||!R){for(Math.abs(S-T)<5&&Math.abs(v-z)<5&&L&&(D=!0,new Date-o<300&&xe()),t=0;t<I;t+=1)F[t]||(p[t]=Math.round(p[t]/Math.PI*2)*Math.PI/2,g[t]=Math.round(g[t]/Math.PI*2)*Math.PI/2,k[t]=Math.round(k[t]/Math.PI*2)*Math.PI/2);R=!0}}function ve(e){Te(e)}function ze(e){Te(e)}function Le(e){let t;for(te.style.display="none",le.style.display="none",e.preventDefault(),l.addEventListener("mousemove",ke,!1),l.addEventListener("mouseup",ve,!1),l.addEventListener("mouseout",ze,!1),T=e.clientX-Z,z=e.clientY-U,o=new Date,t=0;t<I;t+=1)h[t]=p[t],y[t]=g[t],M[t]=k[t],t>0&&(f[t]=Math.random()+.5,w[t]=Math.random()+.5,x[t]=Math.random()+.5)}function Ee(e){let t;if(e.preventDefault(),!L||!R){for(!1===P&&L&&(D=!0,new Date-o<500&&(S=T,v=z,xe())),t=0;t<I;t+=1)F[t]||(p[t]=Math.round(p[t]/Math.PI*2)*Math.PI/2,g[t]=Math.round(g[t]/Math.PI*2)*Math.PI/2,k[t]=Math.round(k[t]/Math.PI*2)*Math.PI/2);R=!0}}function He(e){let t;if(P=!0,1===e.touches.length){if(e.preventDefault(),S=e.touches[0].pageX-Z,v=e.touches[0].pageY-U,L&&R)return;for(t=0;t<I;t+=1)F[t]||(p[t]=h[t]+.06*(S-T)*f[t],g[t]=y[t]+.06*(v-z)*w[t],k[t]=M[t]+(.06*(S-T)*x[t]+.02*(v-z)*x[t])/2)}}function Ie(e){let t;if(o=new Date,P=!1,1===e.touches.length)for(e.preventDefault(),te.style.display="none",le.style.display="none",T=e.touches[0].pageX-Z,z=e.touches[0].pageY-U,o=new Date,t=0;t<I;t+=1)h[t]=p[t],y[t]=g[t],M[t]=k[t],t>0&&(f[t]=Math.random()+.5,w[t]=Math.random()+.5,x[t]=Math.random()+.5)}function Pe(){E&&(window.requestAnimationFrame(Pe),function(){let l,o;for(i=0,l=0;l<I;l+=1)m[l].rotation.y+=.05*(p[l]-m[l].rotation.y),m[l].rotation.x+=.05*(g[l]-m[l].rotation.x),m[l].rotation.z+=.05*(k[l]-m[l].rotation.z),i=Math.max(i,Math.abs(m[l].rotation.y-p[l])+Math.abs(m[l].rotation.x-g[l])+Math.abs(m[l].rotation.z-k[l]));if(i<.01&&R){for(R=!1,o=0;o<2;o+=1)for(r=0,j=[0,0,0,0,0,0],l=0;l<I;l+=1)b=(Math.round(g[l]%(2*Math.PI)/Math.PI*2)+4)%4,d=(Math.round(p[l]%(2*Math.PI)/Math.PI*2)+4)%4,u=(Math.round(k[l]%(2*Math.PI)/Math.PI*2)+4)%4,q[l]=0,0===b&&0===d||2===b&&2===d?q[l]=1:3===b&&1===u||1===b&&3===u||0===b&&1===d&&0===u||2===b&&3===d&&0===u||2===b&&1===d&&2===u||0===b&&3===d&&2===u?q[l]=2:3===b&&0===u||1===b&&2===u||0===b&&1===d&&3===u||0===b&&3===d&&1===u||2===b&&1===d&&1===u||2===b&&3===d&&3===u?q[l]=3:1===b&&0===u||3===b&&2===u||0===b&&3===d&&3===u||2===b&&1===d&&3===u||0===b&&1===d&&1===u||2===b&&3===d&&1===u?q[l]=4:3===b&&3===u||1===b&&1===u||0===b&&3===d&&0===u||2===b&&3===d&&2===u||0===b&&1===d&&2===u||2===b&&1===d&&0===u?q[l]=5:(0===b&&2===d||2===b&&0===d)&&(q[l]=6),r+=q[l],j[q[l]-1]=j[q[l]-1]+1;L?(N||1!==A||D||!ee("b_instr").checked||(pe.innerHTML="",he.innerHTML=t[e].lb_lock,ge(me),N=!0),D?D=!1:A+=1,le.innerHTML=A+" / 3",le.style.display="block",te.innerHTML=t[e].lb_player+" "+C,A>3&&Me()):te.innerHTML=r,te.style.display="block"}a.render(s,n)}())}function De(){if(K=document.documentElement.clientHeight,X=document.documentElement.clientWidth,Z=X/2,U=K/2,K>X){if(void 0!==m[0]&&null!==m[0])switch(I){case 1:m[0].position.set(0,0,0),n.position.set(0,0,2.2);break;case 2:m[0].position.set(0,.45,0),m[1].position.set(0,-.45,0),n.position.set(0,0,3);break;case 3:m[0].position.set(0,.9,0),m[1].position.set(0,0,0),m[2].position.set(0,-.9,0),n.position.set(0,0,4.2);break;case 4:m[0].position.set(.45,.45,0),m[1].position.set(-.45,.45,0),m[2].position.set(.45,-.45,0),m[3].position.set(-.45,-.45,0),n.position.set(0,0,4.2);break;case 5:m[0].position.set(.45,.9,0),m[1].position.set(.45,-.9,0),m[2].position.set(0,0,0),m[3].position.set(-.45,.9,0),m[4].position.set(-.45,-.9,0),n.position.set(0,0,5.6)}}else if(void 0!==m[0]&&null!==m[0])switch(I){case 1:m[0].position.set(0,0,0),n.position.set(0,0,1.8);break;case 2:m[0].position.set(.45,0,0),m[1].position.set(-.45,0,0),n.position.set(0,0,2.2);break;case 3:m[0].position.set(.9,0,0),m[1].position.set(0,0,0),m[2].position.set(-.9,0,0),n.position.set(0,0,3);break;case 4:m[0].position.set(.45,.45,0),m[1].position.set(-.45,.45,0),m[2].position.set(.45,-.45,0),m[3].position.set(-.45,-.45,0),n.position.set(0,0,3);break;case 5:m[0].position.set(.9,.45,0),m[1].position.set(.9,-.45,0),m[2].position.set(0,0,0),m[3].position.set(-.9,.45,0),m[4].position.set(-.9,-.45,0),n.position.set(0,0,4)}n.aspect=X/K,n.updateProjectionMatrix(),a.setSize(X,K)}function Ce(){let e;for(Q.stop(),E=!1,te.style.display="none",le.style.display="none",ee("bt_dice_yahtzee").classList.remove("swipe-out-bottom"),fe.classList.remove("swipe-in-bottom"),Se(),be.classList.remove("swipe-out"),_e.classList.remove("swipe-in"),be.classList.add("swipe-out-right"),_e.classList.add("swipe-in-left"),document.getElementsByTagName("FIELDSET")[0].disabled=!1,e=0;e<I;e+=1)m[e].rotation.y=p[e],m[e].rotation.x=g[e],m[e].rotation.z=k[e];R=!1}function Ae(e){m[e]=m[0].clone(),m[e].rotation.y=-Math.PI/2,p[e]=Math.round((p[e]+30*Math.random()-15)/Math.PI*2)*Math.PI/2,g[e]=Math.round((g[e]+30*Math.random()-15)/Math.PI*2)*Math.PI/2,k[e]=Math.round((k[e]+30*Math.random()-15)/Math.PI*2)*Math.PI/2,m[e].rotation.y=p[e],m[e].rotation.x=g[e],m[e].rotation.z=k[e]}function Ye(e){let t;if(e>I)for(t=I;t<e;t+=1)void 0!==m[t]&&null!==m[t]||Ae(t),s.add(m[t]);if(I>e)for(t=e;t<I;t+=1)s.remove(m[t]);I=e,De()}function Be(){ye(ce),Q.start(),E=!0,Pe(),B&&(B=!1,Ce())}function Ge(){$&&(localStorage.setItem("s_color",Y),localStorage.setItem("s_instr",ee("b_instr").checked)),De(),ye(ue)}function Ne(l){const n=l.target.id.substring(3,l.target.id.indexOf("p"));let s,a=!1;for(J[C-1][n]=V[n],ee("lb_"+n+"p"+C).innerHTML=V[n],r=0,s=0;s<V.length;s+=1)6===s&&(s=7),ee("bt_"+s+"p"+C).style.display="none",ee("lb_"+s+"p"+C).style.display="inline",r+=J[C-1][s],5===s&&(ee("lb_sum1p"+C).innerHTML=r,r>=63&&(ee("lb_bonus_p"+C).innerHTML="35",r+=35),_=r,ee("lb_sum2p"+C).innerHTML=r);for(ee("lb_sum3p"+C).innerHTML=r-_,ee("lb_sum4p"+C).innerHTML=r,O[C-1]=r,s=0;s<V.length;s+=1)null===J[C-1][s]&&6!==s&&(a=!0);a||C!==H?((C+=1)>H&&(C=1),A=1,le.innerHTML=A+" / 3",te.innerHTML=t[e].lb_player+" "+C,Se(),Be()):(s=O.indexOf(Math.max.apply(Math,O)),pe.innerHTML=t[e].lb_player+" "+(s+1)+" "+t[e].lb_win,he.innerHTML=t[e].lb_with+" "+O[s]+" "+t[e].lb_pts,ee("iYahtzeeClose").parentElement.style.display="block",ge(me),B=!0)}function We(l){const n=[[[.75,0,.07],[1,1,1]],[[.09,.2,.55],[1,1,1]],[[.9,.5,.005],[1,1,1]],[[.017,.292,.243],[1,1,1]],[[.65,.65,.65],[.06,.06,.06]]];E=!0,L?(H=parseInt(l.target.getAttribute("data-num"),10),Ye(5),Ge(),function(){let l,n,s,a;for(l=0;l<14;l+=1)for(V[l]=0,n=0;n<5;n+=1)6===l&&(l=7),J[n][l]=null,ee("bt_"+l+"p"+(n+1)).style.display="none",(s=ee("lb_"+l+"p"+(n+1))).style.display="inline",s.innerHTML="";for(n=0;n<5;n+=1)(a=ee("img_p"+(n+1))).style.width="100%",n<H?(a.style.backgroundColor="#CC002F",ee("lb_sum1p"+(n+1)).innerHTML="0",ee("lb_sum2p"+(n+1)).innerHTML="0",ee("lb_sum3p"+(n+1)).innerHTML="0",ee("lb_sum4p"+(n+1)).innerHTML="0"):(a.style.backgroundColor="#AAAAAA",ee("lb_sum1p"+(n+1)).innerHTML="",ee("lb_sum2p"+(n+1)).innerHTML="",ee("lb_sum3p"+(n+1)).innerHTML="",ee("lb_sum4p"+(n+1)).innerHTML=""),ee("lb_bonus_p"+(n+1)).innerHTML="",O[n]=0;C=1,A=1,Se(),te.innerHTML=t[e].lb_player+" "+C,le.innerHTML=A+" / 3",te.style.display="block",le.style.display="block"}(),ne.style.display="block"):(Ye(parseInt(l.target.getAttribute("data-num"),10)),te.style.display="none",le.style.display="none",ne.style.display="none",Se()),Q.start(),Pe(),m[0].children[0].material[0].color.setRGB(n[parseInt(Y)][0][0],n[parseInt(Y)][0][1],n[parseInt(Y)][0][2]),m[0].children[0].material[1].color.setRGB(n[parseInt(Y)][1][0],n[parseInt(Y)][1][1],n[parseInt(Y)][1][2]),document.getElementsByTagName("FIELDSET")[0].disabled=!0,be.classList.remove("swipe-out-right"),_e.classList.remove("swipe-in-left"),be.classList.add("swipe-out"),_e.classList.add("swipe-in"),!G&&ee("b_instr").checked&&setTimeout(function(){pe.innerHTML="",he.innerHTML=t[e].lb_swipe,ge(me),G=!0},700)}function je(e,t,l,n,a){const o=new THREE.DirectionalLight(n,a);o.position.set(e,t,l),s.add(o),o.castShadow=!0;o.shadow.camera.left=-1,o.shadow.camera.right=1,o.shadow.camera.top=1,o.shadow.camera.bottom=-1,o.shadow.camera.near=1,o.shadow.camera.far=4,o.shadow.mapSize.width=1024,o.shadow.mapSize.height=1024,o.shadow.bias=-.005}document.onkeydown=function(e){switch(e.key){case"Escape":let t=document.getElementsByClassName("popup-show"),l=t.length;l>0?t[l-1]===ce?"block"===ee("iYahtzeeClose").parentElement.style.display&&Be():ye(t[l-1]):!0===_e.classList.contains("swipe-in")&&Ce()}},function(){let o,i,r,_,b,d;const u=(function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");const t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(window.location.href);return null!==t&&t[1]}("lang")||navigator.language||navigator.browserLanguage||(navigator.languages||["en"])[0]).substring(0,2).toLowerCase();"de"===u?e=1:"fr"===u?e=2:"nl"===u?e=3:"rm"===u&&(e=4),e&&document.documentElement.setAttribute("lang",u),ee("bt_dice").getElementsByTagName("span")[0].innerHTML=t[e].bt_dice.replace(/\s/g," "),ee("bt_yahtzee").getElementsByTagName("span")[0].innerHTML=t[e].bt_yahtzee,ee("lb_dev").innerHTML=t[e].lb_dev,ee("lb_and").innerHTML=" "+t[e].lb_and+" ",ee("lb_model").innerHTML=t[e].lb_model,ee("lb_puzzle").innerHTML=t[e].lb_puzzle,ee("lb_color").innerHTML=t[e].lb_color,ee("lb_instr").innerHTML=t[e].lb_instr,document.querySelector("meta[name='description']").setAttribute("content",t[e].lb_desc),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})}),Array.from(document.getElementsByClassName("todo")).forEach(function(e,t){for((i=t)>5&&(i+=1),o=1;o<6;o+=1)d=document.createElement("td"),(r=document.createElement("button")).id="bt_"+i+"p"+o,r.classList.add("mini-button","xs"),(_=document.createElement("span")).className="bttxt",r.appendChild(_),d.appendChild(r),(b=document.createElement("div")).id="lb_"+i+"p"+o,b.className="d_block score",d.appendChild(b),e.appendChild(d)}),ee("iInfo").addEventListener("click",function(){ge(de)}),ee("iInfoClose").addEventListener("click",function(){ye(de)}),ee("iSettings").addEventListener("click",function(){ge(ue)}),ee("iSettingsClose").addEventListener("click",function(){Ge()}),Array.from(document.getElementsByClassName("list-button-50")).forEach(function(l){l.addEventListener("click",function(l){!function(l){L="true"===l.target.getAttribute("data-yahtzee"),ee("lb_anz").innerHTML=L?t[e].lb_anz_pl:t[e].lb_anz,ee("bt_dice_yahtzee").classList.add("swipe-out-bottom"),setTimeout(function(){fe.classList.remove("swipe-out-bottom"),fe.classList.add("swipe-in-bottom")},500)}(l)})}),Array.from(document.getElementsByClassName("list-button-20")).forEach(function(e){e.addEventListener("click",function(e){We(e)})}),Array.from(document.getElementsByClassName("list-button-col")).forEach(function(e){e.addEventListener("click",function(e){!function(e){Y=parseInt(e.target.getAttribute("data-num"),10),Array.from(document.getElementsByClassName("list-button-col")).forEach(function(e){e.classList.remove("selected")}),e.target.classList.add("selected")}(e)})}),Array.from(document.getElementsByClassName("help")).forEach(function(l){l.addEventListener("click",function(l){pe.innerHTML=t[e][l.target.id],he.innerHTML=t[e][l.target.id+"_txt"],ge(me)})});for(o=0;o<14;o+=1)for(6===o&&(o=7),i=1;i<=5;i+=1)ee("bt_"+o+"p"+i).addEventListener("click",function(e){Ne(e)});ee("iClose").addEventListener("click",Ce),ne.addEventListener("click",function(){ee("iYahtzeeClose").parentElement.style.display="block",ge(ce)}),ee("iYahtzeeClose").addEventListener("click",Be),ee("iCloseHelp").addEventListener("click",function(){ye(me)}),me.addEventListener("click",function(){ye(me)}),window.addEventListener("shake",we,!1),$?(null===localStorage.getItem("s_color")?ee("bt_col1").click():ee("bt_col"+(parseInt(localStorage.getItem("s_color"))+1)).click(),null===localStorage.getItem("s_instr")?ee("b_instr").checked=!0:ee("b_instr").checked="true"===localStorage.getItem("s_instr")):ee("b_instr").checked=!0,te.style.display="none",le.style.display="none",l=document.createElement("div"),_e.appendChild(l),(n=new THREE.PerspectiveCamera(35,X/K,1,15)).position.set(0,0,2.2),s=new THREE.Scene;const c=function(e){if(e.lengthComputable){const t=e.loaded/e.total*100;console.log(Math.round(t,2)+"% downloaded")}},p=function(e){},h=new THREE.MTLLoader;h.setPath("./models/"),h.load("dice.mtl",function(e){e.preload();const t=new THREE.OBJLoader;t.setMaterials(e),t.setPath("./models/"),t.load("dice.obj",function(e){s.add(e),m[0]=e},c,p)}),s.add(new THREE.AmbientLight(7829367)),je(.5,1,-1,16777215,.7),je(-1,1,1,16777215,1),(a=new THREE.WebGLRenderer({antialias:!0,alpha:!0})).setClearColor(0,0),a.setPixelRatio(window.devicePixelRatio),a.setSize(X,K),a.gammaInput=!0,a.gammaOutput=!0,l.appendChild(a.domElement),l.addEventListener("mousedown",Le,!1),l.addEventListener("touchstart",Ie,!1),l.addEventListener("touchmove",He,!1),l.addEventListener("touchend",Ee,!1),window.addEventListener("resize",De,!1)}()}();