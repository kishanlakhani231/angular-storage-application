import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Document } from 'src/app/interface/document.interface';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  documents: Document[] = [];
  displayedColumns: string[] = ['id', 'title', 'pdfUrl', 'view'];


  constructor(private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadDocument();
  }

  loadDocument() {
    this.aRoute.data.subscribe((data: any) => {
      this.documents = data.documentData; 
    });
  }
}
