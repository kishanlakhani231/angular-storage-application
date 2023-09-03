import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uploadForm!: FormGroup;
  isUploadStart = false;

  constructor(private fb: FormBuilder,
    private documentService: DocumentService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      file: [null, Validators.required], // Use [null] to initialize the file input
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if(!file) {
      return;
    }
    if (file?.type !== 'application/pdf') {
      console.error('');
      alert('Only Pdf File allow, Selected file is not a PDF.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Selected file is larger than 2MB.');
      return;
    }
    this.uploadForm.patchValue({
      file: file,
    });
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      this.isUploadStart = true;
      this.documentService.uploadPdf(this.uploadForm.value.file).pipe(
        switchMap((res: string) => {
          const data = {
            title: this.uploadForm.value.title,
            pdfUrl: res
          };
          return this.documentService.addDocumentRecord(data);
        })
      ).subscribe(() => {
        this.router.navigate(['/', 'pages', 'dashboard'])
      }, (err) => {
        this.isUploadStart = false;
        this.uploadForm.reset();
      })
    }
    else {
      alert('please enter valid form input');
    }

  }
}
