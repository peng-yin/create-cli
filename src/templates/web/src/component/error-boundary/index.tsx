import React, { ReactNode } from 'react';
import { Result, Button } from 'antd';
import { get } from 'lodash';

export interface ErrorBoundaryProps {
  onRetry?: () => void;
  retryTip?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | any;
}

/**
 * Captures which component contained the exception, and its ancestors.
 */
interface ErrorInfo {
  componentStack: string;
}

const reloadPage = () => window.location.reload();

export class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    try {
      let { pathname } = window.location;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      pathname = pathname.replace(/[0-9]+/g, '{number}');
    } catch (error) {
      console.error('ErrorBoundary', error, errorInfo);
    }
  }

  public handleRetry = () => {
    const { onRetry = reloadPage } = this.props;
    this.setState(
      {
        error: null,
      },
      onRetry,
    );
  };

  render() {
    const {error} = this.state;
    if (error) {
      const errorMessage = get(error, 'message');
      return (
        <Result
          status="error"
          title={this.props.retryTip || '应用出现异常'}
          subTitle={(
            <span>
              请稍后重试，无法恢复时请反馈给客服、运营同学
              {errorMessage && (
                <>
                  <br />
                  <span>{errorMessage}</span>
                </>
              )}
            </span>
          )}
          extra={(
            <Button type="primary" onClick={this.handleRetry}>
              重试
            </Button>
          )}
        />
      );
    }
    return this.props.children;
  }
}
