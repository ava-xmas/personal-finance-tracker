const Button = ({ label, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg focus:outline-none transition-all duration-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} `}
        >{label}</button>
    );
};

export default Button