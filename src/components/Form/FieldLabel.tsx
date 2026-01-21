export interface FieldLabelProps {
  label: string;
  description?: string;
  htmlFor?: string; // input 연결용
}

const FieldLabel = ({ label, description, htmlFor }: FieldLabelProps) => {
  return (
    <div className="flex flex-col gap-1 items-start">
      <label htmlFor={htmlFor} className="text-body text-gray-80">
        {label}
      </label>
      {description ? (
        <p className="text-caption text-gray-60 whitespace-pre-line">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default FieldLabel;
