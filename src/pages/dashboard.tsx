import EmptyState from "../components/EmptyState";
import {useAuth} from "../libraries/auth";
import useSWR from 'swr'
import fetcher from "../utilitaries/fetcher";
import ProductTableSkeleton from "../components/ProductTableSkeleton";
import ProductTable from "../components/ProductTable";
import DashboardShell from "../components/DashboardShell";
import ProductTableHeader from "../components/ProductTableHeader";

const Dashboard = () => {
    const {user} = useAuth()

    const {data} = useSWR(user ? ['/api/products', user.ya] : null, fetcher);

    if (!data) {
        return (
            <DashboardShell>
                <ProductTableHeader isEmptyState={false}/>
                <ProductTableSkeleton/>
            </DashboardShell>
        )
    }

    return data.products?.length > 0 ?
        (
            <DashboardShell>
                <ProductTableHeader isEmptyState={false}/>
                <ProductTable products={data.products}/>
            </DashboardShell>
        ) :
        (
            <DashboardShell>
                <ProductTableHeader isEmptyState={true}/>
                <EmptyState/>
            </DashboardShell>
        )

}

export default Dashboard