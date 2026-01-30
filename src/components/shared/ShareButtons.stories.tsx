import type { Meta, StoryObj } from "@storybook/react-vite";
import ShareButtons from "./ShareButtons";

const meta: Meta<typeof ShareButtons> = {
  title: "Components/Share/ShareButtons",
  component: ShareButtons,
  parameters: {
    layout: "centered", // 버튼 묶음은 중앙 배치가 보기 좋음
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
