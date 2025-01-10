function calculateCost() {
  const gasolinePrice = parseFloat(
    document.getElementById("gasolinePrice").value
  );
  const alcoholPrice = parseFloat(
    document.getElementById("alcoholPrice").value
  );
  const gasolineKm = parseFloat(document.getElementById("gasolineKm").value);
  const alcoholKm = parseFloat(document.getElementById("alcoholKm").value);
  const distance = parseFloat(document.getElementById("distance").value) || 1;

  if (!gasolinePrice || !alcoholPrice || !gasolineKm || !alcoholKm) {
    document.getElementById(
      "result"
    ).innerHTML = `<div class="message">Please fill out all required fields!</div>`;
    return;
  }

  const gasolineCostPerKm = gasolinePrice / gasolineKm;
  const alcoholCostPerKm = alcoholPrice / alcoholKm;

  const totalGasolineCost = gasolineCostPerKm * distance;
  const totalAlcoholCost = alcoholCostPerKm * distance;

  let cheaperOption = "";
  if (totalGasolineCost < totalAlcoholCost) {
    cheaperOption = "Gasoline is the cheaper option.";
  } else if (totalAlcoholCost < totalGasolineCost) {
    cheaperOption = "Alcohol is the cheaper option.";
  } else {
    cheaperOption = "Both options cost the same.";
  }

  document.getElementById("result").innerHTML = `
        <h2>Calculation Results</h2>
        <div class="fuel-type${
          totalGasolineCost < totalAlcoholCost ? " highlight" : ""
        }">
            <div class="name">Gasoline:</div>
            <div class="cost">Cost per KM: $${gasolineCostPerKm.toFixed(
              2
            )}<br>Total: $${totalGasolineCost.toFixed(2)}</div>
        </div>
        <div class="fuel-type${
          totalAlcoholCost < totalGasolineCost ? " highlight" : ""
        }">
            <div class="name">Alcohol:</div>
            <div class="cost">Cost per KM: $${alcoholCostPerKm.toFixed(
              2
            )}<br>Total: $${totalAlcoholCost.toFixed(2)}</div>
        </div>
        <div class="message">${cheaperOption}</div>
    `;
}
