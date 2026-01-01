import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import TextFormField from "./TextFormField";

const meta: Meta<typeof TextFormField> = {
  title: "Components/UI/Form/TextFormField",
  component: TextFormField,
  tags: ["autodocs"],
  args: {
    name: "text",
    label: "라벨 입니다",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextFormField
        {...args}
        input={{
          value: value,
          onChange: setValue,
        }}
      />
    );
  },
};
