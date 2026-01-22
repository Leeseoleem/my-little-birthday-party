import type { Meta, StoryObj } from "@storybook/react-vite";
import GuideBubble from "./GuideBubble";

const meta: Meta<typeof GuideBubble> = {
  title: "Components/UI/Bubble/GuideBubble",
  component: GuideBubble,

  tags: ["autodocs"],
  args: {
    message: "안녕하세요! 오늘도 좋은 하루 보내세요!",
  },
};

export default meta;

type Story = StoryObj<typeof GuideBubble>;

export const Default: Story = {};
