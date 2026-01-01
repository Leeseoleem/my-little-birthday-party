import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackButton } from "./BackButton";
import { fn } from "storybook/test";

const meta: Meta<typeof BackButton> = {
  title: "Components/UI/Header/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  args: {
    fallbackTo: "/",
    onClickBack: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
