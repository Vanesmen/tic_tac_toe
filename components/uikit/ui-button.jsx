import clsx from "clsx";

export function UiButton({ children, className, size, variant }) {
  const buttonClassName = clsx(
    "cursor-pointer transition-colors",
    className,
    {
      md: 'rounded px-6 py-2 text-sm leading-tight',
      lg: 'rounded-xl px-5 py-2 text-2xl leading-tight',
    }[size],
    {
      primary: 'bg-teal-600 text-white cursor-pointer hover:bg-teal-500',
      outline: 'border border-teal-600 text-teal-600 hover:bg-teal-50',
    }[variant],
  )

  return (
    <button className={buttonClassName}>{children}</button>
  )
}