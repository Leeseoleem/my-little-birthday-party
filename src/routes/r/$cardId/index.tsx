import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/r/$cardId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/r/$cardId/"!</div>
}
