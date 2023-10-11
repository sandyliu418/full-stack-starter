import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Cat', () => {
  beforeEach(async () => {
    await helper.loadFixtures([]);
  });

  it('creates a new Cat record', async () => {
    assert.deepStrictEqual(await models.Cat.count(), 0);
    const record = await models.Cat.create({
      Breed: 'This is a test title',
      MinYears: 5,
    });
    assert.deepStrictEqual(await models.Cat.count(), 1);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.Breed, 'This is a test title');
    assert.deepStrictEqual(record.MinYears, 5);
  });
});
