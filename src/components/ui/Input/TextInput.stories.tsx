import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/UI/Input/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: {
    placeholder: "여기에 텍스트를 입력하세요",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <TextInput {...args} value={value} onChange={setValue} />;
  },
};
