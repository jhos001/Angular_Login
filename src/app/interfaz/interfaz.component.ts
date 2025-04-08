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

  // Datos del usuario registrado (simulado)
  private usuarioRegistrado = {
    nombres: '',
    apellidos: '',
    contrasena: ''
  };

  // Estados
  estaRegistrado: boolean = false;
  mostrarLogin: boolean = false;
  mensajeError: string = '';
  registroExitoso: boolean = false;

  // Valida que solo haya letras (incluye acentos y espacios)
  private validarLetras(valor: string): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
  }

  // Limpia los campos del formulario
  limpiarCampos(): void {
    this.nombres = '';
    this.apellidos = '';
    this.contrasena = '';
  }

  // Alterna entre login y registro
  alternarFormulario(): void {
    this.mostrarLogin = !this.mostrarLogin;
    this.mensajeError = '';
    this.limpiarCampos();
  }

  // Cierra la sesión del usuario
  cerrarSesion(): void {
    this.estaRegistrado = false;
    this.limpiarCampos();
  }

  // Registra un nuevo usuario
  registrar(): void {
    if (!this.validarLetras(this.nombres)) {
      this.mensajeError = 'Solo se permiten letras en nombres';
      return;
    }

    if (this.contrasena.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    // Guarda los datos (simulando base de datos)
    this.usuarioRegistrado = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      contrasena: this.contrasena
    };

    this.registroExitoso = true;
    this.mensajeError = '';

    // Redirige al login después de 3 segundos
    setTimeout(() => {
      this.registroExitoso = false;
      this.mostrarLogin = true;
      this.limpiarCampos();
      this.mostrarLogin = true; // Después de registrar, mostrar el formulario de acceso
    }, 3000);
  }

  // Inicia sesión
  acceder(): void {
    if (!this.nombres || !this.apellidos || !this.contrasena) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    // Compara con los datos registrados
    if (
      this.nombres === this.usuarioRegistrado.nombres &&
      this.apellidos === this.usuarioRegistrado.apellidos &&
      this.contrasena === this.usuarioRegistrado.contrasena
    ) {
      this.estaRegistrado = true;
      this.mensajeError = '';
    } else {
      this.mensajeError = 'Credenciales incorrectas';
    }
  }
}
