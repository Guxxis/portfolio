import { Component } from '@angular/core';

@Component({
  selector: 'app-stacks',
  imports: [],
  templateUrl: './stacks.html',
  styleUrl: './stacks.css',
})
export class Stacks {

  stacksList: any[] = [
    { nome: 'Angular', img: 'icons/angular.svg' },
    { nome: 'Java', img: 'icons/java.svg' },
    { nome: 'HTML', img: 'icons/html.svg' },
    { nome: 'CSS', img: 'icons/css.svg' },
    { nome: 'JS', img: 'icons/javascript.svg' },
    { nome: 'TypeScript', img: 'icons/typescript.svg' },
    { nome: 'Tailwind', img: 'icons/tailwind.svg' },
    { nome: 'AWS', img: 'icons/aws.svg' },
    { nome: 'Docker', img: 'icons/docker.svg' },
    { nome: 'Kubernetes', img: 'icons/kubernetes.svg' }
  ];
}