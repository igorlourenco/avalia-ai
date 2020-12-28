import EmptyState from "../components/EmptyState";
import {useAuth} from "../libraries/auth";
import useSWR from 'swr'
import fetcher from "../utilitaries/fetcher";
import ProductTableSkeleton from "../components/ProductTableSkeleton";
import ProductTable from "../components/ProductTable";

const Dashboard = () => {
    const {user} = useAuth()

    if(!user){
        return <ProductTableSkeleton/>
    }

    const { data } = useSWR(user ? ['/api/products', user.ya] : null, fetcher);

    if (!data) {
        return <ProductTableSkeleton/>
    }

    return data.products ? <ProductTable products={data.products}/> : <EmptyState/>

}

export default Dashboard