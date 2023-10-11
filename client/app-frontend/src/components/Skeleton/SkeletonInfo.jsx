import React from 'react'
import { Skeleton } from 'primereact/skeleton';

const SkeletonInfo = () => {
    return (
        <div>
            <div className='lg:flex hidden'>
                <Skeleton width='50rem' height='20rem'></Skeleton>
            </div>
            <div className='md:flex lg:hidden hidden'>
                <Skeleton width='30rem' height='20rem'></Skeleton>
            </div>
            <div className='sm:flex md:hidden hidden'>
                <Skeleton width='20rem' height='20rem'></Skeleton>
            </div>
            <div className='flex sm:hidden '>
                <Skeleton width='15rem' height='20rem'></Skeleton>
            </div>
        </div>
    )
}

export default SkeletonInfo