import { Component, signal } from '@angular/core';
import { Footer } from './components/footer/footer';
import { Banner } from './components/banner/banner';
import { Contact } from './components/contact/contact';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Stacks } from './components/stacks/stacks';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [ 
    Header, 
    // Footer, 
    Banner, 
    // Contact, 
    About, 
    // Projects, 
    // Stacks,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
