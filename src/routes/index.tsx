import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";

import AppHeader from "../components/ui/Header/AppHeader";
import { BackButton } from "../components/ui/Header/BackButton";
import PageTitle from "../components/ui/PageTitle";
import TextInput from "../components/ui/Input/TextInput";
import CommonButton from "../components/ui/Button/Button";
import BirthDateInput from "../components/ui/Input/BirthDateInput";
import FormField from "../components/Form/FormField";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [birthValue, setBirthValue] = useState("");
  return (
    <div className="flex flex-col">
      <AppHeader
        left={<BackButton fallbackTo="/" />}
        progress={{
          value: 0.6,
        }}
      />
      <PageTitle
        title="홈페이지"
        subTitle="이제, 이 초대장이 누구에게 갈지 알려주세요"
      />

      <FormField
        id="name"
        label={{
          label: "이름",
          description: "이름은 입력해주세요",
        }}
      >
        {({ id }) => (
          <TextInput id={id} value={inputValue} onChange={setInputValue} />
        )}
      </FormField>

      <FormField
        id="birth"
        label={{
          label: "생일",
          description: "생일을 입력해주세요",
        }}
      >
        {({ id }) => (
          <BirthDateInput id={id} value={birthValue} onChange={setBirthValue} />
        )}
      </FormField>

      <CommonButton label="하이" />
    </div>
  );
}
