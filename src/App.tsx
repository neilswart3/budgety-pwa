import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts';
import {
  Transactions,
  Accounts,
  Occurrences,
  Dashboard,
  Categories,
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

        <Route path="occurrences">
          <Route index element={<Occurrences.List />} />
          <Route path="create" element={<Occurrences.Create />} />
          <Route path=":occurrence" element={<Occurrences.Single />} />
          <Route path=":occurrence/edit" element={<Occurrences.Edit />} />
        </Route>

        <Route path="accounts">
          <Route index element={<Accounts.List />} />
          <Route path="create" element={<Accounts.Create />} />
          <Route path=":account" element={<Accounts.Single />} />
          <Route path=":account/edit" element={<Accounts.Edit />} />
        </Route>

        <Route path="profile">
          <Route index element={<div>Profile</div>} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
