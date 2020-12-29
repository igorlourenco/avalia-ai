import EmptyState from "../components/EmptyState";
import {useAuth} from "../libraries/auth";
import useSWR from 'swr'
import fetcher from "../utilitaries/fetcher";
import ProductTableSkeleton from "../components/ProductTableSkeleton";
import ProductTable from "../components/ProductTable";

const Dashboard = () => {
    const {user} = useAuth()

    const { data } = useSWR(user ? ['/api/products', user.ya] : null, fetcher);

    if(!user){
        return <ProductTableSkeleton/>
    }

    if (!data) {
        return <ProductTableSkeleton/>
    }

    return data.products.length > 0 ? <ProductTable products={data.products}/> : <EmptyState/>

}

export default Dashboard