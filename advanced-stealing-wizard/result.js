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
    var resultText = "Steal Rtg: ";

    // Calculate the starting limit based on the runner's stealing rating
    switch(stlRtg.options[stlRtg.selectedIndex].value) {
        case "AAA (17)":
        case "AA (17)":
            calculation = 17;
            resultText += "AAA/AA 17"
            break;
        case "A (15)":
            calculation = 15;
            resultText += "A 15"
            break;
        case "B (13)":
            calculation = 13;
            resultText += "B 13"
            break;
        case "C (11)":
            calculation = 11;
            resultText += "C 11"
            break;
        case "D (9)":
            calculation = 9;
            resultText += "D 9"
            break;
        case "E (7)":
            calculation = 7;
            resultText += "E 7"
            break;

    }

    // Add the catcher's arm rating
    calculation = calculation + parseInt(armRtg.value.trim(),10);
    resultText += " + Arm Rtg: " + parseInt(armRtg.value.trim(),10);

    // Adjust the calculation if the runner is held
    if (heldYes.checked) {
        
        console.log("Runner is being held")
        resultText += " + Held: ";
        switch(stlRtg.options[stlRtg.selectedIndex].value) {
            case "AAA (17)":
                calculation = calculation - 1;
                resultText += "AAA -1";
                break;
            case "AA (17)":
            case "A (15)":
                calculation = calculation - 2;
                resultText += "AA/A -2";
                break;
            case "B (13)":
            case "C (11)":
                calculation = calculation - 3;
                resultText += "B/C -3";
                break;
            case "D (9)":
            case "E (7)":
                calculation = calculation - 4;
                resultText += "D/E -4";
                break;
        }        
    }

    resultText += " = " + calculation;
    resultText += "\n\n" + "D20: " + parseInt(d20.value.trim(),10) + " <= " + calculation + " = ";
    if (parseInt(d20.value.trim(),10) <= calculation) {
        result.innerText = "Runner is safe!";
        resultText += "TRUE\n\nSafe!";
    } else {
        result.innerText = "Runner is out!";
        resultText += "FALSE\n\nOut!";
    }

    if (parseInt(d20.value.trim(),10) <= 3) {
        result.innerHTML += "<p><em>Note: Possible throwing error! Reroll the 20-sided die and compare to the catcher's 'T' range. If the roll falls within the range, all runners advance one base.</p>"
        resultText += "\n\nNote: Possible throwing error!";
    }
    alert(resultText);
}

function init() {
  result.innerHTML = '';
}

init();

wizard.addEventListener('submit', calculateResult);