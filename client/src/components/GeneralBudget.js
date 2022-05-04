import { GENERAL_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCards from "./BudgetCards";

export default function GeneralBudget(props) {
    const { getBudgetExpenses } = useBudgets()

    const amount = getBudgetExpenses(GENERAL_BUDGET_ID).reduce(
        (total,expense) => total + expense.amount,0
    )
    
    if(amount === 0) return null
  return (
      <BudgetCards amount={amount} name="General Budget" gray {...props}/>
  )
}
