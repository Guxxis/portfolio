import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [NgClass],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  isScrolled:boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 400;
  }

}
