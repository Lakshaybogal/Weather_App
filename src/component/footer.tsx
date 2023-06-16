import './styles.css'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/Fa';
const Footer = () => {
    return (
        <footer>
            <div className='email'>
                <a href="mailto:rajputlakshay553@gmail.com">rajputlakshay553@gmail.com</a>
            </div>
            <div>
                software engineer && web developer
            </div>

            <ul className='media'>
                <li>
                    <a href="https://github.com/Lakshaybogal" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/lakshay-bogal/" target="_blank" rel="noopener noreferrer"> <FaLinkedin /></a>
                </li>
                <li>
                    <a href="https://www.instagram.com/_lakshay_rajput__/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer