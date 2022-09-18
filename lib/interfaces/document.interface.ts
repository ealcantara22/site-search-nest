export interface DocumentApi {
  createOrUpdate(params: CreateOrUpdateDocumentRequest): Promise<any>;
  createOrUpdateInBulk(params: CreateOrUpdateDocumentsRequest): Promise<any>;
  delete(params: DeleteDocumentRequest): Promise<any>;
  deleteInBulk(params: DeleteDocumentsRequest): Promise<any>;
  get(params: GetDocumentRequest): Promise<any>;
  list(params: ListDocumentsRequest): Promise<any>;
  updateFields(params: UpdateDocumentFieldsRequest): Promise<any>;
}

export interface DocumentRequest {
  engine: string;
  documentType: string;
}

export interface DocumentResponse {
  external_id: string;
  engine_id: string;
  document_type_id: string;
  id: string;
}

export interface DocumentRequestData {
  external_id: string;
  fields: DocumentRequestDataField | DocumentRequestDataField[];
}

export interface DocumentRequestDataField {
  name: string;
  type: string;
  value: any;
}

export type ListDocumentsRequest = DocumentRequest;

export interface GetDocumentRequest extends DocumentRequest {
  externalId: string;
}

export type DeleteDocumentRequest = GetDocumentRequest;

export interface CreateOrUpdateDocumentRequest extends DocumentRequest {
  document: DocumentRequestData;
}

export interface CreateOrUpdateDocumentsRequest extends DocumentRequest {
  documents: DocumentRequestData[];
}

export interface DeleteDocumentsRequest extends DocumentRequest {
  documents: string[];
}

export interface UpdateDocumentFieldsRequest extends GetDocumentRequest {
  fields: object;
}
