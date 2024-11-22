import React, {Component, ReactNode} from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, error: null, errorInfo: null};
    }

    static getDerivedStateFromError(error: Error) {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Sentry or Analytics platform will be here...
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({error, errorInfo});
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div style={{padding: "20px", textAlign: "center"}}>
                        <h1>Something went wrong 😢</h1>
                        <p>We’re working on fixing this issue. Please try again later.</p>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}