type CardProps = {
  children: React.ReactNode;
  onClick?: () => unknown;
}

export default function Card(props: CardProps): JSX.Element {
  const { onClick } = props;
  
  const interactiveClasses = typeof onClick === "function"
    ? "hover:border-blue-400"
    : "";

  return (
    <div
      className={`bg-white rounded-lg shadow-md shadow-gray-300 p-4 border-2 border-solid border-transparent ${interactiveClasses}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
