import {Button, Stack} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import BudgetCards from './components/BudgetCards';

function App() {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className='mb-4'>
        <h1 className='me-auto'>Hospital Budget</h1>
        <Button variant='success'>Add Budget</Button>
        <Button variant="outline-danger">Add Expense</Button>
      </Stack>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem", alignItems: "flex-start" }}>
        <BudgetCards name="Tests" gray amount={50} max={1000}></BudgetCards>
      </div>
    </Container>
  );
}

export default App;
