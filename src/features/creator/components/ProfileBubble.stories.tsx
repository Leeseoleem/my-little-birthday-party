import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ProfileBubble from "./ProfileBubble";

const meta: Meta<typeof ProfileBubble> = {
  title: "Features/Creator/ProfileBubble",
  component: ProfileBubble,
  tags: ["autodocs"],
  argTypes: {
    characterType: {
      control: "select",
      options: ["raccoon", "hedgehog", "cat"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Raccoon: Story = {
  render: (args) => {
    const [value, setValue] = useState("안녕하세요!");
    return <ProfileBubble {...args} value={value} onChange={setValue} />;
  },
};

export const Hedgehog: Story = {
  args: {
    characterType: "hedgehog",
  },
  render: (args) => {
    const [value, setValue] = useState("안녕하세요!");
    return <ProfileBubble {...args} value={value} onChange={setValue} />;
  },
};

export const Cat: Story = {
  args: {
    characterType: "cat",
  },
  render: (args) => {
    const [value, setValue] = useState("안녕하세요!");
    return <ProfileBubble {...args} value={value} onChange={setValue} />;
  },
};
