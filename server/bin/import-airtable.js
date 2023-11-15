#!/usr/bin/env node

import path from 'path';
import { unlink, writeFile } from 'fs/promises';

import models from '../models/index.js';
import s3 from '../lib/s3.js';

// import fetch from 'node-fetch';
// import models from '../models/index.js';

const token = 'patmGL23WnOFhPE6L.bceecd89f7267b2c0b9ef548206bf444c973b1ac0c66babf951c5d40b9b8a557';
const url = 'https://api.airtable.com/v0/appxlyRNEkCsi29zT/Cats';
fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => response.json())
  .then(async (data) => {
    // console.log(data)
    for (const record of data.records) {
      let Image;
      if (record.fields.Image.length > 0) {
        const attachment = record.fields.Image[0];
        const { filename, url } = attachment;
        const filePath = path.resolve(filename);
        try {
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          await writeFile(filePath, Buffer.from(arrayBuffer));
          const key = path.join('uploads', filename);
          await s3.putObject(key, filePath);
          Image = filename;
        } catch (err) {
          console.log(err);
        } finally {
          await unlink(filePath);
        }
      }
      await models.Cat.create({
        Breed: record.fields.Breed,
        MinYears: record.fields.MinYears, //this is where we transport the data
        Image,
      });
    }
  });
