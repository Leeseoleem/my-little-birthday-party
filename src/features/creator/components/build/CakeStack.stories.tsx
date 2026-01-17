import type { Meta, StoryObj } from "@storybook/react-vite";
import CakeStack from "./CakeStack";

const meta: Meta<typeof CakeStack> = {
  title: "Features/Creator/Build/CakeStack",
  component: CakeStack,
  tags: ["autodocs"],
  args: {
    cakeSrc: "/assets/cakes/party.png",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
