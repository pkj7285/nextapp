"use client"

import {useRouter, useParams} from 'next/navigation';
import { useEffect, useState} from 'react';

export default function Update() {
   const router = useRouter();
   const params = useParams();
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const id = params.id;

   useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL+'/topics/'+id)
    .then(res=>res.json())
    .then(result=>{
        setTitle(result.title);
        setBody(result.body);
    })
   },[]);
 
    return (
      <>
        <p>---------------------------------------------------</p>
          <form onSubmit={(e)=>{
            e.preventDefault();
            const title =  e.target.title.value;
            const body =  e.target.body.value;
            const options = {
              method:'PUT',
              headers : {
                'Content-Type':'application/json'
              },
              cache:'no-store',
              body:JSON.stringify({title,body})
            };

            fetch(`http://localhost:9999/topics/${id}`,options)
            .then(res =>res.json())
            .then(result=>{
              router.refresh();
              router.push(`/read/${id}`);
            });

          }}>
            <p>
              <input type="text" name="title" placeholder="title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
            </p>
            <p>
              <textarea  name="body" placeholder="body" value={body} onChange={(e)=> setBody(e.target.value)}/>
            </p>
            <p>
              <input type="submit" value="update"/>
            </p>
          </form>
        <p>---------------------------------------------------</p>
      </>
    );
  }
  