import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    return this.state.hasError ? (
      <div>Something went wrong</div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
