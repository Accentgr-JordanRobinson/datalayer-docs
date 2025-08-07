// src/utils/svelte-wrapper.tsx
import React, { useEffect, useRef } from 'react';
import type { SvelteComponent } from 'svelte';

interface SvelteWrapperProps {
  component: typeof SvelteComponent;
  props?: Record<string, any>;
}

export function createSvelteWrapper(
  SvelteComponentClass: typeof SvelteComponent,
  defaultProps?: Record<string, any>
) {
  return function SvelteWrapper(props: Record<string, any>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const componentRef = useRef<SvelteComponent | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      // Mount the Svelte component
      componentRef.current = new SvelteComponentClass({
        target: containerRef.current,
        props: { ...defaultProps, ...props },
      });

      // Cleanup on unmount
      return () => {
        componentRef.current?.$destroy();
      };
    }, []);

    // Update props when they change
    useEffect(() => {
      if (componentRef.current) {
        componentRef.current.$set({ ...defaultProps, ...props });
      }
    }, [props]);

    return <div ref={containerRef} />;
  };
}