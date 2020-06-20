const wizard = document.getElementById('wizard');
const heldYes = document.getElementById("held-yes");
const heldNo = document.getElementById("held-no");
const stlRtg = document.getElementById("steal-rating");
const armRtg = document.getElementById("arm");
const d20 = document.getElementById("d20");
const result = document.getElementById("result");

function calculateResult(e) {
    
    e.preventDefault();

    var calculation = 0;

    // Calculate the starting limit based on the runner's stealing rating
    console.log("Stealing Rating (Text): " + stlRtg.options[stlRtg.selectedIndex].value);
    switch(stlRtg.options[stlRtg.selectedIndex].value) {
        case "AAA":
        case "AA":
            calculation = 17;
            break;
        case "A":
            calculation = 15;
            break;
        case "B":
            calculation = 13;
            break;
        case "C":
            calculation = 11;
            break;
        case "D":
            calculation = 9;
            break;
        case "E":
            calculation = 7;
            break;

    }
    console.log("Stealing Rating (#): " + calculation);

    // Add the catcher's arm rating
    calculation = calculation + parseInt(armRtg.value.trim(),10);

    console.log("Arm: " + armRtg.value.trim());
    console.log("Stealing Rating - Arm: " + calculation);

    // Adjust the calculation if the runner is held
    if (heldYes.checked) {
        
        console.log("Runner is being held")
        switch(stlRtg.options[stlRtg.selectedIndex].value) {
            case "AAA":
                calculation = calculation - 1;
                break;
            case "AA":
            case "A":
                calculation = calculation - 2;
                break;
            case "B":
            case "C":
                calculation = calculation - 3;
                break;
            case "D":
            case "E":
                calculation = calculation - 4;
                break;
        }        
    }
    console.log("Final Calculation: " + calculation);

    if (parseInt(d20.value.trim(),10) <= calculation) {
        result.innerText = "Runner is safe!";
    } else {
        result.innerText = "Runner is out!";
    }

    if (parseInt(d20.value.trim(),10) <= 3) {
        result.innerHTML += "<p><em>Note: Possible throwing error! Reroll the 20-sided die and compare to the catcher's 'T' range. If the roll falls within the range, all runners advance one base.</p>"
    }
}

function init() {
  result.innerHTML = '';
}

init();

wizard.addEventListener('submit', calculateResult);