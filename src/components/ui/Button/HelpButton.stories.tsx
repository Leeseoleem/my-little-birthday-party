import type { Meta, StoryObj } from "@storybook/react-vite";
import HelpButton from "./HelpButton";

const meta: Meta<typeof HelpButton> = {
  title: "Components/UI/Button/HelpButton",
  component: HelpButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "도움말",
    onClick: () => alert("Help button clicked!"),
  },
  argTypes: {
    label: {
      control: "text",
      description: "버튼 라벨 텍스트",
    },
    onClick: {
      action: "clicked",
      description: "버튼 클릭 시 호출되는 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
