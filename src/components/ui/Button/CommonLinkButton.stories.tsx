import type { Meta, StoryObj } from "@storybook/react-vite";
import CommonLinkButton from "./CommonLinkButton";

const meta: Meta<typeof CommonLinkButton> = {
  title: "Components/UI/Button/CommonLinkButton",
  component: CommonLinkButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "다음",
    to: "/creator/info",
  },
  argTypes: {
    to: {
      control: "text",
      description: "이동할 경로",
    },
    label: {
      control: "text",
      description: "버튼 라벨 텍스트",
    },
    isDisabled: {
      control: "boolean",
      description: "비활성 상태(클릭/포커스 차단)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const WithDifferentLabel: Story = {
  args: {
    label: "시작하기",
  },
};
