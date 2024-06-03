function solveCubicEquation() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) 
    || a === 0 || b === 0 || c === 0 || d === 0) {
        document.getElementById('results').innerText = "Proszę podać prawidłowe dane.";
        return;
    }

    const roots = solveCubic(a, b, c, d);
    document.getElementById('results').innerHTML = `<p>Wynik:</p> <ul>${roots.map(root => `<li>${root}</li>`).join('')}</ul>`;
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
