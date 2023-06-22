import React, {useRef} from 'react';

import emailjs from '@emailjs/browser'
import Loader from "react-loaders";

import {useForm, SubmitHandler} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import {Box, Typography, Button} from '@common'
import {useLetterClass} from '@hooks'
import {AnimatedLetters} from "@components";

import {Map} from './Map'
import * as styles from './ContactStyles'

const schema = yup.object().shape({
    username: yup.string().max(25).required(),
    email: yup.string().email().required(),
    subject: yup.string().min(6).max(25).required(),
    message: yup.string().min(6).max(25).required()
})

type FormValues = {
    username: string
    email: string
    subject: string
    message: string
}

export const Contact = () => {
    const formRef = useRef<HTMLFormElement | null>(null)
    const {handleSubmit, register, reset, formState: {errors},} = useForm<FormValues>({
        resolver: yupResolver(schema),
    })

    const letterClass = useLetterClass()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        await emailjs.sendForm(
            'service_0mzfv8f',
            'template_b4bufkq',
            formRef.current!, 'bOeW6PtP2XGzCGztJ')
            .then(result => console.log(result.text))
            .catch(error => console.log(error.text))
        reset()
    }

    return (
        <>
            <Box sx={styles.Contact}>
                <Box sx={styles.Left}>
                    <Typography sx={styles.Title} variant={'h1'}>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                            index={10}
                        />
                    </Typography>
                    <Typography variant={'body1'} sx={styles.Description}>
                        I&quot;m a beginner front-end developer. I like it.
                    </Typography>
                    <Box component={'form'} sx={styles.Form} onSubmit={handleSubmit(onSubmit)}
                         ref={formRef}>

                        <Box sx={styles.InputBox(!!errors.username)} className={'name-box'}>
                            <input
                                className={'input name'}
                                placeholder={'Name'}
                                type="text"
                                autoComplete={'off'}
                                {...register('username')}
                            />
                        </Box>
                        <Box sx={styles.InputBox(!!errors.email)} className={'email-box'}>
                            <input
                                className={'input email'}
                                placeholder={'Email'}
                                type="email"
                                autoComplete={'off'}
                                {...register('email')}
                            />
                        </Box>
                        <Box sx={styles.InputBox(!!errors.subject)} className={'subject-box'}>
                            <input
                                className={'input subject'}
                                placeholder={'Subject'}
                                type="text"
                                autoComplete={'off'}
                                {...register('subject')}
                            />
                        </Box>
                        <Box sx={styles.InputBox(!!errors.message)} className={'message-box'}>
                            <textarea
                                className={'input message'}
                                placeholder={'Message'}
                                {...register('message')}
                            />
                        </Box>

                        <Button type={'submit'} sx={styles.Button}>Send</Button>
                    </Box>
                </Box>
                <Box sx={styles.InfoMap}>
                    Boris Kutsenko
                    <br/>
                    Bali
                    <br/>
                    <span>borysigorevich@gmail.com</span>
                </Box>
                <Map/>
            </Box>
            <Loader
                active={true}
                type={'pacman'}
            />
        </>
    );
};