import { Component, OnInit, Inject } from '@angular/core';
// an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string, bio: string, birthYear: string}
  ) { }

  ngOnInit(): void {
  }

}
