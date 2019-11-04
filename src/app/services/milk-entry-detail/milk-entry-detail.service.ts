import { Injectable } from '@angular/core';
import { IMilkEntry } from 'src/app/shared/shared.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilkEntryDetailService {
  private milkRate: number = 60;
  private milkDetailList$: BehaviorSubject<IMilkEntry[]> = new BehaviorSubject<IMilkEntry[]>([]);

  constructor() {}

  setMilkRate(rate: number) {
    this.milkRate = rate;
  }

  getMilkRate() {
    return this.milkRate;
  }

  setMilkDetailList(entries) {
    this.milkDetailList$.next(entries);
  }

  getMilkDetailList(): BehaviorSubject<IMilkEntry[]> {
    return this.milkDetailList$;
  }
}
