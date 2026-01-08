import { createFileRoute } from "@tanstack/react-router";

import GarlandLayout from "../../components/layout/page/GarlandLayout";
import IntroCard from "../../features/creator/components/IntroCard";

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
      <div className="flex flex-1 items-center justify-center min-h-dvh">
        <IntroCard />
      </div>
    </GarlandLayout>
  );
}
