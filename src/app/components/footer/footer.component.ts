import { Component, OnInit } from '@angular/core';
import { BlobService } from '../../services/blob.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit{
  blobUrl: string = '';

  constructor(private blobService: BlobService) {}

  ngOnInit(): void {
    this.blobUrl = this.blobService.getBlobUrl();
  }
}
