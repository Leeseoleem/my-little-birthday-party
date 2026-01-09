import type { Meta, StoryObj } from "@storybook/react-vite";
import ActionButtonGroup from "./ActionButtonGroup";
import { fn } from "storybook/test";

const meta: Meta<typeof ActionButtonGroup> = {
  title: "Components/UI/Button/ActionButtonGroup",
  component: ActionButtonGroup,
  tags: ["autodocs"],
  args: {
    onClickText: fn(),
    buttonProps: {
      label: "버튼 라벨",
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {};
