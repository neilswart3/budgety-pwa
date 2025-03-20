import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts';
import { Wallet, Transactions, Dashboard, Categories } from '@/components';

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

        <Route path="wallet">
          <Route index element={<Wallet />} />

          <Route path="create" element={<div>Create Wallet Item</div>} />
          <Route path=":wallet" element={<div>Wallet Item</div>} />
          <Route path=":wallet/edit" element={<div>Edit Wallet Item</div>} />
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
