import { Component, Input } from '@angular/core';

export interface Stack {
    nome: string,
    img: string,
}

@Component({
  selector: 'app-card-project',
  imports: [],
  templateUrl: './card-project.html',
  styleUrl: './card-project.css',
})

export class CardProject {

  @Input() textTitle!: string;
  @Input() textDesc!: string;
  @Input() stackList: Stack[] = [];
  @Input() urlPath!: string;
  @Input() imgPath!: string;

}
