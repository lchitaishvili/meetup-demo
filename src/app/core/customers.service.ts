import { Injectable } from '@angular/core';
import { Customer } from '../shared/interfaces';
import { List} from 'immutable';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      address: {
        city: 'Phoenix'
      },
      orderTotal: 9.99
    },
    {
      id: 2,
      name: 'Jane Doe',
      address: {
        city: 'Seattle'
      },
      orderTotal: 29.99
    },
    {
      id: 3,
      name: 'Michelle Doe',
      address: {
        city: 'London'
      },
      orderTotal: 99.99
    }
  ];

  immutableCustomers = List<Customer>(this.customers);

  constructor() {  }

  getCustomers(): Observable<Customer[]> {
    const custs = this.customers;
    // const custs = JSON.parse(JSON.stringify(this.customers));
    return of(custs);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.getCustomers()
      .pipe(
        map(custs => {
          const filteredCusts = custs.filter(cust => cust.id === id);
          if (filteredCusts) {
            const cust = filteredCusts[0];
            return cust;
            // return JSON.parse(JSON.stringify(cust)) as Customer;
          }
        }),
      );
  }

  updateCustomer(customer: Customer): Observable<boolean> {
    const index = this.getCustomerIndex(customer.id);
    customer.orderTotal = +customer.orderTotal;
    // update collections
    this.customers[index] = customer;
    this.immutableCustomers = this.immutableCustomers.update(index, () => customer);
    return of(true);
  }

  getCustomerIndex(id: number) {
    return this.customers.findIndex((cust, index, array) => cust.id === id);
  }
}
