import "react";

// WebMCP (Web Model Context Protocol) Declarative Form API
// Augments React's JSX types to allow declarative WebMCP HTML attributes on forms and form elements.
// Reference: Chrome Early Preview / Origin Trial for WebMCP Declarative API

declare module "react" {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean | string;
  }

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
    toolparamname?: string;
    toolparamtype?: string;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
    toolparamname?: string;
    toolparamtype?: string;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    toolparamdescription?: string;
    toolparamname?: string;
    toolparamtype?: string;
  }
}
