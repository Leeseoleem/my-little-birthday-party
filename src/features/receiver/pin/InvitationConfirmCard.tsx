import { motion } from "framer-motion";
import PinCardLayout from "../../../components/layout/frame/PinCardLayout";
import { BirthDateFormField } from "../../../components/form";
import type { BirthDateInputProps } from "../../../components/ui/Input/BirthDateInput";

type InvitationConfirmCardProps = {
  isInvalid: boolean;
  birthDateInput: Omit<BirthDateInputProps, "isInvalid">;
};

const InvitationConfirmCard = ({
  isInvalid,
  birthDateInput,
}: InvitationConfirmCardProps) => {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center"
      animate={isInvalid ? { x: [-6, 6, -6, 6, 0] } : { x: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <PinCardLayout
        titleProps={{
          title: "본인 확인",
          subTitle: "초대받은 분의 생일을 입력해 주세요",
        }}
      >
        <BirthDateFormField
          name="birthDate"
          label="생일 입력하기"
          description={
            !isInvalid
              ? "이 파티의 주인공인지 확인할게요"
              : "생일 정보가 이 파티와 맞지 않는 것 같아요.\n초대한 분께 한 번 확인해 보시겠어요?"
          }
          input={{
            isInvalid: isInvalid,
            ...birthDateInput,
          }}
        />
      </PinCardLayout>
    </motion.div>
  );
};

export default InvitationConfirmCard;
