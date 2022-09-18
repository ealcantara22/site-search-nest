import { DynamicModule, Global, Module } from '@nestjs/common';
import { SiteSearchOptions } from './interfaces';
import { SITE_SEARCH_CONFIG } from './site-search.constants';
import { ClientService } from './client.service';
import { DocumentService } from './document.service';
import { DocumentTypeService } from './document-type.service';

@Global()
@Module({})
export class SiteSearchModule {
  public static register(options: SiteSearchOptions): DynamicModule {
    return {
      module: SiteSearchModule,
      providers: [
        {
          provide: SITE_SEARCH_CONFIG,
          useValue: options,
        },
        ClientService,
        DocumentService,
        DocumentTypeService,
      ],
      exports: [ClientService, DocumentService, DocumentTypeService],
    };
  }
}
