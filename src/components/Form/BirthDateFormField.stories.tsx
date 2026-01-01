import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import BirthDateFormField from "./BirthDateFormField";

const meta: Meta<typeof BirthDateFormField> = {
  title: "Components/UI/Form/BirthDateFormField",
  component: BirthDateFormField,
  tags: ["autodocs"],
  args: {
    name: "birth",
    label: "생일",
    description: "생일을 입력해주세요",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(""); // "MMDD" 형태, 예: "0101"

    return (
      <BirthDateFormField
        {...args}
        input={{
          id: args.name, // FormField에서 내려주는 id로 덮어씌워질 수 있지만, 타입 안정성을 위해 기본값을 넣어둠
          value,
          onChange: setValue,
          isInvalid: false,
        }}
      />
    );
  },
};
