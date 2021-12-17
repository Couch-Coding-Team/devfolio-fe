import React from "react";
import * as Sentry from "@sentry/react";
import BlankPage from "./BlankPage";

const fallback = () => <BlankPage content={<div>An error has occurred</div>} />;

const ErrorBoundary = ({ children }) => {
  return (
    <Sentry.ErrorBoundary fallback={fallback}>{children}</Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;
