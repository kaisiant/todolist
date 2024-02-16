import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BaseLayout } from "@/layouts";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";
import TicketDetailsPage from "@/pages/ticket-details";
import store, { persistor } from "@/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ticket/:ticketId",
    element: <TicketDetailsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BaseLayout>
          <RouterProvider router={router} />
        </BaseLayout>
      </PersistGate>
    </Provider>
  );
}

export default App;
