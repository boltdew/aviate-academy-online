
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = "pk_test_YWJsZS1jcmlja2V0LTI5LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
);
