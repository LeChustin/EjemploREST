const express = require('express'); 
const app = express(); 
const PUERTO = 3000; 

app.use(express.json()); 

let inventarios = [{
    id:1,
    nombre:'Lapiz',
    cantidad:23
}]; 


//http://localhost:3000/inventario

// Ruta POST para crear un nuevo inventario
app.post('/inventario', (req, res) => { 
    const { nombre, cantidad } = req.body; 
    if (!nombre || !cantidad) { 
        return res.status(400).json({ error: 'Los campos nombre y cantidad son obligatorios.' });
    }
    const nuevoInventario = {
        id: inventarios.length + 1, 
        nombre,
        cantidad,
    };
    inventarios.push(nuevoInventario); 
    res.status(201).json(nuevoInventario); 
});


//http://localhost:3000/inventario/1

// Ruta PUT para actualizar un inventario existente
app.put('/inventario/:id', (req, res) => { 
    const { id } = req.params; 
    const { nombre, cantidad } = req.body; 
    const inventario = inventarios.find(i => i.id === parseInt(id)); 

    if (!inventario) { 
        return res.status(404).json({ error: 'Inventario no encontrado.' });
    }
    
    if (!nombre || !cantidad) { 
        return res.status(400).json({ error: 'Los campos nombre y cantidad son obligatorios.' });
    }

    inventario.nombre = nombre; 
    inventario.cantidad = cantidad; 
    res.json(inventario); 
});


//http://localhost:3000/inventario/1

// Ruta DELETE para eliminar un inventario
app.delete('/inventario/:id', (req, res) => { 
    const { id } = req.params; 
    const indice = inventarios.findIndex(i => i.id === parseInt(id)); 

    if (indice === -1) { 
        return res.status(404).json({ error: 'Inventario no encontrado.' });
    }

    inventarios.splice(indice, 1); 
    
    res.status(200).json( 'Se eliminó correctamente.' ); 
});


//http://localhost:3000/inventario

// Manejo de métodos no permitidos en /inventario
//app.all('/inventario', (req, res) => { 
   // res.status(405).json({ error: 'Método no permitido en /inventario.' }); 
//});
app.get('/inventario',(req,res)=>{
res.json(inventarios);

}); 

app.listen(PUERTO, () => { 
    console.log(`Servidor ejecutándose en http://localhost:${PUERTO}`); 
});
