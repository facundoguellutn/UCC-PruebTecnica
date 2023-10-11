import React from 'react'
import { Skeleton } from 'primereact/skeleton';

const SkeletonTabla = () => {
    return (
        <div>
            <div className='lg:flex hidden'>
                <Skeleton  height='20rem' style={{width:"100%"}}></Skeleton>
            </div>
            <div className='md:flex lg:hidden hidden'>
                <Skeleton width='100rem' height='20rem'></Skeleton>
            </div>
            <div className='sm:flex md:hidden hidden'>
                <Skeleton width='100rem' height='20rem'></Skeleton>
            </div>
            <div className='flex sm:hidden '>
                <Skeleton width='100rem' height='20rem'></Skeleton>
            </div>
        </div>
    )
}

export default SkeletonTabla