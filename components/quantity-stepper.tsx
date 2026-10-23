'use client'

import { Minus, Plus } from 'lucide-react'

type Props = { value: number; onChange: (value: number) => void; max: number; label: string }

export function QuantityStepper({ value, onChange, max, label }: Props) {
  return (
    <div role="group" aria-label={label} className="flex h-10 items-center rounded-md border border-input bg-card">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className="flex h-full w-9 items-center justify-center text-foreground hover:bg-muted disabled:opacity-40"
      >
        <Minus className="size-4" aria-hidden="true" />
        <span className="sr-only">Decrease quantity</span>
      </button>
      <span className="w-10 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-full w-9 items-center justify-center text-foreground hover:bg-muted disabled:opacity-40"
      >
        <Plus className="size-4" aria-hidden="true" />
        <span className="sr-only">Increase quantity</span>
      </button>
    </div>
  )
}
