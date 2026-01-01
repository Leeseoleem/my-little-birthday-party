import type { Meta, StoryObj } from "@storybook/react-vite";
import ShareButtons from "./ShareButtons";

const meta: Meta<typeof ShareButtons> = {
  title: "Components/Share/ShareButtons",
  component: ShareButtons,
  parameters: {
    layout: "centered", // 버튼 묶음은 중앙 배치가 보기 좋음
  },
  args: {
    url: "https://my-little-birthday-party.vercel.app/card/abcd1234",
    title: "생일 축하 카드",
    description: "특별한 생일 메시지를 확인해보세요",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
