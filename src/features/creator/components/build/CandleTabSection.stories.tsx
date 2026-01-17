import type { Meta, StoryObj } from "@storybook/react-vite";
import CandleTabSection from "./CandleTabSection";

const meta: Meta<typeof CandleTabSection> = {
  title: "Features/Creator/CandleTabSection",
  component: CandleTabSection,
  tags: ["autodocs"],
  args: {
    pages: {
      long: (
        <>
          <p>긴 초 페이지</p>
        </>
      ),
      short: (
        <>
          <p>짧은 초 페이지</p>
        </>
      ),
      special: (
        <>
          <p>특별한 초 페이지</p>
        </>
      ),
    },
  },
};
export default meta;
type Story = StoryObj<typeof CandleTabSection>;

export const Default: Story = {};
