import {take, put, call, apply} from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import {
  GET_CURRENT_USER_INFO,
  setCurrentUser
} from '../actions'

import {currentUserSaga} from './currentUserSaga'


describe("The current user saga", () => {
  test("it fetches and puts the current user's data", () => {
    const id = "AAAAAA"
    const user = {name: "dude bro"}
    const json = () => {}
    const response = {json}
    const gen = currentUserSaga()

    expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO))
    expect(gen.next({id}).value).toEqual(call(fetch, `http://localhost:8081/user/${id}`))
    expect(gen.next(response).value).toEqual(apply(response, response.json))
    expect(gen.next(user).value).toEqual(put(setCurrentUser(user)))
  })
})
