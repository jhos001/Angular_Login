import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interfaz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})
export class InterfazComponent {
  // Datos del formulario
  nombres: string = '';
  apellidos: string = '';
  contrasena: string = '';
  
  // Estados
  estaRegistrado: boolean = false;
  mostrarLogin: boolean = false;
  mensajeError: string = '';
  registroExitoso: boolean = false; // Nuevo estado para mensaje de confirmación

  validarLetras(valor: string): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
  }

  limpiarCampos() {
    this.nombres = '';
    this.apellidos = '';
    this.contrasena = '';
  }

  registrar() {
    if (!this.validarLetras(this.nombres) || !this.validarLetras(this.apellidos)) {
      this.mensajeError = 'Solo se permiten letras en nombres y apellidos';
      return;
    }
    
    if (this.contrasena.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.registroExitoso = true; // Mostrar mensaje de éxito
    this.mensajeError = '';
    
    // Limpiar después de 3 segundos (opcional)
    setTimeout(() => {
      this.registroExitoso = false;
      this.limpiarCampos();
      this.mostrarLogin = true; // Cambiar a login después de registrar
    }, 3000);
  }

  acceder() {
    if (!this.validarLetras(this.nombres) || !this.validarLetras(this.apellidos)) {
      this.mensajeError = 'Solo se permiten letras en nombres y apellidos';
      return;
    }
    
    if (this.contrasena.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.estaRegistrado = true;
    this.mensajeError = '';
  }
}