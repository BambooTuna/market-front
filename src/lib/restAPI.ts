import axios, { AxiosError, AxiosResponse } from 'axios'

export default class RestAPI {
  private host!: string

  constructor (host = 'http://localhost:8080') {
    this.host = host
  }

  signup (payload: SignData): Promise<string> {
    return axios({
      url: this.host + '/signup',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        mail: payload.mail,
        pass: payload.pass
      }
    })
      .then((res: AxiosResponse) => this.storeSessionToken(res.headers['set-authorization']))
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  signin (payload: SignData): Promise<string> {
    return axios({
      url: this.host + '/signin',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        mail: payload.mail,
        pass: payload.pass
      }
    })
      .then((res: AxiosResponse) => this.storeSessionToken(res.headers['set-authorization']))
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  health (): Promise<string> {
    return this.findSessionToken()
      .then(sessionToken => {
        return axios({
          url: this.host + '/health',
          method: 'get',
          headers: { Authorization: sessionToken },
          data: {}
        })
      })
      .then(() => this.findSessionToken())
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  logout (): Promise<void> {
    return this.findSessionToken()
      .then(sessionToken => {
        return axios({
          url: this.host + '/logout',
          method: 'delete',
          headers: { Authorization: sessionToken },
          data: {}
        })
      })
      .then(() => this.removeSessionToken())
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  generateLineCooperationUrl (): Promise<string> {
    return axios({
      url: this.host + '/oauth2/signin/line',
      method: 'post'
    })
      .then((res: AxiosResponse) => res.data.redirectUri)
      .catch(() => Promise.reject(new Error('連携URIの発行に失敗しました')))
  }

  lineCooperationSignin (params: OAuth2CodeRedirect): Promise<string> {
    return axios({
      url: this.host + '/oauth2/signin/line',
      method: 'get',
      params: params
    }).then((res: AxiosResponse) => this.storeSessionToken(res.headers['set-authorization']))
      .catch(() => Promise.reject(new Error('Lineでのログインに失敗しました')))
  }

  getProducts (params: DisplayLimit): Promise<Array<ProductDetailResponse>> {
    return axios({
      url: this.host + '/products',
      method: 'get',
      params: params
    })
      .then((res: AxiosResponse) => {
        const list: Array<ProductDetailResponse> = res.data
        return list
      })
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  getProductDetail (productId: string): Promise<ProductDetailResponse> {
    return axios({
      url: this.host + '/product/' + productId,
      method: 'get'
    })
      .then((res: AxiosResponse) => {
        const result: ProductDetailResponse = res.data
        return result
      })
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  getMyProducts (params: StateDisplayLimit): Promise<Array<ProductDetailResponse>> {
    return this.findSessionToken().then(sessionToken => {
      return axios({
        url: this.host + '/products/self',
        method: 'get',
        headers: { Authorization: sessionToken },
        params: params
      })
    })
      .then((res: AxiosResponse) => {
        const list: Array<ProductDetailResponse> = res.data
        return list
      })
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  postProduct (data: ProductDetailRequest): Promise<string> {
    return this.findSessionToken().then(sessionToken => {
      return axios({
        url: this.host + '/product',
        method: 'post',
        headers: { Authorization: sessionToken },
        data: data
      })
    })
      .then((res: AxiosResponse) => res.data)
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  editProduct (productId: string, data: ProductDetailRequest): Promise<string> {
    return this.findSessionToken().then(sessionToken => {
      return axios({
        url: this.host + '/product/' + productId,
        method: 'put',
        headers: { Authorization: sessionToken },
        data: data
      })
    })
      .then((res: AxiosResponse) => res.data)
      .catch((e: AxiosError) => {
        const errorResponseJson: ErrorResponseJson = e.response?.data
        return Promise.reject(new Error(errorResponseJson.message))
      })
  }

  private storeSessionToken (sessionToken: string): Promise<string> {
    localStorage.setItem('sessionToken', sessionToken)
    return Promise.resolve(sessionToken)
  }

  private findSessionToken (): Promise<string> {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      return Promise.resolve(sessionToken)
    } else {
      return Promise.reject(new Error('sessionToken is null'))
    }
  }

  private removeSessionToken (): Promise<void> {
    localStorage.removeItem('sessionToken')
    return Promise.resolve()
  }
}

type SignData = {
  mail: string;
  pass: string;
}

type OAuth2CodeRedirect = {
  state: string;
  code: string;
}

export type StateEnum = 'open' | 'draft' | 'closed'
type ProductDetailRequest = {
  title: string;
  detail: string;
  price: number;
  state: StateEnum;
}

export type ProductDetailResponse = {
  id: string;
  productTitle: string;
  productDetail: string;
  requestPrice: number;
  presenterId: string;
  state: StateEnum;
}

type DisplayLimit = {
  limit?: number;
  page?: number;
}

type StateDisplayLimit = DisplayLimit & {
  state?: StateEnum;
}

type ErrorResponseJson = {
  message: string;
}
