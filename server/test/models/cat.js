import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Cat', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['cats']);
  });

  it('creates a new Cat record', async () => {
    assert.deepStrictEqual(await models.Cat.count(), 3);
    const record = await models.Cat.create({
      Breed: 'This is a test title',
      MinYears: 5,
    });
    assert.deepStrictEqual(await models.Cat.count(), 4);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.Breed, 'This is a test title');
    assert.deepStrictEqual(record.MinYears, 5);
  });

  it('finds an Cat record by its id', async () => {
    const record = await models.Cat.findByPk(10001);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.Breed, "DS1");
  })

  it('finds multiple Cat records', async () => {
    const records = await models.Cat.findAll({
      order: [['Breed', 'ASC']]
    });
    assert.deepStrictEqual(records.length, 3)
  })

  it('delete an Cat record', async () => {
    assert.deepStrictEqual(await models.Cat.count(), 3);
    const record = await models.Cat.findByPk(10001);
    await record.destroy();
    assert.deepStrictEqual(await models.Cat.count(), 2);
  })
});
