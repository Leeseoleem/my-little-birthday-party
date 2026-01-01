import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import CarouselArrowButton from "./CarouselArrowButton";

const meta: Meta<typeof CarouselArrowButton> = {
  title: "Components/UI/Button/CarouselArrowButton",
  component: CarouselArrowButton,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["left", "right"],
    },
    isDisabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselArrowButton>;

export const Left: Story = {
  args: {
    direction: "left",
    isDisabled: false,
    onClick: fn(),
  },
};

export const Right: Story = {
  args: {
    direction: "right",
    isDisabled: false,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    direction: "left",
    isDisabled: true,
    onClick: fn(),
  },
};
