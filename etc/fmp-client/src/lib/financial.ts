import { StockIncomeStatementResult } from './models';
import { makeRequest, generateJson } from './utilities';

export default (stock: string) => {
  return {
    income: (period: 'annual' | 'quarter' = 'annual') => makeRequest('income-statement', generateJson(stock, { period: period })) as Promise<StockIncomeStatementResult>,
    balance: (period: 'annual' | 'quarter' = 'annual') => makeRequest('financials/balance-sheet-statement', generateJson(stock, { period: period })),
    cashflow: (period: 'annual' | 'quarter' = 'annual') => makeRequest('financials/cash-flow-statement', generateJson(stock, { period: period })),
    metrics: (period: 'annual' | 'quarter' = 'annual') => makeRequest('company-key-metrics', generateJson(stock, { period: period })),
    growth: (period: 'annual' | 'quarter' = 'annual') => makeRequest('financial-statement-growth', generateJson(stock, { period: period })),
    company_value: (period: 'annual' | 'quarter' = 'annual') => makeRequest('enterprise-value', generateJson(stock, { period: period })),
    ratios: () => makeRequest('financial-ratios', generateJson(stock))
  }
};