import { Button, Modal } from "react-bootstrap";
import { Stack } from "react-bootstrap";
import { GENERAL_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
    
    const expenses = getBudgetExpenses(budgetId)
    
    const budget = GENERAL_BUDGET_ID === budgetId ? {name : "General Budget", id:GENERAL_BUDGET_ID} : budgets.find(b => b.id === budgetId)

  return (
      <Modal show={budgetId != null} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>
                  <Stack direction="horizontal" gap="2">
                      <div>Expenses - {budget?.name}</div>
                      {budgetId !== GENERAL_BUDGET_ID && (
                          <Button onClick={() => {
                              deleteBudget(budget)
                              handleClose()
                          }} variant="outline-danger">Remove</Button>
                      )}
                  </Stack>
                </Modal.Title>
              </Modal.Header>
          <Modal.Body>
              <Stack direction="vertial" gap="1">
                  {expenses.map(expense => (
                      <Stack direction="horizontal" gap="2" key={expense.id}>
                          <div className="me-auto fs-4">{expense.description}</div>
                          <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                          <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">
                            &times;
                          </Button>
                      </Stack>
                  ))}
              </Stack>
              </Modal.Body>
    </Modal>
  )
}
