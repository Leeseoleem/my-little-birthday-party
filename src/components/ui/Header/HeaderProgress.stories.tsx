import type { Meta, StoryObj } from "@storybook/react-vite";
import HeaderProgress from "./HeaderProgress";

const meta: Meta<typeof HeaderProgress> = {
  title: "Components/UI/Header/HeaderProgress",
  component: HeaderProgress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
      },
      description: "진행률 (0 ~ 1 사이 값)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Quarter: Story = {
  args: {
    value: 0.25,
  },
};

export const Half: Story = {
  args: {
    value: 0.5,
  },
};

export const AlmostDone: Story = {
  args: {
    value: 0.9,
  },
};

export const Full: Story = {
  args: {
    value: 1,
  },
};
