interface PageTitleProps {
  title: string;
  subTitle: string;
}

const PageTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-display-03 sm:text-display-02 md:text-display-01 text-main">
        {title}
      </h1>
      <p className="text-small sm:text-body md:text-sub-title sm:font-medium md:font-medium text-gray-60">
        {subTitle}
      </p>
    </div>
  );
};

export default PageTitle;
