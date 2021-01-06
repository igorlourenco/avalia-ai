import EmptyState from "../components/EmptyState";
import {useAuth} from "../libraries/auth";
import useSWR from 'swr'
import fetcher from "../utilitaries/fetcher";
import ProductTableSkeleton from "../components/ProductTableSkeleton";
import ProductTable from "../components/ProductTable";
import DashboardShell from "../components/DashboardShell";
import ProductTableHeader from "../components/ProductTableHeader";
import Head from "next/head";

const DashboardHead = () => (
    <Head>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                        if(!document.cookie.includes('avalia-ai-auth')){
                            window.location.href = "/"
                        }
                    `
            }}
        />
    </Head>
)

const Dashboard = () => {
    const {user} = useAuth()

    const {data} = useSWR(user ? ['/api/products', user.ya] : null, fetcher);

    if (!data) {
        return (
            <>
                <DashboardHead/>
                <DashboardShell title={`Meus Produtos`}>
                    <ProductTableHeader isEmptyState={false}/>
                    <ProductTableSkeleton/>
                </DashboardShell>
            </>
        )
    }

    return data.products?.length > 0 ?
        (
            <>
                <DashboardHead/>
                <DashboardShell title={`Meus Produtos`}>
                    <ProductTableHeader isEmptyState={false}/>
                    <ProductTable products={data.products}/>
                </DashboardShell>
            </>
        ) :
        (
            <>
                <DashboardHead/>
                <DashboardShell title={`Meus Produtos`}>
                    <ProductTableHeader isEmptyState={true}/>
                    <EmptyState/>
                </DashboardShell>
            </>
        )

}

export default Dashboard