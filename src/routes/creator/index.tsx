import { createFileRoute } from "@tanstack/react-router";

import EnvelopeLayout from "../../components/layout/page/EnvelopeLayout";
import GarlandLayout from "../../components/layout/page/GarlandLayout";
import IntroCard from "../../features/creator/components/landing/IntroCard";

export const Route = createFileRoute("/creator/")({
  staticData: {
    creatorLayout: {
      isFullBleed: true,
    },
  },
  component: CreatorLandingPage,
});

function CreatorLandingPage() {
  return (
    <GarlandLayout>
      <EnvelopeLayout />
      <div className="flex h-full items-center justify-center px-6">
        <IntroCard />
      </div>
    </GarlandLayout>
  );
}
