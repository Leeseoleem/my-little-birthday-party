import type { Meta, StoryFn } from "@storybook/react-vite";
import { useArgs } from "storybook/internal/preview-api";
import DigitInput from "./DigitInput";

export default {
  title: "Components/UI/Input/DigitInput",
  component: DigitInput,
  args: {
    value: "",
  },
  argTypes: {
    onChange: { control: false },
    onFilled: { control: false },
    onBackspaceOnEmpty: { control: false },
  },
} as Meta<typeof DigitInput>;

export const Default: StoryFn<typeof DigitInput> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <DigitInput
      {...args}
      onChange={(newValue) => updateArgs({ value: newValue })}
    />
  );
};

export const InValid: StoryFn<typeof DigitInput> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <DigitInput
      {...args}
      isInvalid
      onChange={(newValue) => updateArgs({ value: newValue })}
    />
  );
};
