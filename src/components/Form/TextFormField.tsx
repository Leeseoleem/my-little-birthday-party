import TextInput, { type TextInputProps } from "../ui/Input/TextInput";
import FormField from "./FormField";

export interface TextFormFieldProps {
  name: string;
  label: string;
  description?: string;
  input: TextInputProps;
}

const TextFormField = ({
  name,
  label,
  description,
  input,
}: TextFormFieldProps) => {
  return (
    <FormField id={name} label={{ label, description }}>
      {({ id }) => <TextInput {...input} id={id} />}
    </FormField>
  );
};

export default TextFormField;
