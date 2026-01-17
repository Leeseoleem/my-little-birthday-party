import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import CreatorShareSection from "./CreatorShareSection";

const meta: Meta<typeof CreatorShareSection> = {
  title: "Features/Creator/CreatorShareSection",
  component: CreatorShareSection,
  tags: ["autodocs"],
  args: {
    info: {
      inviteeName: "이름",
      inviteeBirthDate: "01-08",
    },
    sns: {
      onCopyLink: fn(),
      onShareKakao: fn(),
      onShareMail: fn(),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
