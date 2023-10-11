#!/usr/bin/env node

import fetch from 'node-fetch';
import models from '../models/index.js';

const token = 'patmGL23WnOFhPE6L.bceecd89f7267b2c0b9ef548206bf444c973b1ac0c66babf951c5d40b9b8a557';
const url = 'https://api.airtable.com/v0/appxlyRNEkCsi29zT/Cats';
fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => response.json())
  .then(async (data) => {
    // console.log(data)
    for (const record of data.records) {
      await models.Cat.create({
        Breed: record.fields.Breed,
        MinYears: record.fields.MinYears, //this is where we transport the data
      });
    }
  });
