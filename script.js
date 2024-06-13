function showCubicForm() {
    document.getElementById('cubicForm').style.display = 'block';
    document.getElementById('polynomialForm').style.display = 'none';
}

function showPolynomialForm() {
    document.getElementById('cubicForm').style.display = 'none';
    document.getElementById('polynomialForm').style.display = 'block';
}

function solveCubicEquation() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        document.getElementById('resultsCubic').innerText = "Proszę podać prawidłowe dane.";
        return;
    }

    const roots = solveCubic(a, b, c, d);
    document.getElementById('resultsCubic').innerHTML = `<p>Wynik:</p> <ul>${roots.map(root => `<li>${root}</li>`).join('')}</ul>`;
}

function solveCubic(a, b, c, d) {
    const p = (3 * a * c - b ** 2) / (3 * a ** 2);
    const q = (2 * b ** 3 - 9 * a * b * c + 27 * a ** 2 * d) / (27 * a ** 3);
    const discriminant = (q ** 2) / 4 + (p ** 3) / 27;

    if (discriminant > 0) {
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        const root1 = u + v - b / (3 * a);
        return [root1];
    } else if (discriminant === 0) {
        const u = Math.cbrt(-q / 2);
        const root1 = 2 * u - b / (3 * a);
        const root2 = -u - b / (3 * a);
        return [root1, root2];
    } else {
        const r = Math.sqrt(-(p ** 3) / 27);
        const phi = Math.acos(-q / (2 * r));
        const root1 = 2 * Math.cbrt(r) * Math.cos(phi / 3) - b / (3 * a);
        const root2 = 2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a);
        const root3 = 2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a);
        return [root1, root2, root3];
    }
}

function solvePolynomial() {
    const a5 = parseFloat(document.getElementById('a5').value);
    const a4 = parseFloat(document.getElementById('a4').value);
    const a3 = parseFloat(document.getElementById('a3').value);
    const a2 = parseFloat(document.getElementById('a2').value);
    const a1 = parseFloat(document.getElementById('a1').value);
    const a0 = parseFloat(document.getElementById('a0').value);

    const polynomial = (x) => a5 * Math.pow(x, 5) + a4 * Math.pow(x, 4) + a3 * Math.pow(x, 3) + a2 * Math.pow(x, 2) + a1 * x + a0;
    const derivative = (x) => 5 * a5 * Math.pow(x, 4) + 4 * a4 * Math.pow(x, 3) + 3 * a3 * Math.pow(x, 2) + 2 * a2 * x + a1;

    const newtonRaphson = (func, deriv, guess, tolerance = 1e-7, maxIter = 1000) => {
        let x = guess;
        for (let i = 0; i < maxIter; i++) {
            const f = func(x);
            const fPrime = deriv(x);
            if (Math.abs(fPrime) < tolerance) break;
            const xNew = x - f / fPrime;
            if (Math.abs(xNew - x) < tolerance) return xNew;
            x = xNew;
        }
        return null;
    };

    const guesses = [-10, -5, 0, 5, 10];
    const roots = new Set();
    guesses.forEach(guess => {
        const root = newtonRaphson(polynomial, derivative, guess);
        if (root !== null) {
            roots.add(Math.round(root * 1e6) / 1e6);
        }
    });

    const resultsDiv = document.getElementById('resultsPolynomial');
    resultsDiv.innerHTML = '';
    if (roots.size > 0) {
        resultsDiv.innerHTML = '<ul>' + [...roots].map(root => `<li>${root}</li>`).join('') + '</ul>';
    } else {
        resultsDiv.textContent = 'Nie znaleziono pierwiastków.';
    }
}
