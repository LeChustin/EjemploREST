// Importar las dependencias necesarias
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Simular una base de datos en memoria
let resources = [];

// Ruta POST para crear un nuevo recurso
app.post('/resource', (req, res) => {
    const { name, value } = req.body;
    if (!name || !value) {
        return res.status(400).json({ error: 'Los campos name y value son obligatorios.' });
    }
    const newResource = {
        id: resources.length + 1,
        name,
        value,
    };
    resources.push(newResource);
    res.status(201).json(newResource);
});

// Ruta PUT para actualizar un recurso existente
app.put('/resource/:id', (req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    const resource = resources.find(r => r.id === parseInt(id));

    if (!resource) {
        return res.status(404).json({ error: 'Recurso no encontrado.' });
    }
    
    if (!name || !value) {
        return res.status(400).json({ error: 'Los campos name y value son obligatorios.' });
    }

    resource.name = name;
    resource.value = value;
    res.json(resource);
});

// Ruta DELETE para eliminar un recurso
app.delete('/resource/:id', (req, res) => {
    const { id } = req.params;
    const index = resources.findIndex(r => r.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Recurso no encontrado.' });
    }

    resources.splice(index, 1);
    res.status(204).send();
});

// Ruta ALL para manejar métodos HTTP no definidos específicamente
app.all('/resource', (req, res) => {
    res.status(405).json({ error: 'Método no permitido en /resource.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
