const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    //host: "kidsgames.ibgcostarica.com",
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
    },
    });
// Obtener todas las inscripciones
router.get('/inscripciones', (req, res) => {
console.log('GET /inscripciones called');
    const query = 'SELECT * FROM Inscripciones';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener inscripciones:', error);
            res.status(500).json({ 
                error: 'Error al obtener inscripciones',
                details: error.message
            });
        } else {
            res.status(200).json(results);
        }
    });
});

    router.post('/inscripciones/test', (req, res) => {
    console.log('POST /inscripciones called');
        const {
            nombre_menor,
            cedula_menor,
            fecha_nacimiento,
            escuela,
            grado,
            direccion,
            nombre_encargado,
            cedula_encargado,
            correo_electronico,
            telefono_1,
            telefono_2,
            contacto_emergencia,
            telefono_emergencia,
            taller,
            alergias
        } = req.body;
    
        console.log('Data received:', req.body);
        
        const query = 'INSERT INTO Inscripciones SET ?';
        const newInscripcion = {
            nombre_menor,
            cedula_menor,
            fecha_nacimiento,
            escuela,
            grado,
            direccion,
            nombre_encargado,
            cedula_encargado,
            correo_electronico,
            telefono_1,
            telefono_2,
            contacto_emergencia,
            telefono_emergencia,
            taller,
            alergias
        };
    
        db.query(query, newInscripcion, (error, results) => {
            if (error) {
                console.error('Error al insertar inscripcion:', error);
                res.status(500).json({ 
                    error: 'Error al insertar inscripción',
                    details: error.message
                });
            } else {
                //res.status(201).json({ message: 'Inscripción creada exitosamente y correo enviado', id: results.insertId });
                const mailOptions = {
                    from: 'inscripciones@kidsgames.ibgcostarica.com',
                    to: correo_electronico,
                    //bcc: process.env.MAIL_TO,
                    subject: 'Confirmación de Inscripción',
                    text: `Hola ${nombre_encargado},\n\nTu inscripción para ${nombre_menor} ha sido recibida exitosamente.\n\nGracias,\nKids Games Team`
                  };

                  transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      console.error('Error al enviar el correo electrónico:', err);
                      res.status(500).json({ 
                        error: 'Error al enviar el correo electrónico',
                        details: err.message
                      });
                    } else {
                      res.status(201).json({ message: 'Inscripción creada exitosamente y correo enviado', id: results.insertId });
                    }
                });
            }
        });
    });

// Insertar una nueva inscripción
router.post('/inscripciones', (req, res) => {
    const {
        nombre_menor,
        cedula_menor,
        fecha_nacimiento,
        escuela,
        grado,
        direccion,
        nombre_encargado,
        cedula_encargado,
        correo_electronico,
        telefono_1,
        telefono_2,
        contacto_emergencia,
        telefono_emergencia,
        taller,
        alergias
    } = req.body;

    const query = 'INSERT INTO Inscripciones SET ?';
    const newInscripcion = {
        nombre_menor,
        cedula_menor,
        fecha_nacimiento,
        escuela,
        grado,
        direccion,
        nombre_encargado,
        cedula_encargado,
        correo_electronico,
        telefono_1,
        telefono_2,
        contacto_emergencia,
        telefono_emergencia,
        taller,
        alergias
    };

    db.query(query, newInscripcion, (error, results) => {
        if (error) {
            console.error('Error al insertar inscripcion:', error);
            res.status(500).json({ 
                error: 'Error al insertar inscripción',
                details: error.message
            });
        } else {
            const mailOptions = {
                from: 'inscripciones@kidsgames.ibgcostarica.com',
                to: correo_electronico,
                bcc: 'marysequeira@hotmail.com',
                subject: 'Confirmación de Inscripción',
                text: `Hola ${nombre_encargado},\n\nTu inscripción para ${nombre_menor} ha sido recibida exitosamente.\n\nGracias,\nKids Games Team`
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.error('Error al enviar el correo electrónico:', err);
                  res.status(500).json({ 
                    error: 'Error al enviar el correo electrónico',
                    details: err.message
                  });
                } else {
                  res.status(201).json({ message: 'Inscripción creada exitosamente y correo enviado', id: results.insertId });
                }
            });
        }
    });
});

module.exports = router;
