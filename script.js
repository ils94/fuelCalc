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

    // Verifica se o álcool é viável pelo preço
    const alcoholIsViableByPrice = alcoholPrice <= 0.7 * gasolinePrice;

    // Calcula o custo por km
    const gasolineCostPerKm = gasolinePrice / gasolineKm;
    const alcoholCostPerKm = alcoholPrice / alcoholKm;

    const totalGasolineCost = gasolineCostPerKm * distance;
    const totalAlcoholCost = alcoholCostPerKm * distance;

    // Determina a melhor opção
    let cheaperOption = "";

    if (alcoholIsViableByPrice && alcoholCostPerKm < gasolineCostPerKm) {
        cheaperOption = `
        Álcool é melhor levando em consideração a
        <a href="https://autopapo.com.br/noticia/porcentagem-gasolina-ou-etanol/" target="_blank" rel="noopener noreferrer">regra dos 75%</a>.
        `;
    } else {
        cheaperOption = `
        Gasolina é melhor levando em consideração a
        <a href="https://autopapo.com.br/noticia/porcentagem-gasolina-ou-etanol/" target="_blank" rel="noopener noreferrer">regra dos 75%</a>.
        `;
    }

    // Exibe os resultados
    resultDiv.innerHTML = `
    <h2>Resultado do Cálculo</h2>
    <div class="fuel-type${alcoholIsViableByPrice && alcoholCostPerKm < gasolineCostPerKm ? "" : " highlight"}">
    <div class="name">Gasolina:</div>
    <div class="cost">Custo por KM: R\$ ${gasolineCostPerKm.toFixed(2)}<br>Total: R\$ ${totalGasolineCost.toFixed(2)}</div>
    </div>
    <div class="fuel-type${alcoholIsViableByPrice && alcoholCostPerKm < gasolineCostPerKm ? " highlight" : ""}">
    <div class="name">Álcool:</div>
    <div class="cost">Custo por KM: R\$ ${alcoholCostPerKm.toFixed(2)}<br>Total: R\$ ${totalAlcoholCost.toFixed(2)}</div>
    </div>
    <div class="message">${cheaperOption}</div>
    `;
    resultDiv.classList.remove('hidden'); // Mostra o resultado
}
