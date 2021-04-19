import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transactions").then((response) => {
      setTransactions(response.data.transactions);
    });
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const responde = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = responde.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){
  const context = useContext(TransactionsContext);

  return context
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (Transaction: TransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

// type transactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }
