import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class SimpleEventAggregator {

subscribe(observer: (a: string) => void) {
if (this.subscriptions.find(item => item[0] === observer) !== undefined) {
return;
}
const subscription = this.observable.subscribe(observer);
this.subscriptions.push([observer, subscription]);
}

publish(payload: string) {
this.source.next(payload);
}

// unsubscribe(observer: (a: string) => void) {
// const foundIndex = this.subscriptions.findIndex(item => item[0] === observer);
// if (foundIndex > -1) {
// const subscription: Subscription = this.subscriptions[foundIndex][1];
// if (subscription.isUnsubscribed === false) {
// subscription.unsubscribe();
// console.log('unsubscribe successful');
// }

// this.subscriptions.splice(foundIndex, 1); // removes item
// }
// }

// Observable string source (RxJS)
// tslint:disable-next-line: member-ordering
private source = new Subject<string>();

// Observable string streams (RxJS)
// tslint:disable-next-line: member-ordering
private observable = this.source.asObservable();

// Cache array of tuples
// tslint:disable-next-line: member-ordering
private subscriptions: Array<[(a: string) => void, Subscription]> = [];
}
