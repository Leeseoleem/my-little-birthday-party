export interface PageTitleProps {
  title: string;
  subTitle: string;
}

const PageTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <div className="flex flex-col items-start gap-1 mdh:gap-1.5 lgh:gap-2">
      <h1 className="text-display-03 mdh:text-display-02 lgh:text-display-01 text-main">
        {title}
      </h1>
      <p className="text-small mdh:text-body lgh:text-sub-title mdh:font-medium lgh:font-medium text-gray-60">
        {subTitle}
      </p>
    </div>
  );
};

export default PageTitle;
