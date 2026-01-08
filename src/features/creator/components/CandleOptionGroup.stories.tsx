import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CandleOptionGroup } from "./CandleOptionGroup";
import { LONG_CANDLE_OPTIONS } from "../data/candleOption.data";

const meta: Meta<typeof CandleOptionGroup> = {
  title: "Features/Creator/CandleOptionGroup",
  component: CandleOptionGroup,
  tags: ["autodocs"],
  args: {
    options: LONG_CANDLE_OPTIONS,
  },
};
export default meta;
type Story = StoryObj<typeof CandleOptionGroup>;

export const Default: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string>(
      LONG_CANDLE_OPTIONS[0].id
    );
    return (
      <CandleOptionGroup
        {...args}
        value={selectedId}
        onChange={setSelectedId}
      />
    );
  },
};
