import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import NoticeFrame from "./NoticeFrame";

const meta: Meta<typeof NoticeFrame> = {
  title: "Components/Layout/NoticeFrame",
  component: NoticeFrame,
  tags: ["autodocs"],
  args: {
    buttonProps: {
      label: "버튼 라벨",
      onClick: fn(),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    segments: [
      { text: "다음의 텍스트는 " },
      { text: "제 블로그", href: "https://velog.io/@leeseoleem1014" },
      { text: "로 이동합니다." },
    ],
  },
};

export const Display: Story = {
  args: {
    style: "display",
    segments: [
      { text: "다음의 텍스트는 " },
      { text: "제 블로그", href: "https://velog.io/@leeseoleem1014" },
      { text: "로 이동합니다." },
    ],
  },
};
