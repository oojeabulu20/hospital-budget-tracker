import React, { useContext, useState } from "react"
import {v4 as uuidV4} from "uuid"

const BudgetContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetContext)
    
}

{

}

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useState([]) 
    const [expenses, setExpense] = useState([])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description,amount,budgetId}) {
        setExpense(previousExpenses => {
            return[...previousExpenses,{id: uuidV4(), description,amount,budgetId}]
        })
    }

    function addBudget({name, max}) {
        setBudgets(previousBudgets => {
            if (previousBudgets.find(budget => budget.name === name)) {
                return previousBudgets
            }
            return[...previousBudgets,{id: uuidV4(), name,max}]
        })
    }

    function deleteBudget({ id }) {
        //deal with expenses
        setBudgets(previousBudgets => {
            return previousBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({id}) {
        setExpense(previousExpenses =>{
            return previousExpenses.filter(expense => expense.id !== id)
        })
    }

    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetContext.Provider> 
}