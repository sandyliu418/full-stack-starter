import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import { resolveNaptr } from 'dns';
import models from '../../../models/index.js'

describe('/api/cats', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['cats']);
    testSession = session(app);
  });

  it('creates a new Cat', async () => {
    const response = await testSession.post('/api/cats')
        .send({Breed: 'Create Breed', MinYears: 9})
        .expect(StatusCodes.CREATED);

    const record = await models.Cat.findByPk(response.body.id);
    assert.deepStrictEqual(record.Breed, 'Create Breed');
    assert.deepStrictEqual(record.MinYears, 9);
  })

  it('updates an existing Cat', async () => {
    await testSession.patch(`/api/cats/10001`)
        .send({
            Breed: 'Updated Breed',
            MinYears: 9
        })
        .expect(StatusCodes.OK);
    const record = await models.Cat.findByPk(10001);
    assert.deepStrictEqual(record.Breed, 'Updated Breed');
    assert.deepStrictEqual(record.MinYears, 9);
  });

  it('deletes an existing Cat', async () => {
    await testSession.delete('/api/cats/10001')
        .expect(StatusCodes.OK);

    const record = await models.Cat.findByPk(10001);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all Cats from the Cats table', async () => {
    const response = await testSession.get('/api/cats').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK)
    assert.deepStrictEqual(response.body?.length, 3);
  });

  it('fetch one Cat record from the table', async () => {
    const response = await testSession.get('/api/cats/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.id, 10001)
  });
});