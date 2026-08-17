import {useAuth} from '../context/AuthContext.jsx'; export default function Toast(){const {notice}=useAuth();return notice&&<div className={`toast-box ${notice.type}`}>{notice.message}</div>}
