import type { Meta, StoryObj } from "@storybook/react-vite";
import CakeMenuCard from "./CakeMenuCard";

const meta: Meta<typeof CakeMenuCard> = {
  title: "Features/Creator/Select/CakeMenuCard",
  component: CakeMenuCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuContent: {
      title: "메뉴판",
      description: "메뉴 설명이 들어가는 자리입니다.\n여러 줄도 가능합니다.",
    },
    buttonProps: {
      to: "/",
    },
  },
};
