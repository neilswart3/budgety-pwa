import { Route, Routes } from "react-router";
import { AppLayout } from "./layouts";
import { Wallet } from "./components";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<div>Home bla</div>} />

        <Route path="transactions">
          <Route index element={<div>List Transactions</div>} />
          <Route path="create" element={<div>Create Single Transaction</div>} />
          <Route path=":transaction" element={<div>Single Transaction</div>} />
          <Route
            path=":transaction/edit"
            element={<div>Edit Single Transaction</div>}
          />
        </Route>

        <Route path="categories">
          <Route index element={<div>List Categories</div>} />
          <Route path="create" element={<div>Create Single Category</div>} />
          <Route path=":category" element={<div>Single Category</div>} />
          <Route
            path=":category/edit"
            element={<div>Edit Single Category</div>}
          />
        </Route>

        <Route path="wallet">
          <Route index element={<Wallet />} />
          <Route path="create" element={<div>Create Wallet Item</div>} />
          <Route path=":wallet" element={<div>Wallet Item</div>} />
          <Route
            path=":wallet/edit"
            element={<div>Edit Wallet Item</div>}
          />
        </Route>

        <Route path="account">
          <Route index element={<div>Account</div>} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
