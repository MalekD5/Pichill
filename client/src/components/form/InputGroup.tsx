export default function InputGroup({
  children,
  flex,
}: {
  children: React.ReactNode;
  flex?: boolean;
}) {
  return <div className={`${flex && 'flex items-start'}`}> {children} </div>;
}

InputGroup.defaultProps = {
  flex: false,
};
