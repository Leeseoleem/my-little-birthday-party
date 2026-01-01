import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { useEffect, useState } from "react";
import BirthDateInput from "./BirthDateInput";

const meta: Meta<typeof BirthDateInput> = {
  title: "Components/UI/Input/BirthDateInput",
  component: BirthDateInput,
  tags: ["autodocs"],
  argTypes: {
    onChange: fn(),
    onComplete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    isInvalid: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");
    useEffect(() => {
      setValue(args.value ?? "");
    }, [args.value]);

    return (
      <BirthDateInput
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange?.(v);
        }}
      />
    );
  },
};
