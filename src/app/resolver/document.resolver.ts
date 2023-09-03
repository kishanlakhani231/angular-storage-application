// document-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentService } from '../services/document.service';

@Injectable({
    providedIn: 'root',
})
export class DocumentResolver implements Resolve<any> {
    constructor(private documentService: DocumentService) { }

    resolve(): Observable<any> {
        return this.documentService.getDocumentList();
    }
}