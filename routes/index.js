var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: false }));

// Definir a pasta de visualizações (se estiver usando um mecanismo de modelo)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // Se você estiver usando EJS, por exemplo

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});


router.post('/', async function(req, res) {
  const itemDigitado = req.body.texto; 
  try {
    let pokeName = itemDigitado.toLowerCase(); // Obtém o valor do input e converte para minúsculas
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    var data = await response.json();

    var pokemonData = filtrarJSON(data)
    console.log(pokemonData);
    res.json(pokemonData);
    
} catch (error) {
    res.send(`Ocorreu um erro: ${error}`);
  }
});


// router.get('/', async function(req, res, next) {
// });

function filtrarJSON(data){
  let pokemonData = {
    imagemFront: data.sprites.front_default,
    imagemBack: data.sprites.back_default,
    peso: Math.floor(data.weight/10),
    habilidades:[],
    tipos:[]
  }
    data.abilities.forEach(habilidade => {
      pokemonData.habilidades.push(habilidade);
    });

    data.types.forEach(tipo => {
      pokemonData.tipos.push(tipo);
    });

    return pokemonData;

}

module.exports = router;