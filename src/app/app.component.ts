import {
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  interval: number = 0;
  // Create an Observable from scratch.
  customInterval$ = new Observable((subscriber) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count > 3) {
        console.log(`Count is more than 3 : ${count}`);
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log(`Emitting new value : ${count}`);
      subscriber.next((this.interval = count));
      count++;
    }, 2000);
  });

  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Subscribe to observable.
    const subscription = this.customInterval$.subscribe({
      next: (val) => console.log(`NgOnInit : ${val}`),
      complete: () => (this.interval = 0),
    });
    // Don't forget to clean when the componant is not used anymore!
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onClick() {
    this.interval += 2;
  }
}
