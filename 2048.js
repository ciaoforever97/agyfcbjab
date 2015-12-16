/**
 * Created by Utente on 13/05/2015.
 */

var values = [];

function keyhandler(e) {
    switch (e.keyCode) {
        case 37:
            go(0);
            break;
        case 38:
            go(1);
            break;
        case 39:
            go(2);
            break;
        case 40:
            go(3);
            break;
    }
}

function go(direction) {
    var k = rotate(values, direction);
    k = move(k);
    k = rotate(k, -direction);
    values = k;
    addrandom();
    display();
}

function move(k) {
    var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var r = 0; r < 4; r++) {
        var nr = [];
        var pre = 0;
        for (var c = 0; c < 4; c++) {
            var v = k[r * 4 + c];
            if (v) {
                if (pre && pre == v) {
                    nr[nr.length - 1] = 2 * v;
                    pre = 0;
                }
                else {
                    nr.push(v);
                    pre = v;
                }
            }
        }
        nr.forEach(function (nrv, i) {
            m[r * 4 + i] = nrv;
        });
    }
    return m;
}

function rotate(k, direction) {
    var m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
            m[r * 4 + c] = k[calcY(direction, c, r) * 4 + calcX(direction, c, r)];  //calc(direction,k);
        }
    }
    return m;
}

function calcX(direction, x, y) {
    if (direction < 0) direction = 4 + direction;
    switch (direction) {
        case 0:
            return x;
        case 1:
            return 4 - y - 1;
        case 2:
            return 4 - x - 1;
        case 3:
            return y;
    }
}

function calcY(direction, x, y) {

    if (direction < 0) direction = 4 + direction;
    switch (direction) {
        case 0:
            return y;
        case 1:
            return x;
        case 2:
            return 4 - y - 1;
        case 3:
            return 4 - x - 1;
    }
}

function random(n) {
    return (Math.floor(Math.random() * n) + 1);
}

function addrandom() {
    var v = random(2) * 2;
    var z = [];
    values.forEach(function (vl, i) {
        if (!vl) z.push(i);
    });
    if (!z.length) return false;

    var rp = z[random(z.length) - 1];
    values[rp] = v;
    return true;
}


//random();
function display() {
    for (var i = 0; i < values.length; i++) {
        var txt = values[i] ? values[i] : '';
        var cell = document.getElementById('c' + i);
        cell.innerHTML = txt;
        cell.className = txt ? "cell cell" + txt : "cell";
    }
    var result = check();
    var restart = document.getElementById ('restart');
    restart.className = result ? "restart" : "restart active";
}

function check() {
    for (var r = 0; r < 4; r++) {
        var prev =-1;
        for (var c = 0; c < 4; c++) {
            var cur =values[r*4+c];
            if (!cur)return true;
           if (prev>-1 && prev==cur) return true;
            prev=cur;
        }
    }
    for (var c = 0;c < 4; c++) {
        var prev =-1;
        for (var r = 0; r < 4; r++) {
            var cur =values[r*4+c];
            if (!cur)return true;
            if (prev>-1 && prev==cur) return true;
            prev=cur;
        }
    }
    return false;
}

function restart() {
    values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    addrandom();
    display();
}


window.addEventListener('load',function() {
    window.addEventListener('keydown', keyhandler, false);
    restart();
});

