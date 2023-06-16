import React, { Fragment } from 'react';
import profileJpg from '../../Images/Profile2.png';
import { Rating } from '@material-ui/lab';

const ReviewCard = ({ review }) => {

    const options = {
        value: review.rating,
        precision: 0.5,
        readOnly: true
    }

    return (
        <Fragment>
            <div className='reviewCard'>
                <img src={profileJpg} alt='User' />
                <p>{review.name}</p>
                <Rating {...options} />
                <span className='reviewCardComment'>{review.comment}</span>
            </div>
        </Fragment>
    )
}

export default ReviewCard
