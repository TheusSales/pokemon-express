var container = document.getElementById('container');

async function buscar(){
    try {
        let pokeName = pokeNameInput.value.toLowerCase(); // Obtém o valor do input e converte para minúsculas
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        var data = await response.json();
        mostrarPokemon(data,pokeName);
        //const prettyData = JSON.stringify(data, null, 2);
    } catch (error) {
        window.alert(`Ocorreu um erro: ${error}`);
    }
}

function mostrarPokemon(jsonObj){
    var res = document.getElementById("res");

    if (!res) {
        res = document.createElement('div');
        res.id = 'res';
        container.appendChild(res);
    }

    res.innerHTML = '';

    //imagem
    let imageFront = jsonObj.sprites.front_default;
    let imageBack = jsonObj.sprites.back_default;

    res.innerHTML += `<img src="${imageFront}" alt="pokemon-frente">`;
    res.innerHTML += `<img src="${imageBack}" alt="pokemon-costas">`;

    //habilidades
    res.innerHTML += `<strong><br>Habilidades<br></strong>`;
    
    jsonObj.abilities.forEach(habilidade => {
        var abilityName = habilidade.ability.name;
        res.innerHTML += `${abilityName}<br>`;
    });

    
    //tipo do pokemon
    res.innerHTML +=`<strong><br>Tipo:<br></strong>`

    jsonObj.types.forEach(tipos => {
        var tipo = tipos.type.name;
        res.innerHTML += `${tipo}<br>`;
    });

    //peso
    let peso = Math.floor(jsonObj.weight/10);
    res.innerHTML += `<strong><br>Peso</strong>`
    res.innerHTML += `<br>${peso} Kg<br>`;

}