import React, { Component } from "react";
import { Trans } from "react-i18next";
import ErrorPage from "../ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage>
          <p>
            <Trans>errorPage</Trans>
          </p>
        </ErrorPage>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
