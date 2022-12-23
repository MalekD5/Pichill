export default function Label(props: any) {
  const { label, htmlFor, block, required } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-2 text-sm font-medium text-white ${
        block ? 'block' : 'ml-2'
      }`}
    >
      {label} {required && <span className='text-red-600 text-sm'>*</span>}
    </label>
  );
}

Label.defaultProps = {
  block: true,
};
