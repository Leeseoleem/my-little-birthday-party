import FieldLabel, { type FieldLabelProps } from "./FieldLabel";

interface FormFieldProps {
  id: string;
  label: FieldLabelProps;
  children: (a11y: { id: string }) => React.ReactNode;
}

const FormField = ({ id, children, label }: FormFieldProps) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <FieldLabel {...label} htmlFor={id} />
      {children({ id })}
    </div>
  );
};

export default FormField;
