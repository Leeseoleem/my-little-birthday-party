import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MusicButton } from "./MusicButton";

const meta: Meta<typeof MusicButton> = {
  title: "Components/UI/Header/MusicButton",
  component: MusicButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(true);
    return (
      <MusicButton
        isPlaying={isPlaying}
        onToggle={() => setIsPlaying(!isPlaying)}
      />
    );
  },
};
