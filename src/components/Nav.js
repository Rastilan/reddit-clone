
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, storage, firestore } from './Firebase';
import '../css/Nav.css';
import redditIcon from '../imgs/Reddit-Logo.png';


const Nav = ({handleLogout}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user) {
                    const userDocRef = firestore.collection('users').doc(user.uid);
                    userDocRef.get().then((docSnapshot) => {
                      if (docSnapshot.exists) {
                        const userData = docSnapshot.data();
                        setUserData(userData);
                      }
                    });
                } else {
                    setUserData(null);
                }
        });
        return () => {
            unsubscribe();
        };

        
      }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }


    return(
        <>
            <nav className="navbar">
            <div className="navbar-left">
            <ul>
                <li className="reddit-icon"> <img src={redditIcon} alt="" /></li>
                <li className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                            <span onClick={toggleDropdown}>Home</span>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/">Main</Link>
                                </li>
                                <li>
                                    <Link to="/subreddit1">Subreddit 1</Link>
                                </li>
                                <li>
                                    <Link to="/subreddit2">Subreddit 2</Link>
                                </li>
                                {/* Add more subreddits as needed */}
                            </ul>
                        </li>
            </ul>
            </div>
            <div className="navbar-center">
            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                style={{ width: '100%' }} /* fixes search bar growth to fill navbar. */
                            />
            </div>
            <div className="navbar-right">
                
            <ul>
                <li>
                    <svg width="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 16L18 16C16.8954 16 16 16.8954 16 18L16 62C16 63.1046 16.8954 64 18 64L62 64C63.1046 64 64 63.1046 64 62V36" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M61.4849 18.5146L36.0288 43.9707" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M66.9712 24.0008L56.0007 13.0303C54.8936 11.9232 55.6777 10.0303 57.2433 10.0303L66.9712 10.0303C68.6281 10.0303 69.9712 11.3734 69.9712 13.0303V22.7582C69.9712 24.3238 68.0783 25.1079 66.9712 24.0008Z" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </li>
                <li>
                    <svg width="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1894 52.3071C16.7399 51.4874 16.3331 50.6401 15.9719 49.7681C13.3464 43.4296 13.3464 36.3077 15.9719 29.9691C18.5975 23.6306 23.6334 18.5946 29.9719 15.9691C36.3105 13.3436 43.4324 13.3436 49.7709 15.9691C56.1095 18.5946 61.1454 23.6306 63.7709 29.9691C66.3964 36.3077 66.3964 43.4296 63.7709 49.7681C61.1454 56.1067 56.1095 61.1426 49.7709 63.7681C43.4324 66.3936 36.3105 66.3936 29.9719 63.7681C29.0985 63.4063 28.2498 62.9988 27.4287 62.5483L13 66.7373L17.1894 52.3071Z" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </li>
                <li>
                    <svg width="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.6274 17C35.384 17 31.3143 18.6857 28.3137 21.6863L27.6863 22.3137C24.6857 25.3143 23 29.384 23 33.6274V36.5655C23 41.9664 20.8545 47.1461 17.0355 50.965C16.3725 51.628 16 52.5272 16 53.4648C16 55.4172 17.5828 57 19.5352 57H60.4648C62.4172 57 64 55.4172 64 53.4648C64 52.5272 63.6275 51.628 62.9645 50.965C59.1455 47.1461 57 41.9664 57 36.5655V33.6274C57 29.384 55.3143 25.3143 52.3137 22.3137L51.6863 21.6863C48.6857 18.6857 44.616 17 40.3726 17H39.6274Z" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M46.245 57C46.6876 57.9211 46.9282 58.9434 46.9282 60C46.9282 62.4752 45.6077 64.7624 43.4641 66C41.3205 67.2376 38.6795 67.2376 36.5359 66C34.3923 64.7624 33.0718 62.4752 33.0718 60C33.0718 58.9434 33.3124 57.9211 33.755 57" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M41.5 17C41.7761 17 42 16.7761 42 16.5V14C42 12.8954 41.1046 12 40 12C38.8954 12 38 12.8954 38 14V16.5C38 16.7761 38.2239 17 38.5 17" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </li>
                <li>
                    <svg width="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M61.7637 40L17.7637 40" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M39.7637 62L39.7637 18" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </li>
                {auth.currentUser ? (
                <li className="user-info">
                    <img className='photoURL' src={auth.currentUser.photoURL} alt="" />
                    {auth.currentUser.displayName}
                    {userData && <div>Karma: {userData.karma}</div>}
                    <button onClick={handleLogout}>Logout</button>
                </li>
                ) : (
                <>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                    <li>
                    <Link to="/signup">Sign Up</Link>
                    </li>
                </>
                )}
            </ul>
            </div>
            </nav>
            {/* <div className="banner"></div> -- for adding when in dedicated subreddits */}
            </>
)
};

    export default Nav;