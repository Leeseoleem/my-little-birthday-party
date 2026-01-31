import { createFileRoute, useNavigate } from "@tanstack/react-router";

import GarlandLayout from "../../components/layout/page/GarlandLayout";
import EnvelopeLayout from "../../components/layout/page/EnvelopeLayout";

import InvalidAccessNoticeCard from "../../features/receiver/expired/InvalidAccessNoticeCard.tsx";

export const Route = createFileRoute("/r/expired")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <GarlandLayout>
      <EnvelopeLayout />
      <div className="flex min-h-dvh z-50">
        <div className="flex-1 flex justify-center items-center">
          <InvalidAccessNoticeCard
            onClick={() =>
              navigate({
                to: "/creator",
              })
            }
          />
        </div>
      </div>
    </GarlandLayout>
  );
}
