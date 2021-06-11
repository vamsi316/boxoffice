import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config';

const Show = () => {

    const {id} = useParams;

    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        let isMounted = true;

        apiGet(`/show/${id}?embed[]=seasons&embed[]=cast`)
        .then(results => {
            if(isMounted) {
                setShow(results);
                setIsLoading(false);
            }
        })
        .catch(err => {
            if(isMounted) {
                setError(err.message);
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        }
    }, [id]);

    // eslint-disable-next-line no-console
    console.log('show', show);

    if(isLoading) {
        return <div>Data is being loaded</div>
    }

    if(error) {
        return <div>Error occured {error.message}</div>
    }

    return (
        <div>
            This is show page
        </div>
    );
}

export default Show;
