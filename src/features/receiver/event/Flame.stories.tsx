import type { Meta, StoryObj } from "@storybook/react-vite";
import Flame from "./Flame";
import { useState } from "react";

const meta: Meta<typeof Flame> = {
  title: "Features/Receiver/Event/Flame",
  component: Flame,
  tags: ["autodocs"],
  args: {
    size: 100,
    top: 50,
  },
};

export default meta;
type Story = StoryObj<typeof Flame>;

export const Default: Story = {
  render: (args) => {
    const [isOn, SetIsOn] = useState(true);
    return (
      <div className="flex flex-col">
        <button onClick={() => SetIsOn(!isOn)}>불 끄기</button>
        <Flame {...args} isOn={isOn} />
      </div>
    );
  },
};
