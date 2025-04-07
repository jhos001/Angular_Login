import { Component } from '@angular/core';
import { InterfazComponent } from './interfaz/interfaz.component'; // Importa el componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InterfazComponent], // 👉 Declara el componente aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Opcional: Puedes agregar lógica aquí si necesitas
  title = 'mi-app-angular';
}