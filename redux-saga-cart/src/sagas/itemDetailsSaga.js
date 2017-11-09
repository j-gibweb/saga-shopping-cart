import { take, fork, put, call } from 'redux-saga/effects'

import {
  SET_CART_ITEMS,
  setItemDetails
} from '../actions'

function* loadItemDetails(item) {
  // console.log(item)
  const {id} = item
  const response = yield call(fetch, `http://localhost:8081/items/${id}`)
  const data = yield response.json()
  const info = data[0]
  yield put(setItemDetails(info))
}

export function* itemDetailsSaga() {
  const {items} = yield take(SET_CART_ITEMS)
  yield items.map(item => fork(loadItemDetails, item))
}
