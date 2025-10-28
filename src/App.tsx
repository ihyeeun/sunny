import { AuthLayout } from "@features/auth";
import { SignInPage, SignUpPage } from "@pages/auth";
import CountPage from "@pages/count-page";
import IndexPage from "@pages/index-page";
import TodoDetailPage from "@pages/todo-detail-page";
import TodoListPage from "@pages/todo-list-page";
import { PATH } from "@shared/constants/path";
import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<IndexPage />} />
      <Route path={PATH.COUNT} element={<CountPage />} />
      <Route path={PATH.TODO_LIST} element={<TodoListPage />} />
      <Route path={`${PATH.TODO_LIST}/:id`} element={<TodoDetailPage />} />
      <Route element={<AuthLayout />}>
        <Route path={PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
