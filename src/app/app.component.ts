import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCountS = signal(0);
  // Convert signal to observable.
  clickCount$ = toObservable(this.clickCountS);
  // Convert Observable to Signal.
  intervals$ = interval(1000);
  /* As Observable has no intial value 
  you could pass a second param (object) to init.
  You could pass a destroyRef alike but it is facultatif*/

  intervalsS = toSignal(this.intervals$, {
    initialValue: 0,
    manualCleanup: true,
  });

  observable!: number;
  private _destroyRef = inject(DestroyRef);
  constructor() {
    /* effect(()=>{
      console.log(`This button has been clicked ${this.clickCount$} times.`);
    });*/
  }
  ngOnInit(): void {
    // Subscribe to observable.
    const subscription = this.clickCount$.subscribe({
      next: (val) => {
        this.observable = val;
      },
      complete: () => {},
    });
    // Don't forget to clean when the componant is not used anymore!
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onClick() {
    this.clickCountS.update((prevValue) => prevValue + 1);
  }
}
