// JavaScript File
/*$.getJSON("http://pad-optimizer-fangelod.c9users.io:8080/dictionary.txt", function (json){
		var monsterData = json.monsters;
		var pageData = json.pages;
		
		$.ajax("http://pad-optimizer-fangelod.c9users.io:8080/setupMonsterCollection/", {
		    type: "GET",
		    dataType: "json",
			data: json,
			success: function(response) {
			    console.log(response);
			},
			error: function(xhr, status, error) {
			    console.log(xhr, status, error);
			}
		});
	});*/
    
// Start button
/*$("#start").on('click', function (e) {
    e.preventDefault();
    
    game = setInterval(main_loop, speed);
    stopped = false;
});

// Stop button
$("#stop").on('click', function (e) {
    e.preventDefault();
    
    clearInterval(game);
    stopped = true;
});

// Step button
$("#step").on('click', function (e) {
    e.preventDefault();
    
    if (stopped) {
        main_loop();
    }
});

// Randomize button
$("#randomize").on('click', function (e) {
    e.preventDefault();
    
    $("td").css("background", "white");
    once_alive = [];
    
    // How many cells are to be alive
    var random_amount = randomInt(1,(grid_size * grid_size));
    var random_list = [];
    
    for (i = 0; i < random_amount; i++) {
        var random_row = randomInt(1, grid_size);
        var random_col = randomInt(1, grid_size);
        var random_id = '#R';
        
        if (random_row < 10 && random_col < 10) {
            random_id += '00' + random_row + 'C00' + random_col;
        } else if (random_row < 10 && random_col > 9) {
            if (random_col < 100) {
                random_id += '00' + random_row + 'C0' + random_col;
            } else {
                random_id += '00' + random_row + 'C' + random_col;
            }
        } else if (random_row > 9 && random_col < 10) {
            if (random_row < 100) {
                random_id += '0' + random_row + 'C00' + random_col;
            } else {
                random_id += random_row + 'C00' + random_col;
            }
        } else if (random_row > 9 && random_col > 9) {
            if (random_row < 100 && random_col < 100) {
                random_id += '0' + random_row + 'C0' + random_col;
            } else if (random_row < 100 && random_col > 99) {
                random_id += '0' + random_row + 'C' + random_col;
            } else if (random_row > 99 && random_col < 100) {
                random_id += random_row + 'C0' + random_col;
            } else if (random_row > 99 && random_col > 99) {
                random_id += random_row + 'C' + random_col;
            }
        }
        //random_list.push(random_id);
        $(random_id).css("background", "rgb(153, 186, 221)");
        once_alive.push(random_id);
    }
});

// Reset button
$("#reset").on('click', function (e) {
    e.preventDefault();
    
    // Change all cells to white
    $("td").css("background", "white");
    
    // Remove all cells from once_alive array
    once_alive = [];
});

// Update button
$("#setting").on('click', function(e) {
    e.preventDefault();
    
    // Change grid size
    grid_size = $("#size").val();
    
    if (grid_size >= 20 && grid_size <= 200) {
        $("#grid").replaceWith(makeNewTable());
        $('#grid').css("width", "50%");
        $('#grid').height($('#grid').width());
        
        // Reset once_alive array
        once_alive = [];
    }
    
    // Change speed
    $("#insert").replaceWith('<label id="insert">' + $("#speed").val() +'</label>');
    speed = $("#speed").val();
        
    // Change neighbor reference
    //alert($("#reference").val());
    if ($("#reference").val() == "Always Dead") {
        outer_referencing = 0;
    } else if ($("#reference").val() == "Always Alive") {
        outer_referencing = 1;
    } else if ($("#reference").val() == "Toroidal"){
        outer_referencing = 2;
    }
    
    // Parameter Check
    var error_occured = false;
    var error_message = "Invalid Parameters!\n";
    var set_max = 440;
    
    // r check
    if ($("#r").val() < 1) {
        error_occured = true;
        error_message += "r must be >= 1\n";
    } else if ($("#r").val() > 10) {
        error_occured = true;
        error_message += "r must be <= 10\n";
    } else {
        r = $("#r").val();
        set_max = (4*r*r + 4*r);
    }
    
    // l check
    if ($("#l").val() <= 0) {
        error_occured = true;
        error_message += "l must be > 0\n";
    } else if ($("#l").val() > $("#o").val()) {
        error_occured = true;
        error_message += "l must be <= o\n";
    } else if ($("#l").val() >= set_max) {
        error_occured = true;
        error_message += "l must be < " + set_max + "\n";
    }
    
    // o check
    if ($("#o").val() <= 0) {
        error_occured = true;
        error_message += "o must be > 0\n";
    } else if ($("#o").val() >= set_max) {
        error_occured = true;
        error_message += "o must be < " + set_max + "\n";
    }
    
    // gmin check
    if ($("#gmin").val() <= 0) {
        error_occured = true;
        error_message += "gmin must be > 0\n";
    } else if ($("#gmin").val() > $("#gmax").val()) {
        error_occured = true;
        error_message += "gmin must be <= gmax\n";
    } else if ($("#gmin").val() >= set_max) {
        error_occured = true;
        error_message += "gmin must be < " + set_max + "\n";
    }
    
    // gmax check
    if ($("#gmax").val() <= 0) {
        error_occured = true;
        error_message += "gmax must be > 0\n";
    } else if ($("#gmax").val() >= set_max) {
        error_occured = true;
        error_message += "gmax must be < " + set_max + "\n";
    }
    
    if (error_occured) {
        r = 1;
        l = 2;
        o = 3;
        gmin = 3;
        gmax = 3;
        
        error_message += "\nDefault parameters used!";
        alert(error_message);
    } else {
        l = $("#l").val();
        o = $("#o").val();
        gmin = $("#gmin").val();
        gmax = $("#gmax").val();
    }
});

// Clicking on cells
$("#grid_holder").on('click', "td", function(e) {
    e.preventDefault();
    
    var was_alive = false;
    var id_clicked = $(this).attr('id');
    
    for (i = 0; i < once_alive.length; i++) {
        if (id_clicked == once_alive[i]) {
            was_alive = true;
        }
    }
    
    if (e.shiftKey) {
        // Force alive
        $(this).css("background", "rgb(153,186,221)");
        
        if (!was_alive) {
            once_alive.push(id_clicked);
        }
    } else if (e.ctrlKey || e.altKey) {
        // Force dead
            // if currently carolina blue force to gray
            // if currently gray, stay as gray
            // if currently white, stay as white
        if ($(this).css("background").indexOf('rgb(153, 186, 221)') != -1) {
            $(this).css("background", "gray");
        }
    } else {
        if (was_alive) {
            if ($(this).css("background").indexOf('rgb(153, 186, 221)') != -1) {
                // If background is carolina blue, change to gray
                $(this).css("background", "gray");
            } else {
                // Change background to carolina blue
                $(this).css("background", "rgb(153,186,221)");
            }
        } else {
            if ($(this).css("background").indexOf('rgb(153, 186, 221)') != -1) {
                $(this).css("background", "gray");
            } else {
                $(this).css("background", "rgb(153,186,221)");
                // Add the id of the cell clicked to the array of cells that were once alive
                once_alive.push(id_clicked);
            }
        }
    }
});*/