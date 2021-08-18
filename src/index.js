import React from "react";
import { render, hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./utils/apolloClient";
import App from "./App";

Sentry.init({
  dsn: "https://4dd32e7936ce47019c949143ce285b48@o720848.ingest.sentry.io/5911901",
  integrations: [new Integrations.BrowserTracing()],

  // performance data: adjust between 0 and 1
  tracesSampleRate: 0.5,
});

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>,
    rootElement
  );
} else {
  render(
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>,
    rootElement
  );
}
