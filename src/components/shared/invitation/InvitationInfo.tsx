export interface InvitationInfoProps {
  inviteeName: string;
  inviteeBirthDate: string;
}

const InvitationInfo = ({
  inviteeName,
  inviteeBirthDate,
}: InvitationInfoProps) => {
  const textClass = `text-small font-semibold md:text-body text-gray-70`;
  return (
    <div className="space-y-1">
      <div className="flex">
        <span className={`${textClass} w-20`}>받는 사람 :</span>
        <span className={textClass}>{inviteeName}</span>
      </div>

      <div className="flex">
        <span className={`${textClass} w-20`}>생일 :</span>
        <span className={textClass}>{inviteeBirthDate}</span>
      </div>
    </div>
  );
};

export default InvitationInfo;
