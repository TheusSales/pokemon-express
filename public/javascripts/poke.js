document.querySelector('form').addEventListener('submit', async(event) =>{
event.preventDefault();

try {
    const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: document.querySelector('input[name="texto"]').value }),
      });

    if (response.ok) {
        const jsonData = await response.json();
        mostrarPokemon(jsonData);
    } else {
        console.error ('Erro ao buscar o pokemon');
    }
} catch (error) {
    console.error('Erro ao buscar pokemon',error)
}
});


var container = document.getElementById('container');

function mostrarPokemon(jsonObj){
    var res = document.getElementById("res");

    if (!res) {
        res = document.createElement('div');
        res.id = 'res';
        container.appendChild(res);
    }

    res.innerHTML = '';


    //imagem
    let imageFront = jsonObj.imagemFront;
    let imageBack = jsonObj.imagemBack;

    res.innerHTML += `<img src="${imageFront}" alt="pokemon-frente">`;
    res.innerHTML += `<img src="${imageBack}" alt="pokemon-costas">`;

    //habilidades
    res.innerHTML += `<strong><br>Habilidades<br></strong>`;
    
    jsonObj.habilidades.forEach(habilidade => {
        var abilityName = habilidade.ability.name;
        res.innerHTML += `${abilityName}<br>`;
    });

    
    //tipo do pokemon
    res.innerHTML +=`<strong><br>Tipo:<br></strong>`

    jsonObj.tipos.forEach(tipos => {
        var tipo = tipos.type.name;
        res.innerHTML += `${tipo}<br>`;
    });

    //peso
    let peso = jsonObj.peso;
    res.innerHTML += `<strong><br>Peso</strong>`
    res.innerHTML += `<br>${peso} Kg<br>`;

}