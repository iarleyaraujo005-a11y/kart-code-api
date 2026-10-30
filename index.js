const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Estado global único para o jogador
let estadoUnico = {
  acao: "parado",
  giroscopio: { alpha: "0.0", beta: "0.0", gamma: "0.0" },
  timestamp: 0
};

// Recebe os dados do celular
app.post('/teste', (req, res) => {
  estadoUnico = req.body;
  console.log('Dados recebidos:', estadoUnico);
  res.send("OK!");
});

// O Godot busca este endpoint para ler os controles atuais
app.get('/estado', (req, res) => {
  res.json(estadoUnico);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000!!'));