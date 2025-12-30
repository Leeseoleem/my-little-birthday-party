import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import CommonButton from "./Button";

const meta: Meta<typeof CommonButton> = {
  title: "Components/UI/Button/CommonButton",
  component: CommonButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: {
    label: "비활성화 버튼",
    isDisabled: true,
  },
};

export const Enabled: Story = {
  args: {
    label: "활성화 버튼",
    isDisabled: false,
    onClick: fn(),
  },
};
