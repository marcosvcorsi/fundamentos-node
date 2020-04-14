import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTotal('income');
    const outcome = this.getTotal('outcome');

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  private getTotal(type: string): number {
    return this.transactions.reduce((total, item) => {
      if (item.type === type) {
        return total + item.value;
      }

      return total;
    }, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
