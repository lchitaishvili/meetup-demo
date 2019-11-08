import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Customer } from 'src/app/shared/interfaces';
import { of } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit, OnChanges {
  @Input() customers: Customer[];
  logMessages = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customers']) {
      const custs = changes['customers'].currentValue;
      this.logMessages.push({ title: 'Customers changed', value: custs });
    }
  }

}
