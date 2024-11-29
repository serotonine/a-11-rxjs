import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
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
  observable!:number;
  private _destroyRef = inject(DestroyRef);
  constructor(){
    /* effect(()=>{
      console.log(`This button has been clicked ${this.clickCount$} times.`);
    });*/
  }
  ngOnInit(): void {
    // Subscribe to observable.
    const subscription = this.clickCount$.subscribe({
      next: (val) => {this.observable = val},
      complete: () =>{}
    });
    // Don't forget to clean when the componant is not used anymore!
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onClick(){
    this.clickCountS.update((prevValue) => prevValue + 1);
  }
}
