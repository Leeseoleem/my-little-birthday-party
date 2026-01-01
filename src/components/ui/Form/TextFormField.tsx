import TextInput, { type TextInputProps } from "../Input/TextInput";
import FormField from "./FormField";

interface TextFormFieldProps {
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
