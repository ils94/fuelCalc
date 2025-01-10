function calculateCost() {
    const gasolinePrice = parseFloat(document.getElementById('gasolinePrice').value);
    const alcoholPrice = parseFloat(document.getElementById('alcoholPrice').value);
    const gasolineKm = parseFloat(document.getElementById('gasolineKm').value);
    const alcoholKm = parseFloat(document.getElementById('alcoholKm').value);
    const distance = parseFloat(document.getElementById('distance').value) || 1;

    if (!gasolinePrice || !alcoholPrice || !gasolineKm || !alcoholKm) {
        document.getElementById('result').innerHTML = `<div class="message">Preencha os campos necessários!</div>`;
        return;
    }

    const alcoholIsViableByPrice = alcoholPrice <= 0.7 * gasolinePrice;

    // Perform calculations for both options
    const gasolineCostPerKm = gasolinePrice / gasolineKm;
    const alcoholCostPerKm = alcoholPrice / alcoholKm;

    const totalGasolineCost = gasolineCostPerKm * distance;
    const totalAlcoholCost = alcoholCostPerKm * distance;

    // Determine the better option
let cheaperOption = "";
if (alcoholIsViableByPrice) {
    cheaperOption = `
        Álcool é melhor levando em consideração a 
        <a href="https://www.rotaexata.com.br/blog/etanol/#:~:text=Basta%20fazer%20um%20c%C3%A1lculo%20b%C3%A1sico,70%25%20do%20pre%C3%A7o%20da%20gasolina." target="_blank" rel="noopener noreferrer">regra dos 70%</a>.
    `;
} else {
    cheaperOption = `
        Gasolina é melhor levando em consideração a 
        <a href="https://www.rotaexata.com.br/blog/etanol/#:~:text=Basta%20fazer%20um%20c%C3%A1lculo%20b%C3%A1sico,70%25%20do%20pre%C3%A7o%20da%20gasolina." target="_blank" rel="noopener noreferrer">regra dos 70%</a>.
    `;
}

    // Display results
    document.getElementById('result').innerHTML = `
        <h2>Resultado do Cálculo</h2>
        <div class="fuel-type${alcoholIsViableByPrice ? "" : " highlight"}">
            <div class="name">Gasolina:</div>
            <div class="cost">Custo por KM: R${gasolineCostPerKm.toFixed(2)}<br>Total: $${totalGasolineCost.toFixed(2)}</div>
        </div>
        <div class="fuel-type${alcoholIsViableByPrice ? " highlight" : ""}">
            <div class="name">Álcool:</div>
            <div class="cost">Custo por KM: R${alcoholCostPerKm.toFixed(2)}<br>Total: $${totalAlcoholCost.toFixed(2)}</div>
        </div>
        <div class="message">${cheaperOption}</div>
    `;
}
