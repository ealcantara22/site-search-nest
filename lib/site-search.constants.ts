export const SITE_SEARCH_CONFIG = 'SITE_SEARCH_CONFIG';

export enum DOCUMENT_PATHS {
  LIST = '/engines/{engine}/document_types/{documentType}/documents.json',
  GET = '/engines/{engine}/document_types/{documentType}/documents/{externalId}.json',
  CREATE_UPDATE = '/engines/{engine}/document_types/{documentType}/documents/create_or_update.json',
  CREATE_UPDATE_IN_BULK = '/engines/{engine}/document_types/{documentType}/documents/bulk_create_or_update.json',
  DELETE = '/engines/{engine}/document_types/{documentType}/documents/{externalId}',
  DELETE_IN_BULK = '/engines/{engine}/document_types/{documentType}/documents/bulk_destroy.json',
  UPDATE_FIELDS = '/engines/{engine}/document_types/{documentType}/documents/{externalId}/update_fields.json',
}

export enum DOCUMENT_TYPE_PATHS {
  LIST = '/engines/{engine}/document_types.json',
  GET = '/engines/{engine}/document_types/{documentType}.json',
  CREATE = '/engines/{engine}/document_types.json',
  DELETE = '/engines/{engine}/document_types/{documentType}',
}
