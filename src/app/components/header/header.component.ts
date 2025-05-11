import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnInit(): void {
    // O tema já é inicializado no ThemeService
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
