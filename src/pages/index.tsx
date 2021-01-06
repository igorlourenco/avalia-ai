import {Box, Button, Flex, Heading, Icon, Image, Link, Text} from '@chakra-ui/react'
import {useAuth} from '../libraries/auth'
import {FcGoogle} from 'react-icons/fc'
import {useRouter} from "next/router";
import {RiDashboardLine} from "react-icons/ri";
import DashboardButton from "../components/DashboardButton";

const Home = () => {
    return (
        <>
            <Flex direction={`column`} alignItems={`center`} justifyContent={`center`} height={`100vh`}>
                <Image src={`logo.svg`} width={`40`} height={`40`}/>
                <Heading size={`xl`} marginBottom={5}>
                    Avalia aí!
                </Heading>
                <DashboardButton/>
            </Flex>

            <Flex alignItems={`center`} justifyContent={`center`} paddingX={3}>
                <iframe src={`https://avalia-ai.vercel.app/comentar/D3ff0iDMYpfoIpGFZV8k`}
                        title="Comente Avalia Aí" width={`60%`} height={`300px`} marginWidth={10}/>
            </Flex>
        </>
    )
}

export default Home
