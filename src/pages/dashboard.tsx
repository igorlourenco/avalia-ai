import EmptyState from "../components/EmptyState";
import {useAuth} from "../libraries/auth";
import {Text} from '@chakra-ui/react'

const Dashboard = () => {
    const auth = useAuth()

    if (!auth.user) {
        return <Text>Carregando...</Text>
    }

    return <EmptyState/>
}

export default Dashboard