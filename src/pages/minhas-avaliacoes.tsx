import {useAuth} from "../libraries/auth";
import useSWR from 'swr'
import fetcher from "../utilitaries/fetcher";
import DashboardShell from "../components/DashboardShell";
import FeedbackTableSkeleton from "../components/FeedbackTableSkeleton";
import FeedbackTable from "../components/FeedbackTable";
import FeedbackTableHeader from "../components/FeedbackTableHeader";
import FeedbackEmptyState from "../components/FeedbackEmptyState";

const MyFeedback = () => {
    const {user} = useAuth()

    const {data} = useSWR(user.ya ? ['/api/feedback', user.ya] : null, fetcher);

    if (!data) {
        return (
            <DashboardShell title={`Minhas Avaliações`}>
                <FeedbackTableHeader/>
                <FeedbackTableSkeleton/>
            </DashboardShell>
        )
    }

    return data.feedback?.length > 0 ?
        (
            <DashboardShell title={`Minhas Avaliações`}>
                <FeedbackTableHeader/>
                <FeedbackTable feedback={data.feedback}/>
            </DashboardShell>
        ) :
        (
            <DashboardShell title={`Minhas Avaliações`}>
                <FeedbackTableHeader/>
                <FeedbackEmptyState/>
            </DashboardShell>
        )

}

export default MyFeedback