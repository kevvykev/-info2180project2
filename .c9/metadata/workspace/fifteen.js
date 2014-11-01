{"filter":false,"title":"fifteen.js","tooltip":"/fifteen.js","undoManager":{"mark":1,"position":1,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":2}},"text":"/*"},{"action":"insertText","range":{"start":{"row":0,"column":2},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":65,"column":0}},"lines":["CSE 190 M, Spring 2009, Marty Stepp","Homework 6 (Fifteen Puzzle) style sheet","*/","","body {","\tbackground-color: white;","\tfont-family: cursive;","\tfont-size: 14pt;","}","","#controls, #overall, #puzzlearea {","\twidth: 400px;","}","","#controls {","\tpadding-top: 10px;","\ttext-align: center;","}","","h1 {","\tmargin: 10px 0px;","\ttext-align: center;","}","","/* Used to center the puzzle. */","#overall {","\tmargin-left: auto;","\tmargin-right: auto;","}","","/* The area that holds the 15 puzzle pieces. */","#puzzlearea {","\tfont-family: sans-serif;","\tfont-size: 32pt;","\theight: 400px;","\tpadding: 0px;","\tposition: relative;","}","","/* This class should be applied to each of the 15 puzzle pieces. */",".puzzlepiece {","\tbackground-image: url(background.jpg);","\tborder: 2px solid black;","\theight: 96px;","\tline-height: 96px;","\tposition: absolute;","\ttext-align: center;","\tvertical-align: middle;","\twidth: 96px;","}","","/* This class should be applied to a puzzle piece that can be moved. */",".movablepiece:hover {","\tborder-color: red;","\tcolor: #006600;","\ttext-decoration: underline;","}","","#w3c {","\ttext-align: right;","}","","#w3c img {","\tborder: none;"]},{"action":"insertText","range":{"start":{"row":65,"column":0},"end":{"row":65,"column":1}},"text":"}"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":65,"column":0},"end":{"row":65,"column":1}},"text":"}"},{"action":"removeLines","range":{"start":{"row":0,"column":0},"end":{"row":65,"column":0}},"nl":"\n","lines":["/*","CSE 190 M, Spring 2009, Marty Stepp","Homework 6 (Fifteen Puzzle) style sheet","*/","","body {","\tbackground-color: white;","\tfont-family: cursive;","\tfont-size: 14pt;","}","","#controls, #overall, #puzzlearea {","\twidth: 400px;","}","","#controls {","\tpadding-top: 10px;","\ttext-align: center;","}","","h1 {","\tmargin: 10px 0px;","\ttext-align: center;","}","","/* Used to center the puzzle. */","#overall {","\tmargin-left: auto;","\tmargin-right: auto;","}","","/* The area that holds the 15 puzzle pieces. */","#puzzlearea {","\tfont-family: sans-serif;","\tfont-size: 32pt;","\theight: 400px;","\tpadding: 0px;","\tposition: relative;","}","","/* This class should be applied to each of the 15 puzzle pieces. */",".puzzlepiece {","\tbackground-image: url(background.jpg);","\tborder: 2px solid black;","\theight: 96px;","\tline-height: 96px;","\tposition: absolute;","\ttext-align: center;","\tvertical-align: middle;","\twidth: 96px;","}","","/* This class should be applied to a puzzle piece that can be moved. */",".movablepiece:hover {","\tborder-color: red;","\tcolor: #006600;","\ttext-decoration: underline;","}","","#w3c {","\ttext-align: right;","}","","#w3c img {","\tborder: none;"]},{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":1}},"text":" "},{"action":"insertText","range":{"start":{"row":0,"column":1},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":254,"column":0}},"lines":["\"use strict\";","var div;","var blink;","var timer;","var verticalSpace;","var horizontalSpace;","","window.onload = function ()","{","\tvar puzzlearea = document.getElementById('puzzlearea');","\t","\tdiv = puzzlearea.getElementsByTagName('div');","","\tfor (var i=0; i<div.length; i++)","\t{","\t    div[i].style.backgroundImage=\"url('pic1.jpg')\";","\t\tdiv[i].className = 'puzzlepiece';","\t\tdiv[i].style.left = (i%4*100)+'px';","\t\tdiv[i].style.top = (parseInt(i/4)*100) + 'px';","\t\tdiv[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;","\t\tdiv[i].onmouseover = function()","\t\t{","\t\t\tif (checkCanMove(parseInt(this.innerHTML)))","\t\t\t{","\t\t\t\tthis.style.border = \"2px solid DarkTurquoise\";","\t\t\t\tthis.style.color = \"#006600\";","\t\t\t}","\t\t};","\t\tdiv[i].onmouseout = function()","\t\t{","\t\t\tthis.style.border = \"2px solid DarkTurquoise\";","\t\t\tthis.style.color = \"#000000\";","\t\t};","","\t\tdiv[i].onclick = function()","\t\t{","\t\t\tif (checkCanMove(parseInt(this.innerHTML)))","\t\t\t{","\t\t\t\tswap(this.innerHTML-1);","\t\t\t\tif (checkFinish())","\t\t\t\t{","\t\t\t\t\tyouWin();","\t\t\t\t}","\t\t\t\treturn;","\t\t\t}","\t\t};","\t}","","\thorizontalSpace = '300px';","\tverticalSpace = '300px';","","\tvar shufflebutton = document.getElementById('shufflebutton');","\tshufflebutton.onclick = function()","\t{","","\t\tfor (var i=0; i<250; i++)","\t\t{","\t\t\tvar rand = parseInt(Math.random()* 100) %4;","\t\t\tif (rand == 0)","\t\t\t{","\t\t\t\tvar tmp = calcUp(horizontalSpace, verticalSpace);","\t\t\t\tif ( tmp != -1)","\t\t\t\t{","\t\t\t\t\tswap(tmp);","\t\t\t\t}","\t\t\t}","\t\t\tif (rand == 1)","\t\t\t{","\t\t\t\tvar tmp = calcDown(horizontalSpace, verticalSpace);","\t\t\t\tif ( tmp != -1) ","\t\t\t\t{","\t\t\t\t\tswap(tmp);","\t\t\t\t}","\t\t\t}","","\t\t\tif (rand == 2)","\t\t\t{","\t\t\t\tvar tmp = calcLeft(horizontalSpace, verticalSpace);","\t\t\t\tif ( tmp != -1)","\t\t\t\t{","\t\t\t\t\tswap(tmp);","\t\t\t\t}","\t\t\t}","","\t\t\tif (rand == 3)","\t\t\t{","\t\t\t\tvar tmp = calcRight(horizontalSpace, verticalSpace);","\t\t\t\tif (tmp != -1)","\t\t\t\t{","\t\t\t\t\tswap(tmp);","\t\t\t\t}","\t\t\t}","\t\t}","\t};","};","","function checkCanMove(pos)","{","\tif (calcLeft(horizontalSpace, verticalSpace) == (pos-1))","\t{","\t\treturn true;","\t}","","\tif (calcDown(horizontalSpace, verticalSpace) == (pos-1))","\t{","\t\treturn true;","\t}","","\tif (calcUp(horizontalSpace, verticalSpace) == (pos-1))","\t{","\t\treturn true;","\t}","","\tif (calcRight(horizontalSpace, verticalSpace) == (pos-1))","\t{","\t\treturn true;","\t}","}","function Blink()","{","\tblink --;","\tif (blink == 0)","\t{","\t\tvar body = document.getElementsByTagName('body');","\t\tbody[0].style.backgroundColor = \"#00BFFF\";","\t\talert('you win');","\t\treturn;","\t}","\tif (blink % 2)","\t{","\t\tvar body = document.getElementsByTagName('body');","\t\tbody[0].style.backgroundColor = \"#48D1CC\";\t","\t}","\telse","\t{","\t\tvar body = document.getElementsByTagName('body');","\t\tbody[0].style.backgroundColor = \"#FF0000\";","\t}","\ttimer = setTimeout(Blink, 100);","}","","function youWin()","{","\tvar body = document.getElementsByTagName('body');","\tbody[0].style.backgroundColor = \"#FF0000\";","\tblink = 10;","\ttimer = setTimeout(Blink, 100);","}","","function checkFinish()","{","\tvar flag = true;","\tfor (var i = 0; i < div.length; i++) {","\t\tvar y = parseInt(div[i].style.top);","\t\tvar x = parseInt(div[i].style.left);","","\t\tif (x != (i%4*100) || y != parseInt(i/4)*100)","\t\t{","\t\t\tflag = false;","\t\t\tbreak;","\t\t}","\t}","\treturn flag;","}","","function calcLeft(x, y)","{","\tvar xx = parseInt(x);","\tvar yy = parseInt(y);","","\tif (xx > 0)","\t{","\t\tfor (var i = 0; i < div.length; i++) ","\t\t{","\t\t\tif (parseInt(div[i].style.left) + 100 == xx && parseInt(div[i].style.top) == yy)","\t\t\t{","\t\t\t\treturn i;","\t\t\t} ","\t\t}","\t}","\telse ","\t{","\t\treturn -1;","\t}","}","","function calcRight (x, y) {","\tvar xx = parseInt(x);","\tvar yy = parseInt(y);","\tif (xx < 300)","\t{","\t\tfor (var i =0; i<div.length; i++){","\t\t\tif (parseInt(div[i].style.left) - 100 == xx && parseInt(div[i].style.top) == yy) ","\t\t\t{","\t\t\t\treturn i;","\t\t\t}","\t\t}","\t}","\telse","\t{","\t\treturn -1;","\t} ","}","","function calcUp (x, y) {","\tvar xx = parseInt(x);","\tvar yy = parseInt(y);","\tif (yy > 0)","\t{","\t\tfor (var i=0; i<div.length; i++)","\t\t{","\t\t\tif (parseInt(div[i].style.top) + 100 == yy && parseInt(div[i].style.left) == xx) ","\t\t\t{","\t\t\t\treturn i;","\t\t\t}","\t\t} ","\t}","\telse ","\t{","\t\treturn -1;","\t}","}","","function calcDown (x, y)","{","\tvar xx = parseInt(x);","\tvar yy = parseInt(y);","\tif (yy < 300)","\t{","\t\tfor (var i=0; i<div.length; i++)","\t\t{","\t\t\tif (parseInt(div[i].style.top) - 100 == yy && parseInt(div[i].style.left) == xx) ","\t\t\t{","\t\t\t\treturn i;","\t\t\t}","\t\t}","\t}","\telse","\t{","\t\treturn -1;","\t} ","}","","function swap (pos) {","\tvar temp = div[pos].style.top;","\tdiv[pos].style.top = verticalSpace;","\tverticalSpace = temp;","","\ttemp = div[pos].style.left;","\tdiv[pos].style.left = horizontalSpace;","\thorizontalSpace = temp;","}",""]}]}]]},"ace":{"folds":[],"scrolltop":3120,"scrollleft":0,"selection":{"start":{"row":254,"column":0},"end":{"row":254,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":221,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1414809796395,"hash":"6a5eb487675ac260aafe04cfec87fcbc44005732"}