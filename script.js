function calculateCost() {
    const gasolinePrice = parseFloat(document.getElementById('gasolinePrice').value);
    const alcoholPrice = parseFloat(document.getElementById('alcoholPrice').value);
    const gasolineKm = parseFloat(document.getElementById('gasolineKm').value);
    const alcoholKm = parseFloat(document.getElementById('alcoholKm').value);
    const distance = parseFloat(document.getElementById('distance').value) || 1;

    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('hidden'); // Esconde o resultado inicialmente

    if (!gasolinePrice || !alcoholPrice || !gasolineKm || !alcoholKm) {
        resultDiv.innerHTML = `<div class="message">Preencha os campos necessários!</div>`;
        resultDiv.classList.remove('hidden'); // Exibe mensagem de erro
        return;
    }

    // Calcula o custo por km
    const gasolineCostPerKm = gasolinePrice / gasolineKm;
    const alcoholCostPerKm = alcoholPrice / alcoholKm;

    const totalGasolineCost = gasolineCostPerKm * distance;
    const totalAlcoholCost = alcoholCostPerKm * distance;

    // Aplica a regra dos 75%
    const alcoholIsViableByEfficiency = alcoholCostPerKm <= 0.75 * gasolineCostPerKm;

    // Determina a melhor opção
    let cheaperOption = "";

    if (alcoholIsViableByEfficiency) {
        cheaperOption = `
        Álcool é melhor levando em consideração a
        eficiência do consumo e a regra dos 75%.
        `;
    } else {
        cheaperOption = `
        Gasolina é melhor levando em consideração a
        eficiência do consumo e a regra dos 75%.
        `;
    }

    // Exibe os resultados
    resultDiv.innerHTML = `
    <h2>Resultado do Cálculo</h2>
    <div class="fuel-type${alcoholIsViableByEfficiency ? "" : " highlight"}">
    <div class="name">Gasolina:</div>
    <div class="cost">Custo por KM: R\$ ${gasolineCostPerKm.toFixed(2)}<br>Total: R\$ ${totalGasolineCost.toFixed(2)}</div>
    </div>
    <div class="fuel-type${alcoholIsViableByEfficiency ? " highlight" : ""}">
    <div class="name">Álcool:</div>
    <div class="cost">Custo por KM: R\$ ${alcoholCostPerKm.toFixed(2)}<br>Total: R\$ ${totalAlcoholCost.toFixed(2)}</div>
    </div>
    <div class="message">${cheaperOption}</div>
    `;
    resultDiv.classList.remove('hidden'); // Mostra o resultado
}
