import BirthDateInput, {
  type BirthDateInputProps,
} from "../Input/BirthDateInput";
import FormField from "./FormField";

interface BirthDateFormFieldProps {
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
