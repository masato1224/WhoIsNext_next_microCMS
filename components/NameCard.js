export default function NameCard(props) {
  return (
    <div id="nameCard" className="NameCard mt-5" style={props.color}>
      {props.name}
    </div>
  );
}
