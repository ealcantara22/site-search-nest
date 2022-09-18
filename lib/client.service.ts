import { HttpClient, SiteSearchOptions } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { SITE_SEARCH_CONFIG } from './site-search.constants';
import axios, { Axios } from 'axios';
import { SiteSearchException } from './exceptions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as packageJson from '../package.json';

@Injectable()
export class ClientService implements HttpClient {
  private readonly axios: Axios;

  constructor(
    @Inject(SITE_SEARCH_CONFIG) private readonly config: SiteSearchOptions,
  ) {
    const {
        apiKey,
        basePath = 'api/v1',
        host = 'api.swiftype.com',
        protocol = 'https',
      } = this.config,
      encodedKey = Buffer.from(apiKey, 'utf-8').toString('base64'),
      baseUrl = new URL(basePath, `${protocol}://${host}`).toString();

    this.axios = axios;
    this.axios.defaults.baseURL = baseUrl;
    this.axios.defaults.headers.common = {
      Authorization: `Basic ${encodedKey}`,
      'Content-Type': 'application/json',
      'X-Swiftype-Client': 'elastic-site-search-nest',
      'X-Swiftype-Client-Version': packageJson.version,
    };
    this.axios.defaults.headers.delete['Accept'] = '*/*';
  }

  async get(path: string, params: object): Promise<any> {
    const uri = this._buildUriComponents(path, params);

    try {
      const { data } = await this.axios.get(uri.path, {
        params: uri.params,
      });

      return data;
    } catch (e) {
      this.errorToHttpException(e);
    }
  }

  async post(path: string, params: object): Promise<any> {
    const uri = this._buildUriComponents(path, params);

    try {
      const { data } = await this.axios.post(uri.path, uri.params, {
        params: uri.params,
      });

      return data;
    } catch (e) {
      this.errorToHttpException(e);
    }
  }

  async put(path: string, params: object): Promise<any> {
    const uri = this._buildUriComponents(path, params);

    try {
      const { data } = await this.axios.put(uri.path, uri.params, {
        params: uri.params,
      });

      return data;
    } catch (e) {
      this.errorToHttpException(e);
    }
  }

  async delete(path: string, params: object): Promise<any> {
    const uri = this._buildUriComponents(path, params);

    try {
      const { data } = await this.axios.delete(uri.path);

      return data;
    } catch (e) {
      this.errorToHttpException(e);
    }
  }

  /**
   * Parse the response error received from the API
   * TODO: throw the proper exception based on the http status code
   * @param error
   * @private
   */
  private errorToHttpException(error) {
    const { data, status } = error.response;
    throw new SiteSearchException(data, status);
  }

  private _serializeParams(obj: object, prefix: string) {
    const str = [],
      isArray = Array.isArray(obj);

    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        const v = obj[p];
        let k = '';

        if (prefix) {
          k += prefix;
          k += '[';
          if (!isArray) {
            k += p;
          }
          k += ']';
        } else {
          k = p;
        }

        str.push(
          typeof v == 'object'
            ? this._serializeParams(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v),
        );
      }
    }
    return str.join('&');
  }

  /**
    Parses a path string, replacing '{property}' tags with the
    corresponding value from the params object and removes those
    properties from the params object.

      > var path = '/engines/{engine}/document_types/{documentType}.json'
      > var params = { engine: 'foo', documentType: 'bar', another: 'param' }
      > this._buildUri(path, params)
        { path: '/engines/foo/document_types/bar.json, params: { another: 'param' } }
  */
  private _buildUriComponents(path: string, params: object) {
    path = path.replace(/{([^{}]*)}/g, (tag, property) => {
      const param = params[property];
      delete params[property];
      return param;
    });

    return { path: path, params: params };
  }
}
