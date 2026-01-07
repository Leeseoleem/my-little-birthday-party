import type { Meta, StoryObj } from "@storybook/react-vite";
import AnchoredBubble from "./AnchoredBubble";

const meta: Meta<typeof AnchoredBubble> = {
  title: "components/ui/Bubble/AnchoredBubble",
  component: AnchoredBubble,
};
export default meta;
type Story = StoryObj<typeof AnchoredBubble>;

export const Default: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Click me
      </button>
    ),
    message: "테스트 용 버블 메시지입니다.",
    tail: "left-top",
  },
};
