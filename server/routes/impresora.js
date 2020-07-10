const express = require('express');
const _ = require('underscore');

const Impresora = require('../models/impresora');

const app = express();

app.get('/impresora', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Impresora.find({}, 'marca modelo serie color ip precio')
        .skip(desde)
        .limit(limite)
        .exec((err, impresora) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Impresora.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    impresora,
                    numero: conteo
                });
            });
        })
});

app.post('/impresora', (req, res) => {

    let body = req.body
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio
    });
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            impresora: impresoraDB
        });
    });
});

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['modelo', 'color', 'ip', 'precio']);

    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            impresora: impresoraBD
        });
    });
});

app.delete('/impresora/:id', (req, res) => {

    let id = req.params.id;

    Impresora.findByIdAndDelete(id, (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!impresoraBD) {
            res.json({
                ok: false,
                err: {
                    message: "Impresora no encontrado"
                }
            });
        } else {
            res.json({
                ok: true,
                impresora: impresoraBD
            });
        }
    });
});



module.exports = app;