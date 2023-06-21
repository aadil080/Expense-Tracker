import { Text } from "react-native";
import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch Expenses!");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  //function errorHandler() {
  //  setError(null);
  //}


  if(error && !isFetching) {
    return <ErrorOverlay message={error} /*onConfirm={errorHandler}*/ />
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}

export default RecentExpenses;
