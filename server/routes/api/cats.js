import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import models from '../../models/index.js';
import interceptors from '../interceptors.js';
import helpers from '../helpers.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const record = await models.Cat.create(_.pick(req.body, [
            'Breed', 'MinYears'
        ]));
        res.status(StatusCodes.CREATED).json(record.toJSON());
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
}); 

router.get('/', async (req, res) => {
    const records = await models.Cat.findAll();
    res.json(records.map((r) => r.toJSON()));
});

router.patch('/:id', async (req, res) => {
    try {
        const record = await models.Cat.findByPk(req.params.id);
        await record.update(_.pick(req.body, [
            'Breed', 'MinYears'
        ]));
        res.json(record.toJSON());
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const record = await models.Cat.findByPk(req.params.id);
        await record.destroy();
        res.status(StatusCodes.OK).end();
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
});

router.get('/:id', async (req, res) => {
    try {
    const record = await models.Cat.findByPk(req.params.id);
    res.json(record.toJSON());
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
});

export default router;