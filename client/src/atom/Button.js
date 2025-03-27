export default function Button(props){
    return <>
        <button onClick={props.onClick} onKeyDown={props.onKeyDown} className={props.className}>{props.children}</button>
    </>
}