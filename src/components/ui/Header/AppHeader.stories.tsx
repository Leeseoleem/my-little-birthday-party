import type { Meta, StoryObj } from "@storybook/react-vite";
import AppHeader from "./AppHeader";
import { BackButton } from "./BackButton";

const meta: Meta<typeof AppHeader> = {
  title: "Components/UI/Header/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  argTypes: {
    left: { control: false },
    title: { control: false },
    right: { control: false },
    progress: { control: "object", description: "진행률 객체" },
    container: { control: "boolean" },
  },
  // 기본 args를 명시해서 초기 렌더에서 {} 들어오는 걸 차단
  args: {
    container: true,
    progress: undefined, // 기본은 progress 없는 헤더
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Back: Story = {
  render: (args) => (
    <AppHeader {...args} left={<BackButton fallbackTo="/" />} />
  ),
};
