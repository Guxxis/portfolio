import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterModule, NgClass, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isOpenMenu: boolean = false;
  isFixed = false;

  toggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
    console.log(this.isOpenMenu)
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isFixed = window.scrollY > 200;
  }
}
