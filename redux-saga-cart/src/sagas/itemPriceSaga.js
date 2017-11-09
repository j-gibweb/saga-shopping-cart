import { take, all, fork, put, call } from 'redux-saga/effects'

import {
  SET_CART_ITEMS,
  SET_CURRENT_USER,
  SET_ITEM_DETAILS,
  setItemPrice
} from '../actions'

function* fetchItemPrice(id, country) {
  const response = yield call(fetch, `http://localhost:8081/prices/${country}/${id}`)
  const json = yield response.json()
  const price = json[0].price
  yield put(setItemPrice(id, price))
}

export function* itemPriceSaga() {
  const [{user}, {items}, deets] = yield all([
    take(SET_CURRENT_USER),
    take(SET_CART_ITEMS),
    take(SET_ITEM_DETAILS)
  ])
  // console.log('deets: ', deets)
  yield items.map(item => call(fetchItemPrice, item.id, user.country))
}
