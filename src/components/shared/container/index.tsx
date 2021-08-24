export const Container = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-800 flex items-center justify-center px-5 py-5">
      {children}
    </div>
  );
};
