import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#050811',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '1.25rem',
            padding: '2rem'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f87171', marginBottom: '1rem' }}>
              ⚠️ Something went wrong in the application
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {this.state.error?.message || 'An unexpected runtime error occurred.'}
            </p>
            <pre style={{
              textAlign: 'left',
              background: '#0a0f1d',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
              fontSize: '0.75rem',
              color: '#94a3b8',
              maxHeight: '200px'
            }}>
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                marginTop: '1.5rem',
                padding: '0.625rem 1.25rem',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
