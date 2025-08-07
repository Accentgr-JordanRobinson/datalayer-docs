const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      {...props} 
      className={`rounded-lg bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-lg !border !border-white/20 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;