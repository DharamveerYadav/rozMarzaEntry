import { Injectable } from '@angular/core';
import { IMilkEntry } from 'src/app/shared/shared.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilkEntryDetailService {
  private milkRate: number;
  private day: number;
  private month: number;
  private year: number;
  private currentDate: string;
  private milkDetailList$: BehaviorSubject<IMilkEntry[]> = new BehaviorSubject<IMilkEntry[]>([]);

  constructor() {}

  setMilkRate(rate: number) {
    this.milkRate = rate;
  }

  getMilkRate() {
    return this.milkRate;
  }
  setDay(day: number) {
    this.day = day;
  }

  getDay() {
    return this.day;
  }
  setMonth(month: number) {
    this.month = month;
  }

  getMonth() {
    return this.month;
  }
  setYear(year: number) {
    this.year = year;
  }

  getYear() {
    return this.year;
  }

  setCurrentDate(date: string) {
    this.currentDate = date;
  }

  getCurrentDate() {
    return this.currentDate;
  }

  setMilkDetailList(entries) {
    this.milkDetailList$.next(entries);
  }

  getMilkDetailList(): BehaviorSubject<IMilkEntry[]> {
    return this.milkDetailList$;
  }
}
