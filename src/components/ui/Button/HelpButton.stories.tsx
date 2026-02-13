import type { Meta, StoryObj } from "@storybook/react-vite";
import HelpButton from "./HelpButton";

const meta: Meta<typeof HelpButton> = {
  title: "Components/UI/Button/HelpButton",
  component: HelpButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "도움말", // 기본 라벨 텍스트
    to: "/", // 기본 링크 경로
  },
  argTypes: {
    label: {
      control: "text",
      description: "버튼 라벨 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
