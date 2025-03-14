"use client";

import { Component, ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAxiosError } from "axios";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorCode?: number;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorCode: undefined };
  }

  static getDerivedStateFromError(error: unknown) {
    if (isAxiosError(error) && error.status === 401) {
      redirect("/login");
    }

    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Что-то пошло не так</h2>;
    }

    return this.props.children;
  }
}
