import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import { resolveNaptr } from 'dns';

describe('/api/cats', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['cats']);
    testSession = session(app);
  });

  it('fetch all items from the Cats table', async () => {
    const response = await testSession.get('/api/cats').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK)
    assert.deepStrictEqual(response.body?.length, 3);
  })

  it('fetch one Cat record from the table', async () => {
    const response = await testSession.get('/api/cats/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.id, 10001)
  })
});