import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Theme, ThemeService } from './core/theme/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ping';
  isChecked = false;
  constructor(private themeService: ThemeService) {
    this.themeService.initTheme();
    this.isChecked =
      this.themeService.getCurrentTheme() === Theme.Dark ? true : false;
  }
  public toggleTheme() {
    this.themeService.toggleTheme();
  }
}
