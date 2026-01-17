import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CandlePickerSheet from "./CandlePickerSheet";

const meta: Meta<typeof CandlePickerSheet> = {
  title: "Features/Creator/Build/CandlePickerSheet",
  component: CandlePickerSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("");
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <button onClick={() => setIsOpen(true)}>슬롯 확인용</button>
        <CandlePickerSheet
          {...args}
          isOpen={isOpen}
          onPick={(v) => setSelectedId(v)}
          onClickBackdrop={() => {
            setIsOpen(false);
            setSelectedId("");
          }}
          selectedId={selectedId}
        />
      </div>
    );
  },
};
