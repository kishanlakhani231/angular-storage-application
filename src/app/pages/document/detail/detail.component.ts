import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, elementAt, take, takeUntil } from 'rxjs';
import { Document } from 'src/app/interface/document.interface';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  document!: Document;
  private destroy$ = new Subject();

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // Access the 'id' parameter from the route
    this.aRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadSingleDocument(id);
      } else {
        this.router.navigate(['/', 'pages', 'dashboard']);
      }
    });
  }


  loadSingleDocument(id: string) {
    console.log(id)
    this.documentService.getDocument(id).pipe(take(1)).subscribe((res: Document) => {
      this.document = res;
    }, (err: any) => {
      this.router.navigate(['/', 'pages', 'dashboard']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
