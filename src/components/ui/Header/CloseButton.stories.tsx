import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseButton } from "./CloseButton";

const meta: Meta<typeof CloseButton> = {
  title: "Components/UI/Header/CloseButton",
  component: CloseButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
