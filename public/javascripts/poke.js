var res = document.getElementById('res');

async function buscar(){
    try {
        let pokeNameInput = document.getElementById('entra'); // Obtém o elemento input
        let pokeName = pokeNameInput.value.toLowerCase(); // Obtém o valor do input e converte para minúsculas
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        var data = await response.json();
        mostrarPokemon(data,pokeName);
        //const prettyData = JSON.stringify(data, null, 2);
    } catch (error) {
        res.innerHTML = `Ocorreu um erro: ${error}`;
    }
}

function mostrarPokemon(jsonObj,pokeName){
    res.innerHTML = '';
    res.innerHTML += `Habilidades:<br>`;
    
    jsonObj.abilities.forEach(habilidade => {
        var abilityName = habilidade.ability.name;
        res.innerHTML += `${abilityName}<br>`;
    });

    let peso = Math.floor(jsonObj.weight/10);

    let tipo = JSON.stringify(jsonObj.types[0].type.name).replace(/"/g,"");

    res.innerHTML += `<br>Peso: ${peso} Kg`

    res.innerHTML += `<br>Tipo: ${tipo}`

}