import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  DisplayLimit, ErrorResponseJson,
  OAuth2CodeRedirect, ProductDetailRequest,
  ProductDetailResponse,
  SignData,
  StateDisplayLimit
} from '@/lib/RestAPIProtocol'

export default class RestAPI {
  private host!: string
  private _unauthorizedErrorHandler<T> (): Promise<T> { return Promise.reject(new Error('Default Error')) }

  set unauthorizedErrorHandler (f: <T>() => Promise<T>) {
    this._unauthorizedErrorHandler = f
  }

  get unauthorizedErrorHandler () {
    return this._unauthorizedErrorHandler
  }

  constructor (host = process.env.VUE_APP_SERVER_ENDPOINT) {
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
      .catch((e: AxiosError) => this.unauthorizedHandler<string>(e))
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
      .catch((e: AxiosError) => this.unauthorizedHandler<string>(e))
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
          .then(() => this.findSessionToken())
          .catch((e: AxiosError) => this.unauthorizedHandler<string>(e))
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
          .then(() => this.removeSessionToken())
          .catch((e: AxiosError) => this.unauthorizedHandler<void>(e))
      })
  }

  generateLineCooperationUrl (): Promise<string> {
    return axios({
      url: this.host + '/oauth2/signin/line',
      method: 'post'
    })
      .then((res: AxiosResponse) => res.data.redirectUri)
      .catch((e: AxiosError) => this.errorMessageHandler<string>(e))
  }

  lineCooperationSignin (params: OAuth2CodeRedirect): Promise<string> {
    return axios({
      url: this.host + '/oauth2/signin/line',
      method: 'get',
      params: params
    })
      .then((res: AxiosResponse) => this.storeSessionToken(res.headers['set-authorization']))
      .catch((e: AxiosError) => this.unauthorizedHandler<string>(e))
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
      .catch((e: AxiosError) => this.errorMessageHandler<Array<ProductDetailResponse>>(e))
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
      .catch((e: AxiosError) => this.errorMessageHandler<ProductDetailResponse>(e))
  }

  getMyProductDetail (productId: string): Promise<ProductDetailResponse> {
    return this.findSessionToken().then(sessionToken => {
      return axios({
        url: this.host + '/product/' + productId,
        method: 'get',
        headers: { Authorization: sessionToken }
      })
        .then((res: AxiosResponse) => {
          const result: ProductDetailResponse = res.data
          return result
        })
        .catch((e: AxiosError) => this.errorMessageHandler<ProductDetailResponse>(e))
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
        .then((res: AxiosResponse) => {
          const list: Array<ProductDetailResponse> = res.data
          return list
        })
        .catch((e: AxiosError) => this.unauthorizedHandler<Array<ProductDetailResponse>>(e))
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
        .then((res: AxiosResponse) => res.data)
        .catch((e: AxiosError) => this.unauthorizedHandler<string>(e))
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
        .then((res: AxiosResponse) => res.data)
        .catch((e: AxiosError) => this.unauthorizedHandler<string>(e))
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

  private unauthorizedHandler<T> (e: AxiosError): Promise<T> {
    if (e.response?.status === 401) {
      return this.removeSessionToken()
        .then(() => this._unauthorizedErrorHandler<T>())
    } else {
      return this.errorMessageHandler(e)
    }
  }

  private errorMessageHandler<T> (e: AxiosError): Promise<T> {
    const errorResponseJson: ErrorResponseJson = e.response?.data
    return Promise.reject(new Error(errorResponseJson.message))
  }
}