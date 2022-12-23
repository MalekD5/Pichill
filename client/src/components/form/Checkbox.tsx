export default function Checkbox({ name, required, register }: InputProps) {
  return (
    <input
      className='w-4 h-4 text-blue-600 rounded focus:ring-blue-600 !ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600'
      type='checkbox'
      {...register(name)}
      required={required}
    />
  );
}
