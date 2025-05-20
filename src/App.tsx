import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts';
import {
  Transactions,
  Accounts,
  Dashboard,
  Categories,
  Savings,
  Occasions,
  Profile,
  Settings,
} from '@/components';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="transactions">
          <Route index element={<Transactions.List />} />
          <Route path="create" element={<Transactions.Create />} />
          <Route path=":transaction" element={<Transactions.Single />} />
          <Route path=":transaction/edit" element={<Transactions.Edit />} />
        </Route>

        <Route path="categories">
          <Route index element={<Categories.List />} />
          <Route path="create" element={<Categories.Create />} />
          <Route path=":category" element={<Categories.Single />} />
          <Route path=":category/edit" element={<Categories.Edit />} />
        </Route>

        <Route path="occasions">
          <Route index element={<Occasions.List />} />
          <Route path="create" element={<Occasions.Create />} />
          <Route path=":occasion" element={<Occasions.Single />} />
          <Route path=":occasion/edit" element={<Occasions.Edit />} />
        </Route>

        <Route path="accounts">
          <Route index element={<Accounts.List />} />
          <Route path="create" element={<Accounts.Create />} />
          <Route path=":account" element={<Accounts.Single />} />
          <Route path=":account/edit" element={<Accounts.Edit />} />
        </Route>

        <Route path="Savings">
          <Route index element={<Savings.List />} />
          <Route path="create" element={<Savings.Create />} />
          <Route path=":saving" element={<Savings.Single />} />
          <Route path=":saving/edit" element={<Savings.Edit />} />
        </Route>

        <Route path="profile">
          <Route index element={<Profile />} />
        </Route>

        <Route path="settings">
          <Route index element={<Settings />} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
