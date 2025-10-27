import { Link } from 'react-router-dom';
import './AboutPage.css';


function AboutPage () {
    return (
        <div className="about-page">
            <p>
                My name is Joe and I have been printing shirts for 4 years now. I use an Epson printer to take your images and print them onto special sheets of paper using heat activated ink. When I apply the image to a shirt using heat the ink is transfered from the printed sheet leaving us the finished shirt. This process is called sublimation.

                While speaking with potential customers I was finding it hard for people to visualize their shirts before purchasing. Thats why I've created the TeeForge! Now you can see your shirt before you buy to make sure we are going to provide the best possible product for whatever your needs may be.
            </p>
            <Link to='/' className='link-to-home'>Take Me Home</Link>
        </div>
    );
};

export default AboutPage;