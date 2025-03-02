import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="text-center">
      <h1 className="text-red-600 text-3xl font-bold">Oops! Something went wrong</h1>
      {error ? (
        <p>{error.statusText || error.message}</p>
      ) : (
        <p>Unknown error occurred.</p> // Handle undefined error gracefully
      )}
    </div>
  );
};

export default ErrorBoundary;
