import type { Meta, StoryObj } from "@storybook/react-vite";
import IntroCard from "./IntroCard";

const meta: Meta<typeof IntroCard> = {
  title: "Features/Creator/landing/IntroCard",
  component: IntroCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
