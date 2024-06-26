document.addEventListener("DOMContentLoaded", () => {
    const inputType = document.getElementById("input-type");
    const showBtn = document.getElementById("show-btn");
    const inputFields = document.getElementById("input-fields");
    const trapezoidImage = document.getElementById("trapezoid-image");
    const calculateBtn = document.getElementById("calculate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const results = document.getElementById("results");

    const inputFieldsTemplate = {
        sides: `
            <label for="base1">Основание a:</label>
            <input type="number" id="base1" min="0"><br>
            <label for="base2">Основание b:</label>
            <input type="number" id="base2" min="0"><br>
            <label for="side">Боковая сторона c:</label>
            <input type="number" id="side" min="0"><br>
        `,
        height: `
            <label for="base1">Основание a:</label>
            <input type="number" id="base1" min="0"><br>
            <label for="base2">Основание b:</label>
            <input type="number" id="base2" min="0"><br>
            <label for="height">Высота h:</label>
            <input type="number" id="height" min="0"><br>
        `
    };

    function displayFields(type) {
        inputFields.innerHTML = inputFieldsTemplate[type];
        trapezoidImage.src = type === "sides" ? "sides.png" : "height.png";
        addInputEvents();
    }

    function addInputEvents() {
        const inputs = inputFields.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
            });
        });
    }

    function validateInput(input) {
        if (isNaN(input.value) || input.value <= 0) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    function validateAllInputs() {
        const inputs = inputFields.querySelectorAll('input');
        let allValid = true;
        inputs.forEach(input => {
            validateInput(input);
            if (input.classList.contains('error')) {
                allValid = false;
            }
        });
        return allValid;
    }

    showBtn.addEventListener("click", () => {
        displayFields(inputType.value);
    });

    clearBtn.addEventListener("click", () => {
        inputFields.innerHTML = '';
        results.innerHTML = '';
        clearErrors();
    });

    calculateBtn.addEventListener("click", () => {
        if (!validateAllInputs()) {
            results.innerHTML = '<p id="error-message">Пожалуйста, введите все необходимые значения.</p>';
            return;
        }

        const base1 = parseFloat(document.getElementById("base1").value);
        const base2 = parseFloat(document.getElementById("base2").value);
        let side, height;

        if (inputType.value === "sides") {
            side = parseFloat(document.getElementById("side").value);
        } else {
            height = parseFloat(document.getElementById("height").value);
        }

        let selectedCalculationsField = document.getElementById("calculations")
        let selectedCalculations = Array.from(selectedCalculationsField.selectedOptions).map(option => option.value);

        if (selectedCalculations.length === 0) {
            selectedCalculationsField.parentElement.style.color = "red";
        }

        else {
            selectedCalculationsField.parentElement.style.removeProperty("color")
        }


        let calcResults = '';

        if (selectedCalculations.includes("area")) {
            
            let area;
            if (inputType.value === "sides") {
                height = Math.sqrt(side ** 2 - ((base2 - base1) / 2) ** 2);
            }
            area = ((base1 + base2) / 2) * height;
            calcResults += `<p>Площадь: ${area.toFixed(2)}</p>`;
        }

        if (selectedCalculations.includes("angles")) {
            let angleA, angleB;
            if (inputType.value === "sides") {
                height = Math.sqrt(side ** 2 - ((base2 - base1)) ** 2);
            }
            angleA = Math.abs(Math.atan(height / ((base2 - base1))) * (180 / Math.PI));
            angleB = 180 - angleA;
            calcResults += `<p>Угол A: ${angleA.toFixed(2)}°</p>`;
            calcResults += `<p>Угол B: ${angleB.toFixed(2)}°</p>`;
        }

        if (selectedCalculations.includes("perimeter")) {
            let perimeter;
            if (inputType.value === "sides") {
                perimeter = base1 + base2 + 2 * side;
            } else {
                let side = Math.sqrt(height ** 2 + ((base2 - base1) / 2) ** 2);
                perimeter = base1 + base2 + 2 * side;
            }
            calcResults += `<p>Периметр: ${perimeter.toFixed(2)}</p>`;
        }

        results.innerHTML = calcResults;
    });

    function clearErrors() {
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    // Initial setup
    displayFields("sides");
});
