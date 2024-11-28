# ANGULAR RxJS Third library.
### Repository
https://github.com/serotonine/a-11-rxjs

### About
Build [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller) Component Deep Dive: See below links.

***

### ANGULAR 18
**RxJS provide observables which are objects that produces and controls a stream of data.**
In general, Signals are about managing values, whereas **observables are about managing events or values emitted by some data source over time** instead of internal app values.

Signals have an itinial value  - RxJS Observables have not.

##### Summary
- [Creating & Using an Observable](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116208).
  - See [BehaviorSubject()](https://github.com/serotonine/a-10-change-detection/commit/b488b045a6ecc5e587d9c8dc293f619be7b3f1e4#diff-1f05e3722b4224021627196e05a6e9577437f8829fe0a946eaa852d98fd6341dR14)
  Make a value$ observable (in a service) and then in another part of the app subscribe to this value (value$.subscribe(()=> {})).
  But subjects are just one way of creating observables.
  The special kinds of observables that act as event emitters, to be precise.
  - RxJS gives you multiple functions you can use to create observables. Like `interval()`
  - [RxJS Operators](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116212)
  Operators are functions you can pipe into an observable.
- [Difference and similarities with Signals ](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116216)
  - [Signals vs Observables](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44116220)
    - ***SAME*** when we used a subject in a service to share some State between different Components, we could use a Signal instead.
    - ***MORE EFFICIENT*** In case of `interval()` for example.
      Observables are really good for events or anything like that where values do arrive asynchronously over time.
      Whereas Signals can be really awesome for managing application State.
