import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions'; // Adjust the URL as per your backend API

  constructor(private http: HttpClient) { }

  // Get all transactions
  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransactionById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Request URL:', url); // Log the constructed URL
    return this.http.get<any>(url);
  }

  // Create a new transaction
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transactionData);
  }

  // Update an existing transaction
  updateTransaction(id: string, transactionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, transactionData);
  }

  // Delete a transaction
  deleteTransaction(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
