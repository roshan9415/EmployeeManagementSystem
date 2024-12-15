import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnacbarService {
  private snacbar = inject(MatSnackBar)

  error(message: string) {
    this.snacbar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snac-error']
    })
  }

  success(message: string) {
    this.snacbar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snack-success']
    })
  }
}
