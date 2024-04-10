import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-form', // This should match what you're using in app.component.html
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})

export class TransactionFormComponent implements OnInit {
  transaction: any = {};

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getTransaction(id);
      }
    });
  }

  getTransaction(id: string): void {
    this.transactionService.getTransactionById(id)
      .subscribe(transaction => {
        this.transaction = transaction;
      });
  }

  saveTransaction(): void {
    if (this.transaction._id) {
      this.updateTransaction();
    } else {
      this.addTransaction();
    }
  }

  addTransaction(): void {
    this.transactionService.createTransaction(this.transaction)
      .subscribe(() => {
        console.log('Transaction added successfully');
        // Reset form or navigate to transaction list
      });
  }

  updateTransaction(): void {
    this.transactionService.updateTransaction(this.transaction._id, this.transaction)
      .subscribe(() => {
        console.log('Transaction updated successfully');
        // Reset form or navigate to transaction list
      });
  }
}
