import { takeLatest, put, call, select } from 'redux-saga/effects'

import {
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  setItemQuantityFetchStatus,
  decreaseItemQuantity,
  FETCHING, FETCHED

} from '../actions'

import {
  currentUserSelector
} from '../selectors'

export function* handleIncreaseItemQuantity({id}) {
  yield put(setItemQuantityFetchStatus(FETCHING))
  const user = yield select(currentUserSelector)
  const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}`)

  if (response.status !== 200) {
    yield put(decreaseItemQuantity(id, true))
    // alert('shit is wrong')
  }

  yield put(setItemQuantityFetchStatus(FETCHED))
}

export function* handleDecreaseItemQuantity({id, local}) {
  if (local) {
    return;
  }
  yield put(setItemQuantityFetchStatus(FETCHING))
  const user = yield select(currentUserSelector)
  const response = yield call(fetch, `http://localhost:8081/cart/remove/${user.get('id')}/${id}`)
  // console.log('response: ', response)

  if (response.status !== 200) {
    alert('shit is wrong')
  }

  yield put(setItemQuantityFetchStatus(FETCHED))
}

export function* itemQuantitySaga() {
  yield [
    takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
  ]
}
