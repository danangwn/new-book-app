import '../styles/Home.module.css'
import { listing } from './api/listing'
import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';

export async function getServerSideProps(ctx: { key: string | undefined }){
  const key = ctx.key ? ctx.key : 'Test';
  const books = await listing(key);
  return {
    props: {
        data: books
    }
  }
}

export default function Home(props: { data: any[] }) {
  let datas = props.data;
  const [searchTerm, setSearchTerm,] = useState("");
  const [value , setValue] = useState(props.data)
  
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  };

  async function handleChange(event: { target: { value: SetStateAction<string>; }; }) {
    setSearchTerm(event.target.value);
    const key: string = event.target.value.toString();
    const books = await listing(key);
    setValue(books);
  };

  async function addWishlist(id: any, e: { preventDefault: () => void; }) {
    e.preventDefault();

    const data = {
      id: id,
    }

    fetch('api/wishlist/add', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(() => {
      refreshData()
    })

    alert("Wishlist created");
  }

  return (
    <>
    <div style={{paddingBottom: 50}}>
    <nav className="navbar is-fixed-top is-spaced is-danger" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
          <Link className="navbar-item" href='/'>
            <strong>Home</strong>
          </Link>

          <Link className="navbar-item" href="/wishlist">
            <strong>Wishlist</strong>
          </Link>

          <div style={{paddingTop: 7, paddingLeft: 35}}>
            <div className='control'>
              <input className="input is-rounded" type="text" placeholder="Search" value={searchTerm} onChange={handleChange}></input>
            </div>
          </div>
      </div>
    </nav>
    </div>

    <div>
      {value.map(data => (
        <div key={data.bookId}>
        <div className="section has-background-light section-padding: 0">
          <div className="columns is-centered">
          <div className="column is-one-third">
          <div className="box" key={data.bookId}>
              <article className="media">
                <div className="media-left">
                  <figure className="image">
                    <Image src={data.photo} alt="Image" width={100} height={100}></Image>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <p key={data.bookId}></p>
                      <h3 className="title"><strong>{data.title}</strong></h3>
                      <h4 className="subtitle">Authors: {data.author}</h4>
                      <h6 className="subtitle is-7">Rating: {data.reting}</h6>
                      <div className='button'  style={{paddingLeft: 0, paddingRight: 0}}>
                        <button className='button-is-medium button is-danger' type='submit' onClick={(e) => addWishlist(data.bookId, e)}><strong>Add to Wishlist</strong></button>
                      </div>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          </div>
        </div>
        </div>
      ))}
    </div>
    </>
  )
}
