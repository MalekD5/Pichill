export default function Input({
  type,
  name,
  placeholder,
  required,
  register,
}: DynamicInputProps) {
  return (
    <input
      required={required}
      placeholder={placeholder}
      {...register(name)}
      type={type}
      className='border text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
    />
  );
}

Input.defaultProps = {
  type: 'text',
  required: false,
  placeholder: '',
};
