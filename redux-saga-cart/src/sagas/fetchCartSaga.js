import { take, put, call } from 'redux-saga/effects'

import {
  SET_CURRENT_USER,
  setCartItems
} from '../actions'

export function* fetchCartSaga() {
  const {user} = yield take(SET_CURRENT_USER)
  const {id} = user
  const response = yield call(fetch, `http://localhost:8081/cart/${id}`)
  const {items} = yield response.json()
  yield put(setCartItems(items))
  // console.log('finished cart saga', items)
}
