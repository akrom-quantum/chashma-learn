// src/components/content/Typography.js
// Element-level typography overrides for MDX. Most styling lives in ContentRenderer's
// scoped CSS — these are here for legacy JSX-based units that haven't migrated yet.

export function H2({ children, id, ...rest }) {
  return <h2 id={id} {...rest}>{children}</h2>;
}
export function H3({ children, id, ...rest }) {
  return <h3 id={id} {...rest}>{children}</h3>;
}
export function P({ children, ...rest }) {
  return <p {...rest}>{children}</p>;
}
export function Bold({ children, ...rest }) {
  return <strong {...rest}>{children}</strong>;
}
export function Em({ children, ...rest }) {
  return <em {...rest}>{children}</em>;
}
export function Code({ children, ...rest }) {
  return <code {...rest}>{children}</code>;
}
