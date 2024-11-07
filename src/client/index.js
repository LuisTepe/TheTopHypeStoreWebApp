import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));

//const app = express();
const PORT = process.env.PORT || 3000;

// Sirve archivos estáticos
//app.use(express.static('public'));

// Ruta de prueba
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde el servidor' });
});

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
