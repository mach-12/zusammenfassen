const Alert = () => {
  return (
    <div
      role="alert"
      className="transition-opacity duration-100  ease-in opacity-100  w-40 text-sm alert alert-info absolute bottom-4 right-4 p-2 rounded-md flex items-start"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="my-auto  ">Text Copied</span>
    </div>
  );
};
export default Alert;
