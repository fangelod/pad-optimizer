var cv;
var orbSelected = '.frChoose';
var board;
var Fire, Water, Wood, Light, Dark, Heal;
var EFire, EWater, EWood, ELight, EDark, EHeal;
var isMouseDown = false;

$(document).ready(function () {
    cv = document.getElementById("PADboard").getContext("2d");
    resizeEverything();
    addButtonHandlers();
    initBoard();
    initOrbs();
    
    $('#PADboard').on('click', function(e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var w = $('#PADboard').width();
        var h = $('#PADboard').height();
        var gw = w/6;
        var gh = h/5;
        var column = "";
        var row = "";
        var bw = document.getElementById("PADboard").width/6;
        var bh = document.getElementById("PADboard").height/5;
        
        if ($('.echeck').is(":checked")) {
            switch (orbSelected) {
                case '.frChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "fr+";
                    cv.drawImage(EFire, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.wtChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "wt+";
                    cv.drawImage(Water, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.wdChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "wd+";
                    cv.drawImage(Wood, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.ltChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "lt+";
                    cv.drawImage(ELight, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.dkChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "dk+";
                    cv.drawImage(EDark, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.hChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "h+";
                    cv.drawImage(EHeal, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
            } 
        } else {
            switch (orbSelected) {
                case '.frChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "fr";
                    cv.drawImage(Fire, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.wtChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "wt";
                    cv.drawImage(Water, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.wdChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "wd";
                    cv.drawImage(Wood, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.ltChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "lt";
                    cv.drawImage(Light, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.dkChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "dk";
                    cv.drawImage(Dark, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
                case '.hChoose':
                    board[Math.floor(y/gh)][Math.floor(x/gw)] = "h";
                    cv.drawImage(Heal, Math.floor(x/gw)*bw, Math.floor(y/gh)*bh, bw, bh);
                    break;
            } 
        }
    });
    $(document).on('mousedown', function(e) {
        isMouseDown = true;
    });
    $(document).on('mouseup', function(e) {
        isMouseDown = false;
    });
    $('#PADboard').on('mousemove', function(e) {
        if (isMouseDown) {
            console.log(e);
            // Handle orb placement
        }
    });
});


$(window).resize(function() {
    resizeEverything();
});


// Helper functions
var resizeEverything = function() {
    var w = $(window).width();
    var lw = w * .25;
    var mw = w * .49;
    var rw = w * .25;
    
    $('.left').width(lw);
    $('.right').width(rw);
    $('.middle').width(mw);
    
    $('#PADboard').width(mw);
    $('#PADboard').height(mw*(5/6));
    //$('.middle table').width(mw);
    //$('.middle table').height(mw*(5/6));
    
    $('.frChoose').width(rw/6);
    $('.frChoose').height(rw/6);
    
    $('.wtChoose').width(rw/6);
    $('.wtChoose').height(rw/6);
    
    $('.wdChoose').width(rw/6);
    $('.wdChoose').height(rw/6);
    
    $('.ltChoose').width(rw/6);
    $('.ltChoose').height(rw/6);
    
    $('.dkChoose').width(rw/6);
    $('.dkChoose').height(rw/6);
    
    $('.hChoose').width(rw/6);
    $('.hChoose').height(rw/6);
    
    drawStartBoard();
};
var addButtonHandlers = function() {
    $('.frChoose').css('border', '2pt solid white');
    
    var resetButtons = function() {
        $(orbSelected).css('border', "initial");
    };
    
    $('.frChoose').on('click', function (e) {
        resetButtons();
        $('.frChoose').css('border', '2pt solid white');
        orbSelected = '.frChoose';
    });
    
    $('.wtChoose').on('click', function (e) {
        resetButtons();
        $('.wtChoose').css('border', '2pt solid white');
        orbSelected = '.wtChoose';
    });
    
    $('.wdChoose').on('click', function (e) {
        resetButtons();
        $('.wdChoose').css('border', '2pt solid white');
        orbSelected = '.wdChoose';
    });
    
    $('.ltChoose').on('click', function (e) {
        resetButtons();
        $('.ltChoose').css('border', '2pt solid white');
        orbSelected = '.ltChoose';
    });
    
    $('.dkChoose').on('click', function (e) {
        resetButtons();
        $('.dkChoose').css('border', '2pt solid white');
        orbSelected = '.dkChoose';
    });
    
    $('.hChoose').on('click', function (e) {
        resetButtons();
        $('.hChoose').css('border', '2pt solid white');
        orbSelected = '.hChoose';
    });
    
    $('.echeck').on('click', function(e) {
        if ($('.echeck').is(":checked")) {
            $('.frChoose').css('background', 'url("/img/frOrb+.png") no-repeat center');
            $('.wtChoose').css('background', 'url("/img/wtOrb.png") no-repeat center');
            $('.wdChoose').css('background', 'url("/img/wdOrb.png") no-repeat center');
            $('.ltChoose').css('background', 'url("/img/ltOrb+.png") no-repeat center');
            $('.dkChoose').css('background', 'url("/img/dkOrb+.png") no-repeat center');
            $('.hChoose').css('background', 'url("/img/hOrb+.png") no-repeat center');
        } else {
            $('.frChoose').css('background', 'url("/img/frOrb.png") no-repeat center');
            $('.wtChoose').css('background', 'url("/img/wtOrb.png") no-repeat center');
            $('.wdChoose').css('background', 'url("/img/wdOrb.png") no-repeat center');
            $('.ltChoose').css('background', 'url("/img/ltOrb.png") no-repeat center');
            $('.dkChoose').css('background', 'url("/img/dkOrb.png") no-repeat center');
            $('.hChoose').css('background', 'url("/img/hOrb.png") no-repeat center');
        }
        $('.frChoose').css('background-size', 'contain');
        $('.wtChoose').css('background-size', 'contain');
        $('.wdChoose').css('background-size', 'contain');
        $('.ltChoose').css('background-size', 'contain');
        $('.dkChoose').css('background-size', 'contain');
        $('.hChoose').css('background-size', 'contain');
    });
    
    $('html').on('keydown', function(e) {
        switch (e.keyCode) {
            case 65:
                resetButtons();
                $('.frChoose').css('border', '2pt solid white');
                orbSelected = '.frChoose';
                break;
            case 83:
                resetButtons();
                $('.wtChoose').css('border', '2pt solid white');
                orbSelected = '.wtChoose';
                break;
            case 68:
                resetButtons();
                $('.wdChoose').css('border', '2pt solid white');
                orbSelected = '.wdChoose';
                break;
            case 70:
                resetButtons();
                $('.ltChoose').css('border', '2pt solid white');
                orbSelected = '.ltChoose';
                break;
            case 71:
                resetButtons();
                $('.dkChoose').css('border', '2pt solid white');
                orbSelected = '.dkChoose';
                break;
            case 72:
                resetButtons();
                $('.hChoose').css('border', '2pt solid white');
                orbSelected = '.hChoose';
                break;
            case 69:
                if ($('.echeck').is(":checked")) {
                    $('.echeck').prop('checked', false);
                    $('.frChoose').css('background', 'url("/img/frOrb.png") no-repeat center');
                    $('.wtChoose').css('background', 'url("/img/wtOrb.png") no-repeat center');
                    $('.wdChoose').css('background', 'url("/img/wdOrb.png") no-repeat center');
                    $('.ltChoose').css('background', 'url("/img/ltOrb.png") no-repeat center');
                    $('.dkChoose').css('background', 'url("/img/dkOrb.png") no-repeat center');
                    $('.hChoose').css('background', 'url("/img/hOrb.png") no-repeat center');
                } else {
                    $('.echeck').prop('checked', true);
                    $('.frChoose').css('background', 'url("/img/frOrb+.png") no-repeat center');
                    $('.wtChoose').css('background', 'url("/img/wtOrb.png") no-repeat center');
                    $('.wdChoose').css('background', 'url("/img/wdOrb.png") no-repeat center');
                    $('.ltChoose').css('background', 'url("/img/ltOrb+.png") no-repeat center');
                    $('.dkChoose').css('background', 'url("/img/dkOrb+.png") no-repeat center');
                    $('.hChoose').css('background', 'url("/img/hOrb+.png") no-repeat center');
                }
                $('.frChoose').css('background-size', 'contain');
                $('.wtChoose').css('background-size', 'contain');
                $('.wdChoose').css('background-size', 'contain');
                $('.ltChoose').css('background-size', 'contain');
                $('.dkChoose').css('background-size', 'contain');
                $('.hChoose').css('background-size', 'contain');
                break;
        }
    });
};
var drawStartBoard = function() {
    var w = document.getElementById("PADboard").width;
    var h = document.getElementById("PADboard").height;
    cv.clearRect(0, 0, w, h);
    
    var img = document.createElement('img');
    img.src = "/img/Background1.png";
    var img2 = document.createElement('img');
    img2.src = "/img/Background2.png";
    
    var gw = w/6;
    var gh = h/5;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 6; j++) {
            if (i % 2 == 0) {
                if (j % 2 == 0) {
                    cv.drawImage(img, (j * gw), (i * gh), gw, gh); 
                } else {
                    cv.drawImage(img2, (j * gw), (i * gh), gw, gh); 
                }
            } else {
                if (j % 2 == 0) {
                    cv.drawImage(img2, (j * gw), (i * gh), gw, gh); 
                } else {
                    cv.drawImage(img, (j * gw), (i * gh), gw, gh); 
                }
            }
        }
    }
};
var initBoard = function() {
    board = new Array(5);
    for (i = 0; i < 5; i++) {
        board[i] = new Array(6);
        for (j = 0; j < 6; j++) {
            board[i][j] = null;
        }
    }
}
var initOrbs = function() {
    Fire = document.createElement('img');
    Fire.src = "/img/frOrb.png";
    Water = document.createElement('img');
    Water.src = "/img/wtOrb.png";
    Wood = document.createElement('img');
    Wood.src = "/img/wdOrb.png";
    Light = document.createElement('img');
    Light.src = "/img/ltOrb.png";
    Dark = document.createElement('img');
    Dark.src = "/img/dkOrb.png";
    Heal = document.createElement('img');
    Heal.src = "/img/hOrb.png";
    EFire = document.createElement('img');
    EFire.src = "/img/frOrb+.png";
    // EWater = document.createElement('img');
    // EWater.src = "/img/wtOrb+.png";
    // EWood = document.createElement('img');
    // EWood.src = "/img/wdOrb+.png";
    ELight = document.createElement('img');
    ELight.src = "/img/ltOrb+.png";
    EDark = document.createElement('img');
    EDark.src = "/img/dkOrb+.png";
    EHeal = document.createElement('img');
    EHeal.src = "/img/hOrb+.png";
}

