declare global {
  interface DynamicInputProps extends InputProps {
    type?: string;
    placeholder?: string;
  }

  interface InputProps {
    required?: boolean;
    name: string;
    register: UseFormRegister<FieldValues>;
  }
}

export {};
