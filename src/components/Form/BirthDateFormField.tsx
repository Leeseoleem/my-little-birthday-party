import BirthDateInput, {
  type BirthDateInputProps,
} from "../ui/Input/BirthDateInput";
import FormField from "./FormField";

export interface BirthDateFormFieldProps {
  name: string;
  label: string;
  description?: string;
  input: BirthDateInputProps;
}

const BirthDateFormField = ({
  name,
  label,
  description,
  input,
}: BirthDateFormFieldProps) => {
  return (
    <FormField id={name} label={{ label, description }}>
      {({ id }) => <BirthDateInput {...input} id={id} />}
    </FormField>
  );
};

export default BirthDateFormField;
