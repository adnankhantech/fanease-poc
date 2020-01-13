import {Injectable} from '@angular/core';
 
@Injectable()
export class GoogleAnalyticsEventsService {
  public emitEvent(eventCategory: string, eventAction: string) {
    (<any>window).ga('send', 'event', {
        eventCategory: eventCategory,
        eventAction: eventAction
    });
  }
}
