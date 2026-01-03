import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import PinCardLayout from "./PinCardLayout";
import TextFormField from "../form/TextFormField";

const meta: Meta<typeof PinCardLayout> = {
  title: "Components/Layout/PinCardLayout",
  component: PinCardLayout,
  tags: ["autodocs"],
  args: {
    titleProps: {
      title: "테스트 용 타이틀",
      subTitle: "테스트 용 서브 타이틀 입니다",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <PinCardLayout {...args}>
        <TextFormField
          name="label"
          label="라벨"
          description="라벨에 대한 설명"
          input={{
            value: value,
            onChange: setValue,
          }}
        />
      </PinCardLayout>
    );
  },
};
