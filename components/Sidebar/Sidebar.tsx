import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import useMediaQuery from '@mui/material/useMediaQuery'

import { Link, Image, Box } from '@common'

import { RiHome2Line } from 'react-icons/ri'
import { BsEnvelope } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'

import { FaLinkedin } from 'react-icons/fa'
import { BsGithub, BsHandbagFill } from 'react-icons/bs'
import { BiGame } from 'react-icons/bi'
import { GrResume } from 'react-icons/gr'

import * as styles from './SidebarStyles'
import { MobileMenu } from './MobileMenu'

export const Sidebar = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const path = router.pathname.split('/')[1] ? router.pathname.split('/')[1] : '/'
    const [activeLink, setActiveLink] = useState(path)

    const handleClose = () => setOpen(false)

    useEffect(() => {
        setActiveLink(path)
    }, [path])

    const media1024 = useMediaQuery('(min-width:1024px)')

    return (
        <Box sx={styles.Navbar}>
            <Link href={'/'}>
                <Box component={'a'} sx={styles.Logo}>
                    <Box sx={styles.Letter}>
                        <Image
                            src={'/images/nav.svg'}
                            width={24}
                            height={media1024 ? 40 : 23}
                            objectFit={'contain'}
                            alt={'logo'}
                        />
                    </Box>
                </Box>
            </Link>

            <Box component={'nav'} sx={styles.LinksBox(open)}>
                <Link href={'/'} >
                    <a onClick={handleClose}>
                        <Box className={'icon-box home'} sx={styles.ActiveLink(activeLink === '/')}>
                            <RiHome2Line size={22} className={'icon'} />
                        </Box>
                    </a>
                </Link>

                <Link href={'/about'} >
                    <a onClick={handleClose}>
                        <Box className={'icon-box about'} sx={styles.ActiveLink(activeLink === 'about')}>
                            <AiOutlineUser size={22} className={'icon'} />
                        </Box>
                    </a>
                </Link>

                <Link href={'/contact'} >
                    <a onClick={handleClose}>
                        <Box className={'icon-box contact'} sx={styles.ActiveLink(activeLink === 'contact')}>
                            <BsEnvelope size={22} className={'icon'} />
                        </Box>
                    </a>
                </Link>
            </Box>

            <MobileMenu open={open} setOpen={setOpen} />

            <Box sx={styles.SocialLinks}>
                <a
                    href='https://www.linkedin.com/in/boris-kutsenko-974b9b150/'
                    rel={'noreferrer'}
                    target={'_blank'}
                    referrerPolicy={'no-referrer'}
                >
                    <FaLinkedin size={16} />
                </a>

                <a
                    href='https://github.com/borysigorevich?tab=repositories'
                    rel='noreferrer'
                    target='_blank'
                    referrerPolicy='no-referrer'
                >
                    <BsGithub size={16} />
                </a>

                <a
                    href='https://react-three-fiber-theta.vercel.app/three53'
                    rel='noreferrer'
                    target='_blank'
                    referrerPolicy='no-referrer'
                >
                    <BiGame size={16} />
                </a>

                <a
                    href='https://cv-sepia-nu.vercel.app/'
                    rel='noreferrer'
                    target='_blank'
                    referrerPolicy='no-referrer'
                >
                    <BsHandbagFill size={16} />
                </a>
            </Box>
        </Box>
    )
}