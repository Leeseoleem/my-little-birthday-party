export interface ReceiptLayoutHeaderProps {
  title: string;
  subTitle?: string;
}

const ReceiptLayoutHeader = ({ title, subTitle }: ReceiptLayoutHeaderProps) => {
  return (
    <header className="text-center flex flex-col w-full justify-center">
      <h1 className="text-display-03 mdh:text-display-02 lgh:text-display-01 text-main">
        {title}
      </h1>
      {subTitle && (
        <p className="mt-2 text-caption mdh:text-small lgh:text-body mdh:font-medium lgh:font-medium text-gray-60">
          {subTitle}
        </p>
      )}
    </header>
  );
};

export default ReceiptLayoutHeader;
