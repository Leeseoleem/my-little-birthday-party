import type { StoryObj, Meta } from "@storybook/react-vite";
import { ExitButton } from "./ExitButton";

const meta: Meta<typeof ExitButton> = {
  title: "Components/UI/Header/ExitButton",
  component: ExitButton,
  tags: ["autodocs"],
  args: {
    onClick: () => {
      window.confirm("지금 나가면 제작이 중단돼요. \n메인으로 이동할까요?");
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
