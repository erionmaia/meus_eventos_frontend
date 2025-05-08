import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {
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
}
