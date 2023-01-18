/* VERSION 1.00 */ 

document.addEventListener('DOMContentLoaded', function() {
    setupForm();
});

/* SETUP */
// NAME CHECKER - CHECKS STRING
// SETUP FORM - SETS SUMBIT AND PET INFO
// SETS IMAGE - DOG OR CAT
// DECLARES BUTTONS

function nameChecker() {
    const name = document.getElementById('petName').value;
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name) ? true : false;
}

function setupForm() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function() {
        const isValid = nameChecker();

        if (isValid) {
            // INPUT TYPES
            const name = document.getElementById('petName').value;
            const animal = document.getElementById('petType').value;
            document.getElementById('imgPet').setAttribute('src', `a/img/type/${animal.toLowerCase()}.png`);

            // ANIMAL VAR 
            if (animal === "Dog") {petAnimal = "Dog";} else {petAnimal = "Cat";}

            // DISABLE
            sbtButtons();

            // FUNCTIONS
            updateButtons();
            updateStatDisplays();
            startTimeLoop();
        } else {
            document.getElementById('cmdTXT').innerHTML = `Please fill out all fields`;
        }
    });
}

function updateButtons() {
    document.getElementById('btnPlay').addEventListener('click', btnClickPlay);
    document.getElementById('btnDrink').addEventListener('click', btnClickDrink);
    document.getElementById('btnClean').addEventListener('click', btnClickClean);
    document.getElementById('btnFeed').addEventListener('click', btnClickFeed);
}

/* VARS + DISPLAY  + STATS(LOOP) + DEATH CHECK + ENDGAME*/
// UPDATE STATS + STATS
// TIME INTERVAL
// CHANGE PET IMAGE
// CHECK DEATH
// END GAME

let stats = {happiness: 36,thirst: 85,cleaniness: 85,hunger: 85}
let maxStatValue = 85;
let interval;

function updateStatDisplays() {
    document.getElementById('stHappiness').innerHTML = `Happiness: ${stats.happiness}`;
    document.getElementById('stThirst').innerHTML = `Thirst: ${stats.thirst}`;
    document.getElementById('stCleaniness').innerHTML = `Cleaniness: ${stats.cleaniness}`;
    document.getElementById('stHunger').innerHTML = `Hunger: ${stats.hunger}`;
}

function startTimeLoop() {
    let gameOver = false;

    interval = setInterval(function() {
        updateStatDisplays();
        changePetImage();
        animalDeathChecker();

        const random = Math.floor(Math.random() * 2) + 1;
        stats.happiness = Math.max(stats.happiness - random, 0);
        stats.thirst = Math.max(stats.thirst - random, 0);
        stats.cleaniness = Math.max(stats.cleaniness - random, 0);
        stats.hunger = Math.max(stats.hunger - random, 0);
    }, 3000);
}

function changePetImage() {
    if (petAnimal === "Dog") {
        if (stats.happiness < 35 || stats.thirst < 35 || stats.cleaniness < 35 || stats.hunger < 35) {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/sad_dog.png');
            document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet is feeling quite down!';
            message();
        } else {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/dog.png');
        }
    } else {
        if (stats.happiness < 35 || stats.thirst < 35 || stats.cleaniness < 35 || stats.hunger < 35) {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/sad_cat.png');
            document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet is feeling quite down!';
        } else {
            document.getElementById('imgPet').setAttribute('src', 'a/img/type/cat.png');
        }
    }
}

function animalDeathChecker() {
    if (stats.happiness <= 0 || stats.thirst <= 0 || stats.cleaniness <= 0 || stats.hunger <= 0) {
        endGame();
        document.getElementById('cmdTXT').innerHTML = '[PET] Your Pet has Died! :(';
    }
}

function endGame(gameOver) {
    gameOver = true;
    clearInterval(interval);
    dbAndButtons();
    restartBtn();
}

/* PLAY BUTTONS */
// BUTTON FUNCTIONS (FEED, PLAY, CLEAN, DRINK)

function btnClickPlay() {
    if (stats.happiness < maxStatValue) {
        stats.happiness = Math.min(stats.happiness + 5, maxStatValue);
        stats.thirst = Math.max(stats.thirst - 1, 0);
        stats.hunger = Math.max(stats.hunger - 1, 0);
        updateStatDisplays();

        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] BAR-BARK!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] Purr!!`;
        }
    }
}

function btnClickDrink() {
    if (stats.thirst < maxStatValue) {
        stats.thirst = Math.min(stats.thirst + 5, maxStatValue);
        updateStatDisplays();

        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] WOOF!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] MEOWWWWWW!!`;
        }

    }
}

function btnClickClean() {
    if (stats.cleaniness < maxStatValue) {
        stats.cleaniness = Math.min(stats.cleaniness + 5, maxStatValue);
        updateStatDisplays();

        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] BARK!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] purrrrrrr!!`;
        }

    }
}

function btnClickFeed() {
    if (stats.hunger < maxStatValue) {
        stats.hunger = Math.min(stats.hunger + 5, maxStatValue);
        stats.thirst = Math.max(stats.thirst - 1, 0);
        updateStatDisplays();

        if (petAnimal === "Dog") {
            document.getElementById('cmdTXT').innerHTML = `[PET] BARK!!!!`;
        } else {
            document.getElementById("cmdTXT").innerHTML = `[PET] Meow`;
        }
    }
}

/* DISABLE USER INPUTS + RESTART BUTTON */
// SBT - Disables Sumbit, Name, Type
// dbAndButtons - Disables Buttons and Adds Restart Button
// restartBTN - Restart Button

function sbtButtons() {
    const submitButton = document.getElementById('submitButton');
    const petNameInput = document.getElementById('petName');
    const petTypeInput = document.getElementById('petType');
    submitButton.disabled = true;
    petNameInput.disabled = true;
    petTypeInput.disabled = true;
}

function dbAndButtons() {
    document.getElementById("btnPlay").disabled = true;
    document.getElementById("btnDrink").disabled = true;
    document.getElementById("btnClean").disabled = true;
    document.getElementById("btnFeed").disabled = true;
}

function restartBtn() {
    const restartButton = document.createElement("button");
    restartButton.innerHTML = "Restart";
    restartButton.id = "btnRestartPage";
    document.body.appendChild(restartButton);

    restartButton.addEventListener("click", () => {
        location.reload();
    });
}
