import { RefundData } from './data';
import OrderLine, { transform as transformOrderLine } from '../orders/orderlines/OrderLine';
import Payment, { transform as transformPayment } from '../payments/Payment';
import Seal from '../../types/Seal';
import RefundHelper from './RefundHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Refund = Seal<Omit<RefundData, 'lines' | '_embedded'> & { lines?: OrderLine[]; _embedded?: { payment?: Payment } }, RefundHelper>;

export default Refund;

export function transform(networkClient: TransformingNetworkClient, input: RefundData): Refund {
  let _embedded: Refund['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payment != undefined) {
      _embedded.payment = transformPayment(networkClient, input._embedded.payment);
    }
  }
  let lines: Refund['lines'];
  if (input.lines != undefined) {
    lines = input.lines.map(transformOrderLine);
  }
  return Object.assign(new RefundHelper(networkClient, input._links, _embedded), input, {
    lines,
    _embedded,
  });
}
