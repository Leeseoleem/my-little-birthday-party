import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldLabel from "./FieldLabel";

const meta: Meta<typeof FieldLabel> = {
  title: "Components/UI/Form/FieldLabel",
  component: FieldLabel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "이름",
    description: "이름을 입력하는 란",
  },
};
