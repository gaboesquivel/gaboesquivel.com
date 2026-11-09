# ADR 0006: Capability action receipts

## Status

Accepted

## Context

Public writes must distinguish pending, confirmed, uncertain, and failed outcomes. Redis cap keys and external providers (Resend, Google Calendar) do not share a transaction. Existing connect helpers returned success-like messages for duplicate submits.

## Decision

Bind retry identity to operation plus normalized payload hash. Store JSON receipts under `capability:receipt:` keys with a 48-hour TTL inherited from the cap store. Notes pass Resend idempotency keys; bookings insert with stable Calendar event ids and reconcile with `calendar.get`. Uncertain outcomes are not blindly retried.

## Consequences

Native and MCP adapters share the same write semantics. Chat-era helpers remain until `/ask` retires, but new consumers use `lib/capabilities`.
