import React from 'react'

const SignupFooter = ({ t, lng })  => {
    return (
        <div className="text-right bg-white shadow w-full p-4 ">
            <p className="font-fam mr-8 text-primary">{t('form.copy_rights')}<a href="/signup" className="font-fam ml-4 text-primary">{t('form.license')}</a> <a href="/signup" className="font-fam text-primary ml-4">{t('form.terms')}</a></p>
        </div>
    )
}

export default SignupFooter