export default function NotFound() {
  return (
    <div className='grid grid-rows-3 justify-items-center content-center mt-[25vh]'>
      <h1 className='text-white font-bold text-3xl'>
        <span className='text-red-600'>404</span> Not Found!
      </h1>
      <p className='text-gray-300 text-lg'>
        The requested page does not exist.
      </p>
    </div>
  );
}
