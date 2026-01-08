import type { Meta, StoryObj } from "@storybook/react-vite";
import LetterPaperLayout from "./LetterPaperLayout";

const meta: Meta<typeof LetterPaperLayout> = {
  title: "Components/Layout/LetterPaperLayout",
  component: LetterPaperLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "default",
  },
};

export const Simple: Story = {
  args: {
    type: "simple",
  },
};

export const Night: Story = {
  args: {
    type: "night",
  },
};
