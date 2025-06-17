// Types for each waste summary item
interface WasteRecapSummary {
  type: string;
  weight: number;
  unit: string;
  transactionCount: number;
}

// Types for the date range in waste recap
interface DateRange {
  start: string;
  end: string;
}

// Types for each transaction's weight details
interface TransactionWeight {
  value: number;
  unit: string;
}

// Types for each transaction item
interface Transaction {
  id: string;
  transactionDate: string;
  tags: string[];
  weight: TransactionWeight;
  wasteActionEnd: string;
}

// Types for pagination information
interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

// Main interface for the waste recap and transactions data
export interface HomepageInterface {
  locationName: string;
  user: string | null;
  name: string;
  languagePreference: string;
  wasteRecap: {
    dateRange: DateRange;
    summary: WasteRecapSummary[];
  };
  transactions: Transaction[] | null;
  pagination: Pagination;
  data: Transaction[];
}
