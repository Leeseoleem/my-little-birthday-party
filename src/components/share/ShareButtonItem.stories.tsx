import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ShareButtonItem } from "./ShareButtonItem";

import { Mail } from "lucide-react";

const meta: Meta<typeof ShareButtonItem> = {
  title: "Components/Share/ShareButtonItem",
  component: ShareButtonItem,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    ariaLabel: "메일",
    Icon: Mail,
  },
};
