import Image from "next/image";

export default function Home() {
  const imageUrl = process.env.NEXT_PUBLIC_APP_LOGO + '/dochyve.svg';

  return (
    <>
     <Image className="mr-3" src={imageUrl} width={20} height={20} alt="Dochyve" />
    </>
  )
}

