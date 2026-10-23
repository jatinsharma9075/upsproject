'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  items: { sku: string; quantity: number }[]
  onSuccess: (result: { reference: string; total: number }) => void
}

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', required: true },
  { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', required: false },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'gstin', label: 'GSTIN (optional)', type: 'text', autoComplete: 'off', required: false },
] as const

const inputClass =
  'h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive'

export function EnquiryForm({ items, onSuccess }: Props) {
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setErrors({})
    try {
      const form = Object.fromEntries(new FormData(event.currentTarget).entries())
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors(data.fields ?? { form: data.error ?? 'Something went wrong' })
        return
      }
      onSuccess({ reference: data.reference, total: data.total })
    } catch {
      setErrors({ form: 'Network error. Please try again.' })
    } finally {
      setPending(false)
    }
  }

  return (
    <section aria-labelledby="quote-heading" className="rounded-lg border border-border bg-card p-5">
      <h2 id="quote-heading" className="font-semibold">Request a GST Quotation</h2>
      <p className="mt-1 text-sm text-muted-foreground">Get bulk pricing and delivery timelines from our team.</p>
      <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-3">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label htmlFor={`enq-${field.name}`} className="text-sm font-medium">
              {field.label}
            </label>
            <input
              id={`enq-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `enq-${field.name}-error` : undefined}
              className={inputClass}
            />
            {errors[field.name] && (
              <p id={`enq-${field.name}-error`} className="text-xs text-destructive">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <label htmlFor="enq-message" className="text-sm font-medium">
            Requirements (optional)
          </label>
          <textarea
            id="enq-message"
            name="message"
            rows={3}
            maxLength={1000}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        {(errors.items || errors.form) && (
          <p role="alert" className="text-sm text-destructive">
            {errors.items ?? errors.form}
          </p>
        )}
        <Button type="submit" size="lg" disabled={pending} className="mt-1 bg-accent text-accent-foreground hover:bg-accent/90">
          {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
          {pending ? 'Submitting…' : 'Submit Quote Request'}
        </Button>
      </form>
    </section>
  )
}
