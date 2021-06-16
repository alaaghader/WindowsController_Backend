var express = require('express');
var router = express.Router();
const actions = require('../utilitiesFunctions/execute');
const Joi = require('@hapi/joi');

router.post('/shutdown', (req, res) => {
    actions.exc("shutdown.exe /s /t 00", req, res);
});

router.post('/restart', (req, res) => {
    actions.exc("shutdown.exe /r /t 00", req, res);
});

router.post('/chrome', (req, res) => {
    actions.exc("start chrome", req, res);
});

router.post('/notepad', (req, res) => {
    const data = {
        textName: req.body.textName,
        textValue: req.body.textValue,
    };
    const schema = Joi.object().keys({
        textName: Joi.string().required(),
        textValue: Joi.string().required(),
    });
    Joi.validate(data, schema, (err) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            var fs = require('fs');
            fs.writeFile(data.textName + '.txt', data.textValue, function (err) {
                if (err) throw err;
            });
            actions.exc("start " + data.textName + ".txt", req, res);
        }
    });
});

router.post('/scheduleShutdown', (req, res) => {
    const data = {
        getTime: req.body.value,
    };
    const schema = Joi.object().keys({
        getTime: Joi.number().required(),
    });
    Joi.validate(data, schema, (err) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            actions.exc("shutdown.exe /s /t " + data.getTime, req, res);
        }
    });
});

router.post('/scheduleRestart', (req, res) => {
    const data = {
        getTime: req.body.value,
    };
    const schema = Joi.object().keys({
        getTime: Joi.number().required(),
    });
    Joi.validate(data, schema, (err) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            actions.exc("shutdown.exe /r /t " + data.getTime, req, res);
        }
    });
});

router.post('/executeCommand', (req, res) => {
    const data = {
        command: req.body.value,
    };
    const schema = Joi.object().keys({
        command: Joi.string().required(),
    });
    Joi.validate(data, schema, (err) => {
        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            actions.exc(data.command, req, res);
        }
    });
});

module.exports = router;