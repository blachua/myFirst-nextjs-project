import Link from 'next/Link';
import Image from 'next/image';

export const HomePage = ({ data}) => (
    <div className="home_body">
        {data?.map((ev) => (
          <Link legacyBehavior key={ev.id} href={`/events/${ev.id}`} 
          passHref>
            <a className="card" href={`/events/${ev.id}`}>
              <div className="image">
                <Image width={500} height={400} alt={ev.title} 
                src={ev.image} />
              </div>              
              <div className="content">
                <h2> {ev.title} </h2>
                <p> {ev.description} </p>
              </div>
            </a>
          </Link> 
        ))} 
    </div>      
      
);