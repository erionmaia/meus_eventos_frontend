import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Glide from '@glidejs/glide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit, AfterViewInit {
  isDarkTheme = false;
  private glide: any;

  constructor() { }

  ngOnInit(): void {
    // Inicialização do tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    }
  }

  ngAfterViewInit(): void {
    // Inicialização do carrossel após a view ser carregada
    setTimeout(() => {
      this.initGlide();
    }, 0);
  }

  private initGlide(): void {
    this.glide = new Glide('.glide', {
      type: 'carousel',
      autoplay: 3000,
      animationDuration: 800,
      hoverpause: true,
      perView: 1,
      gap: 0
    }).mount();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }
}
