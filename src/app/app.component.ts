import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquationComponent } from './equation/equation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EquationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mathform';
}
