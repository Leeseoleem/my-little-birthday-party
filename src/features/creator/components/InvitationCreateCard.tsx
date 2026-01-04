import PinCardLayout from "../../../components/layout/frame/PinCardLayout";

import {
  TextFormField,
  BirthDateFormField,
  type TextFormFieldProps,
  type BirthDateFormFieldProps,
} from "../../../components/form";

type NameFieldInputProps = Omit<
  TextFormFieldProps,
  "label" | "description" | "name"
>;

type BirthDateFieldInputProps = Omit<
  BirthDateFormFieldProps,
  "label" | "description" | "name"
>;

interface InvitationCreateCardProps {
  nameField: NameFieldInputProps;
  birthDateField: BirthDateFieldInputProps;
}

const InvitationCreateCard = ({
  nameField,
  birthDateField,
}: InvitationCreateCardProps) => {
  return (
    <PinCardLayout
      titleProps={{
        title: "초대 카드",
        subTitle: "이제, 이 초대장이 누구에게 갈지 알려주세요",
      }}
    >
      <TextFormField
        name="receiverName"
        label="받는 사람"
        description="초대할 분의 이름이나 별명을 적어주세요"
        {...nameField}
      />
      <BirthDateFormField
        name="birthDate"
        label="생일"
        description="이 생일은 초대장을 여는 데 사용돼요"
        {...birthDateField}
      />
    </PinCardLayout>
  );
};

export default InvitationCreateCard;
