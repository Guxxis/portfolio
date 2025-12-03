import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterModule, NgClass, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isOpenMenu:boolean = false;

  toggleMenu():any {
    this.isOpenMenu = !this.isOpenMenu;
    console.log(this.isOpenMenu)
  }
}
