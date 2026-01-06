import type { Meta, StoryObj } from "@storybook/react-vite";
import TextBubble from "./TextBubble";

const meta: Meta<typeof TextBubble> = {
  title: "Components/UI/Bubble/TextBubble",
  component: TextBubble,

  tags: ["autodocs"],
  args: {
    message: "안녕하세요! 오늘도 좋은 하루 보내세요!",
    tail: "left-bottom",
  },
};

export default meta;

type Story = StoryObj<typeof TextBubble>;

export const Default: Story = {};
export const RightTopTail: Story = {
  args: {
    tail: "right-top",
  },
};
