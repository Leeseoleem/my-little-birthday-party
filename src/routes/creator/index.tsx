import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/creator/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/creator/"!</div>;
}
