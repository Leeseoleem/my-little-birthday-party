import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import InvitationCompleteCard from "./InvitationCompleteCard";

const meta: Meta<typeof InvitationCompleteCard> = {
  title: "Features/Creator/Complete/InvitationCompleteCard",
  component: InvitationCompleteCard,
  tags: ["autodocs"],
  args: {
    info: {
      inviteeName: "이름",
      inviteeBirthDate: "01-08",
    },
    sns: {
      onCopyLink: fn(),
      onShareKakao: fn(),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
