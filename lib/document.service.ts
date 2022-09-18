import {
  CreateOrUpdateDocumentRequest,
  CreateOrUpdateDocumentsRequest,
  DeleteDocumentRequest,
  DeleteDocumentsRequest,
  DocumentApi,
  DocumentResponse,
  GetDocumentRequest,
  ListDocumentsRequest,
  UpdateDocumentFieldsRequest,
} from './interfaces';
import { Injectable } from '@nestjs/common';
import { ClientService } from './client.service';
import { DOCUMENT_PATHS } from './site-search.constants';

@Injectable()
export class DocumentService implements DocumentApi {
  constructor(private readonly client: ClientService) {}

  /**
   * Create or update a document, if the external_id exist, update the document.
   * @see {@Link https://swiftype.com/documentation/site-search/indexing#add-document}
   * @param params
   */
  async createOrUpdate(
    params: CreateOrUpdateDocumentRequest,
  ): Promise<DocumentResponse> {
    return this.client.post(DOCUMENT_PATHS.CREATE_UPDATE, params);
  }

  /**
   * Create or update a documents in bulk.
   * @see {@Link https://swiftype.com/documentation/site-search/indexing#bulk_create_or_update_verbose}
   * @param params
   */
  async createOrUpdateInBulk(
    params: CreateOrUpdateDocumentsRequest,
  ): Promise<DocumentResponse[]> {
    return this.client.post(DOCUMENT_PATHS.CREATE_UPDATE_IN_BULK, params);
  }

  /**
   * Delete a document by external_id value
   * @see {@Link https://swiftype.com/documentation/site-search/indexing#delete-external-id}
   * @param params
   */
  async delete(params: DeleteDocumentRequest): Promise<any> {
    return this.client.delete(DOCUMENT_PATHS.DELETE, params);
  }

  /**
   * Remove documents in bulk
   * @see {@Link https://swiftype.com/documentation/site-search/indexing#bulk_destroy}
   * @param params
   */
  async deleteInBulk(params: DeleteDocumentsRequest): Promise<any> {
    return this.client.delete(DOCUMENT_PATHS.DELETE_IN_BULK, params);
  }

  /**
   * List a specific document within a DocumentType by id.
   * @see {@Link https://swiftype.com/documentation/site-search/indexing#document-single}
   * @param params
   */
  async get(params: GetDocumentRequest): Promise<DocumentResponse> {
    return this.client.get(DOCUMENT_PATHS.GET, params);
  }

  /**
   * List all documents within a DocumentType.
   * @see {@Link https://swiftype.com/documentation/site-search/indexing#document-all}
   * @param params
   */
  async list(params: ListDocumentsRequest): Promise<DocumentResponse> {
    return this.client.get(DOCUMENT_PATHS.LIST, params);
  }

  /**
   * Update fields on an existing document
   * @see {@link https://swiftype.com/documentation/site-search/indexing#updating_fields}
   * @param params
   */
  async updateFields(params: UpdateDocumentFieldsRequest): Promise<any> {
    return this.client.put(DOCUMENT_PATHS.UPDATE_FIELDS, params);
  }
}
