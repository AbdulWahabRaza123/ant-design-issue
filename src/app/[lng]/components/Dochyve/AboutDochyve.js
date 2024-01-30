"use-client"
import "./Aboutdochyve.css"
import { useTranslation } from "../../../i18n";
import Image from 'next/image';
import Logo from "../Logo/Logo";


const Aboutdochyve = ({ t }) => {

  return (
    <>
      <div className="background-container flex items-center justify-center">
        <div>
          <Logo />
          <div className='about-dochyve mx-auto text-center mw-465'>
            <h3 className='fw-700 font-fam logo-text lh-26'>{t('about_dochyve.only_docHyve')} <span className='fw-500 font-fam text-white lh-26'>{t('about_dochyve.description.part1')}</span></h3>
          </div>
        </div>
      </div>
    </>

  );
}

export default Aboutdochyve;
