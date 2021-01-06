import {useAuth} from "../libraries/auth";
import {Box, Button, Link, Icon, Text} from "@chakra-ui/react";
import {FcGoogle} from "react-icons/fc";
import {RiDashboardLine} from "react-icons/ri";

const DashboardButton = () => {
    const auth = useAuth()

    if (!auth.user) {
        return (
            <Button variant="outline" size={`md`} fontWeight={`medium`}
                    colorScheme={"#000"}
                    onClick={auth.signInWithGoogle}
                    margin={3}>
                <Box as={FcGoogle} size={24} marginRight={2}/>
                Entre com Google
            </Button>
        )
    }


    return (
        <Link href={`/dashboard`} isExternal fontWeight={`medium`}>
            <Text fontWeight={`bold`}>
                <Icon as={RiDashboardLine} marginRight={2} size={24}/>
                Quadro de Gerenciamento
            </Text>
        </Link>
    )
}

export default DashboardButton