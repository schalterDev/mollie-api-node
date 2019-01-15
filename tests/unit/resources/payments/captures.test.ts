import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PaymentsCaptures from '../../../../src/resources/payments/captures';
import Capture from '../../../../src/models/Capture';

import response from '../../__stubs__/payments_captures.json';

const mock = new MockAdapter(axios);

const props = {
  id: 'cpt_4qqhO89gsT',
  paymentId: 'tr_WDqYK6vllg',
};

describe('payments_captures', () => {
  let paymentsCaptures: PaymentsCaptures;
  beforeEach(() => {
    paymentsCaptures = new PaymentsCaptures(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(PaymentsCaptures.resource).toBe('payments_captures');
    expect(PaymentsCaptures.model).toBe(Capture);
  });

  describe('.get()', () => {
    mock.onGet(`/payments/${props.paymentId}/captures/${props.id}`).reply(200, response._embedded.captures[0]);

    it('should return a capture instance', done =>
      paymentsCaptures.get(props.id, { paymentId: props.paymentId })
        .then(result => {
          expect(result).toBeInstanceOf(Capture);
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => {
          expect(err).toBeUndefined();
          done();
        })
    );

    it('should work with a callback', done => {
      paymentsCaptures.get(props.id, { paymentId: props.paymentId }, (err, result) => {
        expect(result).toBeInstanceOf(Capture);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.list()', () => {
    mock.onGet(`/payments/${props.paymentId}/captures`).reply(200, response);

    it('should return a list of all order refunds', () =>
      paymentsCaptures.list({ paymentId: props.paymentId }).then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      paymentsCaptures.list({ paymentId: props.paymentId }, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });
});
