import A from '../atom/A'

export default function HeaderLogin(props){
    return <>
        <A className={props.btnClass} url='/login'>로그인</A>
    </>
}