import axios, { AxiosResponse } from 'axios'

export default class RestAPI {
  private host!: string

  constructor (host = 'http://localhost:8080') {
    this.host = host
  }

  health (): Promise<void> {
    return this.findSessionToken()
      .then(sessionToken => {
        return axios.get(this.host + '/health', {
          headers: { 'Set-Authorization': sessionToken },
          data: {}
        })
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          return Promise.resolve()
        } else {
          return Promise.reject(new Error('BadRequest'))
        }
      })
  }

  signup (payload: SignData): Promise<void> {
    return axios.post(this.host + '/signup', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        mail: payload.mail,
        pass: payload.pass
      }
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        console.log(200)
        return this.storeSessionToken(res.headers.Authorization)
      }
    })
  }

  signin (payload: SignData): Promise<void> {
    return axios.post(this.host + '/signin', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        mail: payload.mail,
        pass: payload.pass
      }
    }).then(res => {
      if (res.status === 200) {
        return this.storeSessionToken(res.headers.Authorization)
      }
    })
  }

  private storeSessionToken (sessionToken: string): Promise<void> {
    return Promise.resolve(localStorage.setItem('sessionToken', sessionToken))
  }

  private findSessionToken (): Promise<string> {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      return Promise.resolve('')
    } else {
      return Promise.reject(new Error('sessionToken is null'))
    }
  }
}

type SignData = {
  mail: string;
  pass: string;
}
