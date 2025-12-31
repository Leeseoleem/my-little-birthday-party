import type { Meta, StoryObj } from "@storybook/react-vite";
import PageTitle from "./PageTitle";

const meta: Meta<typeof PageTitle> = {
  title: "Components/UI/PageTitle",
  component: PageTitle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "페이지 제목",
    subTitle: "이것은 페이지의 부제목입니다.",
  },
};

export const LongTitle: Story = {
  args: {
    title: "페이지 제목이 매우 길어서 여러 줄로 표시되는 경우",
    subTitle: "이것은 페이지의 부제목입니다. 부제목도 길어질 수 있습니다.",
  },
};
