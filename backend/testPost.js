const axios = require('axios');

const data = {
    Nombre_Menor: "John Doe",
    Cedula_Menor: "123456789",
    Fecha_Nacimiento: "2005-08-15",
    Escuela: "Escuela Primaria",
    Grado: "5th Grade",
    Dirección: "123 Main St",
    Nombre_Encargado: "Jane Doe",
    Cedula_Encargado: "987654321",
    Correo_Electronico: "jane.doe@example.com",
    Teléfono_1: "555-1234",
    Teléfono_2: "555-5678",
    Contacto_Emergencia: "John Smith",
    Telefono_Emergencia: "555-8765",
    Taller: "Art",
    Alergias: "None"
};

axios.post('https://kidsgames.ibgcostarica.com/api/inscripciones', data)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
