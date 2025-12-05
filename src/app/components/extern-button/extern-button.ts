import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-extern-button',
  imports: [],
  templateUrl: './extern-button.html',
  styleUrl: './extern-button.css',
})
export class ExternButton {
  @Input() buttonText!: string;
  @Input() buttonLink!: string;

}
