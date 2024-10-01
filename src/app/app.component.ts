import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobile = false;

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.isMobile = window.innerWidth < 768;
  }

  onSidenavToggle(opened: boolean): void {
    if (!opened && this.isMobile) {
      // Cierra el menú en dispositivos móviles después de seleccionar una opción
    }
  }
}
