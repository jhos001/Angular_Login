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
  
  // Datos registrados (usados para validación de acceso)
  nombresRegistrados: string = '';
  apellidosRegistrados: string = '';
  contrasenaRegistrada: string = '';
  
  // Estados
  estaRegistrado: boolean = false;
  mostrarLogin: boolean = false;
  mensajeError: string = '';
  registroExitoso: boolean = false;

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

    // Guardamos los datos de registro para compararlos luego
    this.nombresRegistrados = this.nombres;
    this.apellidosRegistrados = this.apellidos;
    this.contrasenaRegistrada = this.contrasena;

    this.registroExitoso = true;
    this.mensajeError = '';

    setTimeout(() => {
      this.registroExitoso = false;
      this.limpiarCampos();
      this.mostrarLogin = true; // Después de registrar, mostrar el formulario de acceso
    }, 3000);
  }

  // Función para acceder (validación de login)
  acceder() {
    // Validamos que los campos no estén vacíos
    if (!this.nombres || !this.apellidos || !this.contrasena) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    if (!this.validarLetras(this.nombres) || !this.validarLetras(this.apellidos)) {
      this.mensajeError = 'Solo se permiten letras en nombres y apellidos';
      return;
    }

    if (this.contrasena.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    // Comprobamos si los datos ingresados coinciden con los registrados
    if (this.nombres === this.nombresRegistrados && this.apellidos === this.apellidosRegistrados && this.contrasena === this.contrasenaRegistrada) {
      this.estaRegistrado = true;
      this.mensajeError = ''; // Limpiamos cualquier error previo
    } else {
      // Si los datos no coinciden, mostramos el mensaje de error
      this.mensajeError = 'Nombre, apellido o contraseña incorrectos. Vuelva a intentarlo.';
    }
  }
}
