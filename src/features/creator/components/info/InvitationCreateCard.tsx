import PinCardLayout from "../../../../components/layout/frame/PinCardLayout";

import { TextFormField, BirthDateFormField } from "../../../../components/Form";
import type { TextInputProps } from "../../../../components/ui/Input/TextInput";
import type { BirthDateInputProps } from "../../../../components/ui/Input/BirthDateInput";

type NameFieldInputProps = Omit<TextInputProps, "id">;
interface InvitationCreateCardProps {
  nameField: NameFieldInputProps;
  birthDateField: BirthDateInputProps;
}

const InvitationCreateCard = ({
  nameField,
  birthDateField,
}: InvitationCreateCardProps) => {
  return (
    <PinCardLayout
      titleProps={{
        title: "초대 카드",
        subTitle: "이 초대장이 누구에게 갈지 알려주세요",
      }}
    >
      <TextFormField
        name="receiverName"
        label="받는 사람"
        description="초대할 분의 이름이나 별명을 적어주세요"
        input={nameField}
      />
      <BirthDateFormField
        name="birthDate"
        label="생일"
        description="이 생일은 초대장을 여는 데 사용돼요"
        input={birthDateField}
      />
    </PinCardLayout>
  );
};

export default InvitationCreateCard;
