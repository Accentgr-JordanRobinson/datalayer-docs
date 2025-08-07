const Tab = ({ data, component, children, isActive, ...props }) => {
  return (
  <div>
    {component && (
        <div className="mb-4">
          {component}
        </div>
      )}
    {children && (
      <div {...props} className="m-4 px-2">
        {children}
      </div>
    )} 
  </div>
  );
};

export default Tab;