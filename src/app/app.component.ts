import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { map, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    /* RxJS gives you multiple functions
    you can use to create observables. */
    const subscription$ = interval(2000).pipe(
      // Operator which convert a value.
      map((val) => val * 2)
    ).subscribe({
      next: (val) => console.log(val),
      complete: () => {},
      error: () => {},
    });
    // Don't forget to clean when the componant is not used anymore!
    this._destroyRef.onDestroy(() => {
      subscription$.unsubscribe();
    });
  }
}
