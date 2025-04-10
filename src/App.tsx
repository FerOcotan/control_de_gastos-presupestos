import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {  
  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])
  
  return (
    <>
      <header className="bg-rose-800 py-10 shadow-md">
        <h1 className="uppercase text-center font-black text-5xl text-white tracking-wide drop-shadow-md">
          Planificador de Gastos
        </h1>
      </header>

      <section className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-rose-100">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </section>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10 px-6">
          <div className="space-y-8">
            <FilterByCategory />
            <ExpenseList />
          </div>
          <ExpenseModal />
        </main>
      )}

      <footer className="text-center text-sm text-rose-800 py-6 mt-10">
        &copy; {new Date().getFullYear()} TuApp - Todos los derechos reservados
      </footer>
    </>
  )
}

export default App
