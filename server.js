const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('banco.db');

app.use(cors());
app.use(express.json());

app.get('/lista/:id_categoria', (req, res) => {
    const idCategoria = req.params.id_categoria; 
    db.all('SELECT * FROM Itens WHERE id_categoria = ?', [idCategoria], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/categ', (req, res) => {
    db.all('SELECT * FROM Categoria', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/unid', (req, res) => {
    db.all('SELECT * FROM Unidade', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.put('/marcar-item/:id_item/:novo_valor', (req, res) => {
    const idItem = req.params.id_item;
    const novoValor = req.params.novo_valor;
    db.run('UPDATE Itens SET checked = ? WHERE id = ?', [novoValor, idItem], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Item editado com sucesso');
        }
    });
});

app.put('/editar/:id_item', (req, res) => {
    const idItem = req.params.id_item;
    const { item, quantidade, desc } = req.body;
    db.run('UPDATE Itens SET item = ?, quantidade = ?, desc = ? WHERE id = ?', [item, quantidade, desc, idItem], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Item editado com sucesso');
        }
    });
});

app.post('/novo', (req, res) => { 
    const { selectCateg, nomeitemnovo, selectUnid, quantidade, descricao } = req.body;
    db.run(`INSERT INTO Itens (id_categoria, item, quantidade, id_unidade, foto, checked, desc) VALUES (?, ?, ?, ?, NULL, 0, ?)`, [selectCateg, nomeitemnovo, quantidade, selectUnid, descricao], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);

        } else {
            res.send('Item editado com sucesso');
        }
    });
});

app.delete('/remover/:id_item', (req, res) => {
    const idItem = req.params.id_item;
    db.run('DELETE FROM Itens WHERE id = ?', idItem, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Item removido com sucesso');
        }
    });
});



app.listen(port, () => {
    console.log(`Servidor rodando em: ${port}`);
});
