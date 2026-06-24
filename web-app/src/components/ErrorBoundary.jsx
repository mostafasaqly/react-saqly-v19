// ErrorBoundary.jsx — catches render errors so a single bad block
// doesn't blank the whole app. Bilingual fallback (reads <html lang>).

import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Surface it in dev tools; in a real app send to a logging service.
    console.error("Render error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const isAr =
      typeof document !== "undefined" &&
      document.documentElement.lang !== "en";

    return (
      <div className="app-error" role="alert">
        <span className="app-error__emoji" aria-hidden="true">💥</span>
        <h2>{isAr ? "حدث خطأ غير متوقّع" : "Something went wrong"}</h2>
        <p>
          {isAr
            ? "حصل خطأ أثناء عرض الصفحة. أعد التحميل للمتابعة."
            : "An error occurred while rendering the page. Reload to continue."}
        </p>
        <button className="app-error__retry" onClick={this.handleReload}>
          {isAr ? "إعادة التحميل" : "Reload"}
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
