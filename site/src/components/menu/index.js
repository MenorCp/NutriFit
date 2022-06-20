import storage from 'local-storage'

import { useNavigate } from 'react-router-dom';

import './index.scss';

import { Link } from 'react-router-dom';


export default function Index() {

    const navigate = useNavigate();

    function sairClick() {
        storage.remove('usuario')
        navigate('/login');
    }

    return (
        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <div className='img-planta'></div>
                    <p className='nutrifit-text'>NUTRIFIT</p>
                </div>

                <div className='menu-items'>
                    <Link to='../'>
                        <div>Home</div>
                    </Link>
                    <Link to='../form'>
                        <div>Cadastrar</div>
                    </Link>
                    <Link to='../adm'>
                        <div>Consultar</div>
                    </Link>
                </div>
            </div>

            <div className='menu-items-sair'>
                <div>
                    <div onClick={sairClick}>Sair</div>
                </div>
            </div>
        </nav>
    )
}