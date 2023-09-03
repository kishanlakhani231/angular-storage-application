import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Document } from '../interface/document.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private jsonDataUrl = '/assets/data/document.json'; // Path to your JSON data file


  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get Document List
   * @returns 
   */
  getDocumentList(): Observable<any> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/document.json`).pipe(map((res: any) => {
      return !res ? [] :  Object.keys(res).map((key, index) => {
        const item = res[key];
        return {
          id: key,
          no: index + 1,
          title: item.title,
          pdfUrl: item.pdfUrl
        };
      });
    }));
  }

  /**
   * Get document using id
   * @param id 
   * @returns 
   */
  getDocument(id: string): Observable<any> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/document.json`).pipe(map((res: any) => res[id]));
  }

  /**
   * Upload document in assets folder 
   */
  uploadPdf(file: File) {
    const url = `https://firebasestorage.googleapis.com/v0/b/${environment.firebaseConfig.storageBucket}/o/${file.name}`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${url}`, formData).pipe(map((res: any) => {
      {
        return `${url}?alt=media&token=${res.downloadTokens}`;
      }
    }));
  }

  /**
   * Add document record
   */
  addDocumentRecord(payload: any) {
    return this.http.post(`${environment.firebaseConfig.databaseURL}/document.json`, payload);
  }
}
