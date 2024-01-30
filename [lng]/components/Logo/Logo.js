import Image from 'next/image';

const Logo = () => {
    const imageUrl = process.env.NEXT_PUBLIC_APP_URL + '/dochyve.svg';
    return (
        <div className='mx-auto'>   
            <Image
            src={imageUrl}
            alt="Dochyve Logo"
            width={231}
            height={154}
            className='mx-auto mb-10'
        />
        </div>
    )
}

export default Logo