import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./components/auth-context.tsx";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL + "/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // Get the CSRF token from cookie each time a request is made
  const token = Cookies.get("XSRF-TOKEN");

  return {
    headers: {
      ...headers,
      "x-xsrf-token": token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster />
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
