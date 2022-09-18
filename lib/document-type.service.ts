import { Injectable } from '@nestjs/common';
import { ClientService } from './client.service';
import {
  CreateDocumentTypeRequest,
  DeleteDocumentTypeRequest,
  DocumentTypeApi,
  DocumentTypeRequest,
  GetDocumentTypeRequest,
} from './interfaces';
import { DOCUMENT_TYPE_PATHS } from './site-search.constants';

@Injectable()
export class DocumentTypeService implements DocumentTypeApi {
  constructor(private readonly client: ClientService) {}

  /**
   * Add a document type to an engine
   * @see {@link https://swiftype.com/documentation/site-search/indexing#add-documenttype}
   * @param params
   */
  async create(params: CreateDocumentTypeRequest): Promise<any> {
    return this.client.post(DOCUMENT_TYPE_PATHS.CREATE, params);
  }

  /**
   * Delete a document type from an engine
   * @see {@link https://swiftype.com/documentation/site-search/indexing#delete-documenttype}
   * @param params
   */
  async delete(params: DeleteDocumentTypeRequest): Promise<any> {
    return this.client.post(DOCUMENT_TYPE_PATHS.DELETE, params);
  }

  /**
   * List a specific document type by id
   * @see {@link https://swiftype.com/documentation/site-search/indexing#documenttypes-single}
   * @param params
   */
  async get(params: GetDocumentTypeRequest): Promise<any> {
    return this.client.post(DOCUMENT_TYPE_PATHS.GET, params);
  }

  /**
   * List all document types
   * @see {@link https://swiftype.com/documentation/site-search/indexing#documenttypes-all}
   * @param params
   */
  async list(params: DocumentTypeRequest): Promise<any> {
    return this.client.post(DOCUMENT_TYPE_PATHS.LIST, params);
  }
}
