import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CakeSelectSection from "./CakeSelectSection";
import type { CakeType } from "../types/cake.types";

const meta: Meta<typeof CakeSelectSection> = {
  title: "Features/Creator/CakeSelectSection",
  component: CakeSelectSection,
  tags: ["autodocs"],
  args: {
    buttonProps: {
      to: "/creator/cake/build",
    },
  },
};
export default meta;
type Story = StoryObj<typeof CakeSelectSection>;
export const Default: Story = {
  render: (args) => {
    const [cakeType, setCakeType] = useState<CakeType>("party");
    return (
      <CakeSelectSection
        {...args}
        type={cakeType}
        onTypeChange={(type) => setCakeType(type as CakeType)}
      />
    );
  },
};
