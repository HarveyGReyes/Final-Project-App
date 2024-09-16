import { IoMdReturnLeft } from 'react-icons/io';
import '../assets/styles/components/ReturnBtn.scss'

export default function ReturnBtn({ onReturn }:any) {
    return (
        <div className='return-btn-container'>
            {/* Button that triggers the passed function */}
            <button className="return-btn" onClick={onReturn}>
                <IoMdReturnLeft size={40} color='#919191' />
            </button>
        </div>
    );
}
