export interface DocumentTypeApi {
  create(params: CreateDocumentTypeRequest): Promise<any>;
  delete(params: DeleteDocumentTypeRequest): Promise<any>;
  get(params: GetDocumentTypeRequest): Promise<any>;
  list(params: DocumentTypeRequest): Promise<any>;
}

export interface DocumentTypeRequest {
  engine: string;
}

export interface CreateDocumentTypeRequest extends DocumentTypeRequest {
  documentType: { name: string };
}

export type DeleteDocumentTypeRequest = GetDocumentTypeRequest;

export interface GetDocumentTypeRequest extends DocumentTypeRequest {
  documentType: string;
}
