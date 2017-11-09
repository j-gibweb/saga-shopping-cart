import { takeLatest, put, select } from 'redux-saga/effects'

import {
  SET_CART_ITEMS,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  FETCHED,
  FETCHING,
  setShippingFetchStatus,
  setShippingCost
} from '../actions'

import {
  cartItemsSelector
} from '../selectors'

function* shipping() {
  yield put(setShippingFetchStatus(FETCHING))
  const items = yield select(cartItemsSelector)
  const itemRequestString = items.reduce((acc, item) => {
    for (var i = 0; i < item.get('quantity'); i++) {
      acc += item.get('id') + ','
    }
    return acc
  }, '').replace(/,\s*$/, '')

  const response = yield fetch(`http://localhost:8081/shipping/${itemRequestString}`);
  const { total } = yield response.json();
  yield put(setShippingCost(total));
  yield put(setShippingFetchStatus(FETCHED));

}

export function* shippingSaga() {
  yield takeLatest([
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
  ],
  shipping
  )
}
