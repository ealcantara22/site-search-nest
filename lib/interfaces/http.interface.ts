export interface HttpClient {
  get(path: string, params: object): Promise<any>;
  post(path: string, params: object): Promise<any>;
  put(path: string, params: object): Promise<any>;
  delete(path: string, params: object): Promise<any>;
}

export interface HttpClientOptions {
  protocol: string;
  host: string;
}
