import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="card section-skeleton">
          콘텐츠를 불러오는 중 문제가 발생했습니다. 페이지를 새로고침 해주세요.
        </div>
      );
    }
    return this.props.children;
  }
}
