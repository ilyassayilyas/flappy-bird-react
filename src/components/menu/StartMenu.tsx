import style from "../styles/StaticStyling.module.css";

interface MenuProps {
  children: any;
  height: number;
  width: number;
  display?: string;
}

const menuDynamicStyle = (props: MenuProps): React.CSSProperties => ({
  height: `${props.height}px`,
  width: `${props.width}px`,
  display: props.display,
});

const StartMenu = (props: MenuProps) => {
  return (
    <div className={style.menu} style={menuDynamicStyle(props)}>
      {props.children}
    </div>
  );
};

export default StartMenu;
