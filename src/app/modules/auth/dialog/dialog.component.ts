import { Component, Renderer2, RendererFactory2 } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  openDialog(content: any) {
    const dialogRef = document.createElement('app-reusable-dialog');
    this.renderer.appendChild(dialogRef, content);
    this.renderer.appendChild(document.body, dialogRef);
  }

  closeDialog() {
    const dialogRef = document.querySelector('app-reusable-dialog');
    if (dialogRef) {
      this.renderer.removeChild(document.body, dialogRef);
    }
  }
}
