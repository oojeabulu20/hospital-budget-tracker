import { useState } from "react";
import {Button, Stack} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudgetModal from "./components/AddBudget";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCards from './components/BudgetCards';
import ViewExpensesModal from "./components/ViewExpensesModal";
import GeneralBudget from "./components/GeneralBudget";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useBudgets } from "./contexts/BudgetContext";


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [AddExpenseModalBudgetId, setShowAddExpenseModalBudgetId] = useState()

  const { budgets, getBudgetExpenses } = useBudgets()
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setShowAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className='mb-4'>
        <h1 className='me-auto'>Hospital Budget</h1>
        <Button variant='success' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-danger" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem", alignItems: "flex-start" }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total,expense) => total + expense.amount, 0)
            return ( 
              <BudgetCards key={budget.id}
                name={budget.name}
                gray
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}/>
            )
          })}
      </div>
        {/*<GeneralBudget/>*/}
        <TotalBudgetCard/>
    </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={AddExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)} 
      />
      <ViewExpensesModal
        budgetId={ViewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()} 
      />
    </>
  );
}

export default App;
