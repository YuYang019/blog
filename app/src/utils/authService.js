/**
 * Created by maoyuyang on 17/8/28.
 */
import Cookies from 'universal-cookie'

const cookies = new Cookies()

let cookieConfig = {
  path: '/',
  maxAge: 365 * 24 * 60 * 60
}

export function saveCookie(name, value) {
  console.log(value)
  cookies.set(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookies.get(name)
}

export function removeCookie(name) {
  cookies.remove(name, cookieConfig)
}

export function signOut() {
  cookies.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookies.get('token')
}
