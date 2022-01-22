import { Component, OnInit, Inject } from '@angular/core';
// an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string, description: string }
  ) { }

  ngOnInit(): void {
  }

}
