import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";

import MainPage from "./pages/Main/MainPage";
import AuthorizationPage from "./pages/Authorization/AuthorizationPage";
import SearchPage from "./pages/Search/SearchPage";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./hoc/RequireAuth"
import AuthorizedUser from "./hoc/AuthorizedUser";


function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false
      }
    }
  });
  
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="Authorization" element={
                  <AuthorizedUser>
                    <AuthorizationPage />
                  </AuthorizedUser>
                } />
                <Route path="Search" element={
                  <RequireAuth>
                    <SearchPage />
                  </RequireAuth>
                } />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
