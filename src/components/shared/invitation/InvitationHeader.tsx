const InvitationHeader = () => {
  return (
    <header className="text-center flex flex-col w-full justify-center">
      <h1 className="text-display-03 mdh:text-display-02 lgh:text-display-01 text-main">
        초대장
      </h1>
      <p className="mt-2 text-caption mdh:text-small lgh:text-body mdh:font-medium lgh:font-medium text-gray-60">
        소중한 사람을 위한 작은 생일 파티가 준비됐어요
      </p>
    </header>
  );
};

export default InvitationHeader;
