import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import InputBubble from "./InputBubble";

const meta: Meta<typeof InputBubble> = {
  title: "Components/UI/Bubble/InputBubble",
  component: InputBubble,
  tags: ["autodocs"],
  args: {
    placeholder: "이 캐릭터가 건넬 생일 축하 한마디를 적어주세요!",
  },
  argTypes: {
    tail: {
      control: "select",
      options: ["left-top", "left-bottom", "right-top", "right-bottom"],
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <InputBubble {...args} value={value} onChange={setValue} />;
  },
};
